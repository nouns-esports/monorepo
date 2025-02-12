"use server";

import { onlyUser } from ".";
import { z } from "zod";
import { shopifyClient } from "../clients/shopify";
import { carts, db, gold, nexus, xp } from "~/packages/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const CREATE_DRAFT_ORDER_MUTATION = `
  mutation CreateDraftOrder($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        invoiceUrl
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CREATE_DRAFT_ORDER_DISCOUNT_MUTATION = `
	mutation UpdateDraftOrder($id: ID!, $input: DraftOrderInput!) {
		draftOrderUpdate(id: $id, input: $input) {
			draftOrder {
				id
				invoiceUrl
				status
			}
			userErrors {
				field
				message
			}
		}
	}
`;

export const createOrder = onlyUser
	.schema(
		z.object({
			shipping: z.object({
				firstName: z.string(),
				lastName: z.string(),
				address1: z.string(),
				address2: z.string().optional(),
				city: z.string(),
				province: z.string(),
				country: z.string(),
				zip: z.string(),
			}),
			goldApplied: z.number(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		if (!ctx.user.nexus) {
			throw new Error("User does not have a nexus");
		}

		if (parsedInput.goldApplied > ctx.user.nexus.gold) {
			throw new Error("Insufficient gold");
		}

		try {
			const response = await shopifyClient.request(
				CREATE_DRAFT_ORDER_MUTATION,
				{
					variables: {
						input: {
							lineItems: ctx.user.nexus.carts.map((item) => ({
								variantId: `gid://shopify/ProductVariant/${item.variant}`,
								quantity: item.quantity,
							})),
							shippingAddress: {
								firstName: parsedInput.shipping.firstName,
								lastName: parsedInput.shipping.lastName,
								address1: parsedInput.shipping.address1,
								address2: parsedInput.shipping.address2 || null,
								city: parsedInput.shipping.city,
								province: parsedInput.shipping.province,
								country: parsedInput.shipping.country,
								zip: parsedInput.shipping.zip,
							},
							email: "test@test.com",
							useCustomerDefaultAddress: false,
						},
					},
				},
			);

			if (!response.data) {
				console.error("Errors", response.errors);
				console.error(response.data?.draftOrderCreate?.userErrors);
				throw new Error("Error creating draft order");
			}

			const draftOrder = response.data?.draftOrderCreate?.draftOrder as {
				id: string;
				invoiceUrl: string;
				status: string;
			};

			const now = new Date();

			await db.transaction(async (tx) => {
				if (parsedInput.goldApplied > 0) {
					const addDiscountToDraftOrder = await shopifyClient.request(
						CREATE_DRAFT_ORDER_DISCOUNT_MUTATION,
						{
							variables: {
								id: draftOrder.id,
								input: {
									appliedDiscount: {
										title: "Gold Redemption",
										value: (parsedInput.goldApplied / 100).toFixed(2),
										valueType: "FIXED_AMOUNT",
									},
								},
							},
						},
					);

					if (!addDiscountToDraftOrder.data) {
						console.error("Errors", addDiscountToDraftOrder.errors);
						console.error(
							addDiscountToDraftOrder.data?.draftOrderUpdate?.userErrors,
						);
						throw new Error("Error creating draft order discount");
					}

					// Deduct the gold and add xp to the user
					await tx
						.update(nexus)
						.set({
							gold: sql`${nexus.gold} - ${parsedInput.goldApplied}`,
							xp: sql`${nexus.xp} + ${parsedInput.goldApplied}`,
						})
						.where(eq(nexus.id, ctx.user.id));

					const orderId = Number(draftOrder.id.split("DraftOrder/")[1]);

					// Save a history of the gold transaction
					await tx.insert(gold).values({
						amount: parsedInput.goldApplied,
						order: orderId,
						from: ctx.user.id,
						to: null,
						timestamp: now,
					});

					// Save a history of the xp reward
					await tx.insert(xp).values({
						amount: parsedInput.goldApplied,
						// order: orderId,
						user: ctx.user.id,
						timestamp: now,
					});
				}

				if (parsedInput.goldApplied === 0) {
					// If its the total we need to submit the order
				}

				// Clear the users cart
				await tx.delete(carts).where(eq(carts.user, ctx.user.id));
			});
		} catch (error) {
			console.error(error);
		}

		revalidatePath("/shop");
	});
