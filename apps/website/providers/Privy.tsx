"use client";

import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { WagmiProvider, useSetActiveWallet } from "@privy-io/wagmi";
import { env } from "@/env";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { http, useWalletClient, usePublicClient } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { walletClientToSmartAccountSigner } from "permissionless";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { createWeightedECDSAValidator } from "@zerodev/weighted-ecdsa-validator";
import { toFunctionSelector } from "viem";
import { User } from "@/server/db/schema";
import { query } from "@/app/api/query/client";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const pimlicoPaymasterClient = createPimlicoPaymasterClient({
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
        loginMethods: ["discord"],
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

export const PrivyContext = createContext<
  | {
      smartAccountClient?: ReturnType<typeof createKernelAccountClient>;
      setSmartAccountClient?: React.Dispatch<
        React.SetStateAction<
          ReturnType<typeof createKernelAccountClient> | undefined
        >
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

  useEffect(() => {
    if (privy) {
      query.getUser.query({ id: privy.id }).then((user) => {
        if (user) setPass(user.pass);
      });
    }
  }, [privy]);

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
    useState<ReturnType<typeof createKernelAccountClient>>();

  useEffect(() => {
    if (signer && publicClient) {
      (async () => {
        setSmartAccountClient(
          createKernelAccountClient({
            account: await createKernelAccount(publicClient, {
              plugins: {
                sudo: await signerToEcdsaValidator(publicClient, {
                  signer,
                }),
                regular: await createWeightedECDSAValidator(publicClient, {
                  config: {
                    threshold: 100,
                    signers: [
                      {
                        // Nouns Esports Multisig
                        address: "0x2842dd3C97F902aEC2eF36a64FF722A7F90C400F",
                        weight: 100,
                      },
                    ],
                  },
                  signers: [signer],
                }),
                executorData: {
                  // ZeroDev Recovery Executor
                  executor: "0x2f65dB8039fe5CAEE0a8680D2879deB800F31Ae1",
                  selector: toFunctionSelector(
                    "function doRecovery(address _validator, bytes calldata _data)"
                  ),
                },
              },
            }),
            chain:
              env.NEXT_PUBLIC_ENVIRONMENT === "production" ? base : baseSepolia,
            transport: http(
              `https://api.pimlico.io/v2/${
                env.NEXT_PUBLIC_ENVIRONMENT === "production"
                  ? "base"
                  : "baseSepolia"
              }/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`
            ),
            sponsorUserOperation: async ({ userOperation, entryPoint }) => {
              return pimlicoPaymasterClient.sponsorUserOperation({
                userOperation,
                entryPoint,
              });
            },
          })
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
