import createAction from "../createAction";
import { viemPublicClients } from "@/server/clients/viem";

export const mintERC1155 = createAction(async (actionInputs) => {
  if (!actionInputs.link) {
    throw new Error("Link input missing in action");
  }

  if (!actionInputs.name) {
    throw new Error("Name input missing in action");
  }

  if (!actionInputs.chain) {
    throw new Error("Chain input missing in action");
  }

  if (!actionInputs.address) {
    throw new Error("Link input missing in action");
  }

  if (!actionInputs.tokenId) {
    throw new Error("Token ID input missing in action");
  }

  return {
    description: (
      <p>
        Mint <span className="text-red">{actionInputs.name}</span>
      </p>
    ),
    url: actionInputs.link,
    check: async (user) => {
      if (!actionInputs.address) return false;
      if (!actionInputs.chain) return false;
      if (!actionInputs.tokenId) return false;
      if (!user.wallet?.address) return false;

      const balance = await viemPublicClients[
        actionInputs.chain as keyof typeof viemPublicClients
      ].readContract({
        address: actionInputs.address,
        abi: [
          {
            inputs: [
              { name: "account", type: "address" },
              { name: "id", type: "uint256" },
            ],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
        ] as const,
        functionName: "balanceOf",
        args: [
          user.wallet.address as `0x${string}`,
          BigInt(actionInputs.tokenId),
        ],
      });

      if (balance < 1n) return false;

      return true;
    },
  };
});
