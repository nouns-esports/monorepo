"use client";

import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { WagmiProvider, useSetActiveWallet } from "@privy-io/wagmi";
import { env } from "@/env";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { http, useWalletClient, usePublicClient } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import {
  walletClientToSmartAccountSigner,
  ENTRYPOINT_ADDRESS_V07,
} from "permissionless";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import {
  KernelAccountClient,
  createKernelAccount,
  createKernelAccountClient,
} from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createWeightedECDSAValidator } from "@zerodev/weighted-ecdsa-validator";
import { toFunctionSelector } from "viem";
import { User } from "@/db/schema";
import { trpc } from "@/trpc/query/client";
import { identify } from "@multibase/js";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const pimlicoPaymasterClient = createPimlicoPaymasterClient({
  entryPoint: ENTRYPOINT_ADDRESS_V07,
  chain: env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
  transport: http(
    `https://api.pimlico.io/v2/${
      env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "base" : "baseSepolia"
    }/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`
  ),
});

export default function Privy(props: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ["discord", "twitter", "email", "wallet", "farcaster"],
        appearance: {
          theme: "#040404",
          accentColor: "#E93737",
          logo: "/logo/logo.svg",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: true,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <PrivyState>{props.children}</PrivyState>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

type SmartAccountClient = KernelAccountClient<typeof ENTRYPOINT_ADDRESS_V07>;

export const PrivyContext = createContext<
  | {
      smartAccountClient?: SmartAccountClient;
      setSmartAccountClient?: React.Dispatch<
        React.SetStateAction<SmartAccountClient | undefined>
      >;
    }
  | undefined
>(undefined);

export function useAccount() {
  const {
    ready,
    authenticated,
    user: privy,
    login,
    logout: privyLogout,
    linkDiscord,
    linkEmail,
    linkFarcaster,
    linkWallet,
    linkTwitter,
    getAccessToken,
  } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();

  const privyContext = useContext(PrivyContext);

  const [address, setAddress] = useState<`0x${string}`>();
  const [pass, setPass] = useState<User["pass"]>();

  const connected = useMemo(
    () => ready && authenticated && address,
    [ready, authenticated, address]
  );

  useEffect(() => {
    if (privyContext?.smartAccountClient?.account) {
      setAddress(privyContext.smartAccountClient.account.address);
    }
  }, [privyContext]);

  const user = trpc.getUser.useQuery(
    { id: privy?.id ?? "" },
    { enabled: !!privy?.id }
  );

  useEffect(() => {
    if (user.data) {
      setPass(user.data.pass);
    }
  }, [user]);

  // this can probably just be a reaction to privy state
  async function logout() {
    await privyLogout();

    privyContext?.setSmartAccountClient?.(undefined);
    setAddress(undefined);
    setPass(undefined);
  }

  return {
    id: privy?.id,
    address,
    pass,
    connected,
    wallets: walletsReady ? wallets : undefined,
    email: privy?.email,
    twitter: privy?.twitter,
    discord: privy?.discord,
    farcaster: privy?.farcaster,
    login,
    logout,
    linkDiscord,
    linkEmail,
    linkFarcaster,
    linkWallet,
    linkTwitter,
    getAccessToken,
  };
}

function PrivyState(props: { children: React.ReactNode }) {
  const { wallets } = useWallets();

  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  const { setActiveWallet } = useSetActiveWallet();

  useEffect(() => {
    if (embeddedWallet) setActiveWallet(embeddedWallet);
  }, [embeddedWallet]);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const signer = useMemo(() => {
    if (embeddedWallet && walletClient) {
      return walletClientToSmartAccountSigner(walletClient);
    }
  }, [walletClient]);

  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClient>();

  useEffect(() => {
    if (signer && publicClient) {
      (async () => {
        const account = await createKernelAccount(publicClient, {
          entryPoint: ENTRYPOINT_ADDRESS_V07,
          plugins: {
            sudo: await signerToEcdsaValidator(publicClient, {
              entryPoint: ENTRYPOINT_ADDRESS_V07,
              signer,
            }),
            regular: await createWeightedECDSAValidator(publicClient, {
              entryPoint: ENTRYPOINT_ADDRESS_V07,
              config: {
                threshold: 100,
                signers: [
                  {
                    // Nouns Esports Multisig
                    address: "0x68A2aD5b63aB374fc5f6F7D1Fb5f41B267035868",
                    weight: 100,
                  },
                ],
              },
              signers: [signer],
            }),
            action: {
              address: "0x2f65dB8039fe5CAEE0a8680D2879deB800F31Ae1",
              selector: toFunctionSelector(
                "function doRecovery(address _validator, bytes calldata _data)"
              ),
            },
          },
        });

        const client = createKernelAccountClient({
          entryPoint: ENTRYPOINT_ADDRESS_V07,
          account,
          chain:
            env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
          bundlerTransport: http(
            `https://api.pimlico.io/v2/${
              env.NEXT_PUBLIC_ENVIRONMENT === "production"
                ? "base"
                : "baseSepolia"
            }/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`
          ),
          middleware: {
            sponsorUserOperation: async ({ userOperation }) => {
              return pimlicoPaymasterClient.sponsorUserOperation({
                userOperation,
              });
            },
          },
        });

        setSmartAccountClient(
          //@ts-ignore
          client
        );
      })();
    }
  }, [publicClient, signer]);

  return (
    <PrivyContext.Provider
      value={{ smartAccountClient, setSmartAccountClient }}
    >
      {props.children}
    </PrivyContext.Provider>
  );
}
