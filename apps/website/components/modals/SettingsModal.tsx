"use client";

import { Modal, useModal } from "../Modal";
import Button from "../Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { pinImage } from "@/server/mutations/pinImage";
import { useAction } from "next-safe-action/hooks";
import { updateNexus } from "@/server/mutations/updateNexus";
import { useRouter } from "next/navigation";
import { Edit, UserPen, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { usePrivy } from "@privy-io/react-auth";
import type { AuthenticatedUser } from "@/server/queries/users";
import Tabs from "../Tabs";
import { deleteUser } from "@/server/mutations/deleteUser";

export default function SettingsModal(props: { user: AuthenticatedUser }) {
	const [tab, setTab] = useState<
		string | "profile" | "connections" | "advanced"
	>("profile");

	const [image, setImage] = useState(props.user.nexus?.image);
	const [name, setName] = useState(props.user.nexus?.name);
	const [bio, setBio] = useState(props.user.nexus?.bio);

	const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

	const pinImageAction = useAction(pinImage);

	const {
		linkWallet,
		linkFarcaster,
		linkTwitter,
		linkDiscord,
		unlinkFarcaster,
		unlinkWallet,
		unlinkTwitter,
		logout,
	} = usePrivy();

	const { isOpen, close } = useModal("settings");

	const updateNexusAction = useAction(updateNexus, {
		onSuccess: () => {
			toast.success("Profile updated");
			close();
		},
		onError: ({ error }) => {
			toast.error(error.serverError ?? "Could not update profile");
		},
	});

	const deleteUserAction = useAction(deleteUser, {
		onSuccess: () => {
			toast.success("Account deleted");
			close();
			window.location.href = "/";
		},
		onError: ({ error }) => {
			toast.error(
				error.serverError ??
					"Could not delete account, reach out in the Discord server for help.",
			);
		},
	});

	return (
		<Modal id="settings" className="p-4 flex flex-col min-w-80 gap-4">
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Settings
				</p>
				<button
					onClick={close}
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</button>
			</div>
			<Tabs
				selected={tab}
				onSelectionChange={(value) => setTab(value)}
				options={{
					profile: "Profile",
					connections: "Connections",
					advanced: "Advanced",
				}}
			/>
			<div className="flex flex-col gap-4">
				{
					{
						profile: (
							<>
								<div className="flex items-center gap-4 h-12">
									<label className="cursor-pointer aspect-square h-full relative group">
										<input
											type="file"
											accept="image/*"
											onChange={async (event) => {
												const files = event.target.files;

												if (files && files.length > 0) {
													const file = files[0];

													// 25 MB in bytes
													if (file.size > 25 * 1024 * 1024) {
														toast.error("Image size should be less than 25 MB");
														return;
													}

													const formData = new FormData();
													formData.append("file", file);

													const hash = await pinImageAction.executeAsync({
														formData,
													});

													if (hash?.data) {
														setImage(`https://ipfs.nouns.gg/ipfs/${hash.data}`);
													} else toast.error("Could not upload image");

													event.target.value = "";
												}
											}}
											style={{ display: "none" }}
										/>
										<img
											src={
												image === ""
													? `https://api.cloudnouns.com/v1/pfp?text=${props.user.id}&background=1`
													: image
											}
											className="rounded-full group-hover:opacity-50 transition-opacity"
										/>
										<div className="absolute -bottom-1 -right-1 flex items-center p-1 rounded-full justify-center bg-white text-black">
											<Edit className="w-3 h-3" />
										</div>
									</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Enter a display name"
										className="bg-grey-800 rounded-xl text-white placeholder-grey-400 py-2 px-3 outline-none border-grey-600 border-[1px] w-full"
									/>
								</div>
								<div className="flex flex-col gap-4">
									<textarea
										placeholder="Enter a bio"
										value={bio ?? ""}
										onChange={(e) => setBio(e.target.value)}
										className="bg-grey-800 rounded-xl text-white placeholder-grey-400 py-2 px-3 outline-none custom-scrollbar"
										rows={4}
									/>
								</div>
								<div className="flex items-center justify-between gap-4">
									<button
										onClick={() =>
											updateNexusAction.execute({
												name: name ?? undefined,
												bio: bio ?? undefined,
												image,
											})
										}
										className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
									>
										{updateNexusAction.isPending ? (
											<img
												src="/spinner.svg"
												className="h-[18px] animate-spin"
											/>
										) : (
											""
										)}
										Update
										<UserPen className="w-4 h-4" />
									</button>
								</div>
							</>
						),
						connections: (
							<>
								<div className="flex gap-2 justify-between items-center">
									<div className="flex items-center gap-3">
										<img
											src="https://ipfs.nouns.gg/ipfs/QmPxubNKVTpAakwU9M9gLVhiqN7qaafabxbYH4jHKoG6aU"
											className="h-10 w-10 rounded-md"
										/>
										<div className="flex flex-col">
											<p className="text-white font-semibold">Discord</p>
											<p
												className={twMerge(
													props.user.discord ? "text-green" : "text-red",
												)}
											>
												{props.user.discord ? "Connected" : "Not Connected"}
											</p>
										</div>
									</div>
									<Button
										onClick={() => linkDiscord()}
										size="sm"
										disabled={!!props.user.discord}
									>
										{props.user.discord ? "Remove" : "Add"}
									</Button>
								</div>
								<div className="flex gap-2 justify-between items-center">
									<div className="flex items-center gap-3">
										<img
											src="https://ipfs.nouns.gg/ipfs/Qmcqq8J9wXCDTTbVmB8n5xSdGQ3Kna2K6dnTXriNs7MeHc"
											className="h-10 w-10 rounded-md"
										/>
										<div className="flex flex-col">
											<p className="text-white font-semibold">Warpcast</p>
											<p
												className={twMerge(
													props.user.farcaster ? "text-green" : "text-red",
												)}
											>
												{props.user.farcaster ? "Connected" : "Not Connected"}
											</p>
										</div>
									</div>
									<Button
										onClick={() =>
											props.user.farcaster
												? unlinkFarcaster(props.user.farcaster.fid)
												: linkFarcaster()
										}
										size="sm"
									>
										{props.user.farcaster ? "Remove" : "Add"}
									</Button>
								</div>
								<div className="flex gap-2 justify-between items-center">
									<div className="flex items-center gap-3">
										<img
											src="https://ipfs.nouns.gg/ipfs/QmUdf8usCZDwv8dkmqyc2maVwitevAHtKXGbTnUx8dEaz7"
											className="h-10 w-10 rounded-md"
										/>
										<div className="flex flex-col">
											<p className="text-white font-semibold">Twitter</p>
											<p
												className={twMerge(
													props.user.twitter ? "text-green" : "text-red",
												)}
											>
												{props.user.twitter ? "Connected" : "Not Connected"}
											</p>
										</div>
									</div>
									<Button
										onClick={() =>
											props.user.twitter
												? unlinkTwitter(props.user.twitter.subject)
												: linkTwitter()
										}
										size="sm"
									>
										{props.user.twitter ? "Remove" : "Add"}
									</Button>
								</div>
								<div className="flex gap-2 justify-between items-center">
									<div className="flex items-center gap-3">
										<img
											src="https://ipfs.nouns.gg/ipfs/QmTHUctNLWFbYwWU7DhUBtXfXL31T2qnZNRnZPg4TDLJyS"
											className="h-10 w-10 rounded-md"
										/>
										<div className="flex flex-col">
											<p className="text-white font-semibold">Wallet</p>
											<p
												className={twMerge(
													props.user.wallet ? "text-green" : "text-red",
												)}
											>
												{props.user.wallet ? "Connected" : "Not Connected"}
											</p>
										</div>
									</div>
									<Button
										onClick={() =>
											props.user.wallet
												? unlinkWallet(props.user.wallet.address)
												: linkWallet()
										}
										size="sm"
									>
										{props.user.wallet ? "Remove" : "Add"}
									</Button>
								</div>
							</>
						),
						advanced: (
							<>
								<div className="flex gap-2 justify-between items-center">
									<p className="text-white font-semibold">Sign Out</p>
									<Button
										onClick={async () => {
											await logout();
											close();
											window.location.href = "/";
										}}
										size="sm"
									>
										Sign out
									</Button>
								</div>
								<div className="flex gap-2 justify-between items-center">
									<div className="flex flex-col gap-1">
										<p className="text-white font-semibold">Delete Account</p>
										<div className="flex gap-2">
											<input
												checked={confirmDeleteAccount}
												onChange={(e) =>
													setConfirmDeleteAccount(!confirmDeleteAccount)
												}
												type="checkbox"
												className="accent-red w-3"
											/>
											<p className="text-red text-sm">Are you sure?</p>
										</div>
									</div>
									<Button
										disabled={!confirmDeleteAccount}
										onClick={() => {
											if (!confirmDeleteAccount) return;
											deleteUserAction.execute();
										}}
										size="sm"
									>
										Delete Account
									</Button>
								</div>
							</>
						),
					}[tab]
				}
			</div>
		</Modal>
	);
}
