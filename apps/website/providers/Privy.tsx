"use client";

import {
  ConnectedWallet,
  EIP1193Provider,
  PrivyProvider,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import {
  PimlicoBundlerClient,
  PimlicoPaymasterClient,
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import {
  walletClientToSmartAccountSigner,
  createSmartAccountClient,
  SmartAccountClient,
} from "permissionless";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  WalletClient,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { base, baseSepolia } from "viem/chains";
import {
  KernelEcdsaSmartAccount,
  SmartAccountSigner,
  signerToEcdsaKernelSmartAccount,
} from "permissionless/accounts";

export const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === "development" ? baseSepolia : base,
  transport: http(),
});

export const pimlicoBundler = createPimlicoBundlerClient({
  transport: http(
    `https://api.pimlico.io/v2/${
      process.env.NODE_ENV === "development" ? "baseSepolia" : "base"
    }/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
  ),
});

export const pimlicoPaymaster = createPimlicoPaymasterClient({
  transport: http(
    `https://api.pimlico.io/v2/${
      process.env.NODE_ENV === "development" ? "baseSepolia" : "base"
    }/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
  ),
});

export default function Privy(props: { children: React.ReactNode }) {
  console.log(process.env.NODE_ENV);
  return (
    <PrivyProvider
      appId={
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_PRIVY_APP_ID_SANDBOX!
          : process.env.NEXT_PUBLIC_PRIVY_APP_ID_PRODUCTION!
      }
      config={{
        loginMethods: ["wallet", "email", "discord", "farcaster"],
        appearance: {
          theme: "dark",
          accentColor: "#E93737",
          logo: "/logo.svg",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: true,
        },
      }}
    >
      <PrivyState>{props.children}</PrivyState>
    </PrivyProvider>
  );
}

export const PrivyContext = createContext<
  | {
      pimlicoBundler: PimlicoBundlerClient;
      pimlicoPaymaster: PimlicoPaymasterClient;
      embeddedWallet?: ConnectedWallet;
      eip1193provider?: EIP1193Provider;
      privyClient?: WalletClient;
      smartAccountSigner?: SmartAccountSigner;
      kernelAccount?: KernelEcdsaSmartAccount;
      smartAccountClient?: SmartAccountClient;
    }
  | undefined
>(undefined);

export function useSmartAccount() {
  const { ready, authenticated } = usePrivy();
  const [address, setAddress] = useState<`0x${string}`>();
  const [connected, setConnected] = useState<boolean>(false);

  const privyContext = useContext(PrivyContext);

  useEffect(() => {
    if (ready && authenticated && privyContext?.smartAccountClient?.account) {
      setAddress(privyContext.smartAccountClient.account.address);
      setConnected(true);
    } else {
      setAddress(undefined);
      setConnected(false);
    }
  }, [privyContext, ready, authenticated]);

  return { address, connected };
}

function PrivyState(props: { children: React.ReactNode }) {
  const { wallets } = useWallets();

  const embeddedWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "privy"),
    [wallets]
  );

  const [eip1193provider, setEip1193Provider] = useState<EIP1193Provider>();

  const privyClient = useMemo(() => {
    if (!eip1193provider || !embeddedWallet) return;

    return createWalletClient({
      account: embeddedWallet?.address as `0x${string}`,
      chain: process.env.NODE_ENV === "development" ? baseSepolia : base,
      transport: custom(eip1193provider),
    });
  }, [eip1193provider, embeddedWallet]);

  const smartAccountSigner = useMemo(() => {
    if (!privyClient) return;
    return walletClientToSmartAccountSigner(privyClient);
  }, [privyClient]);

  const [kernelAccount, setKernalAccount] = useState<KernelEcdsaSmartAccount>();

  const smartAccountClient = useMemo(() => {
    if (!kernelAccount) return;

    return createSmartAccountClient({
      account: kernelAccount,
      chain: process.env.NODE_ENV === "development" ? baseSepolia : base,
      transport: http(
        `https://api.pimlico.io/v2/${
          process.env.NODE_ENV === "development" ? "baseSepolia" : "base"
        }/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
      ),
      sponsorUserOperation: pimlicoPaymaster.sponsorUserOperation,
    });
  }, [kernelAccount]);

  useEffect(() => {
    (async () => {
      if (embeddedWallet) {
        setEip1193Provider(await embeddedWallet.getEthereumProvider());
      }

      if (smartAccountSigner) {
        setKernalAccount(
          await signerToEcdsaKernelSmartAccount(publicClient, {
            entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
            signer: smartAccountSigner,
            index: 0n,
            // address: "0x...",
          })
        );
      }
    })();
  }, [embeddedWallet, smartAccountSigner]);

  useEffect(() => {
    console.log("wallets", wallets);
    console.log("eip1193provider", eip1193provider);
    console.log("embeddedWallet", embeddedWallet);
    console.log("privyClient", privyClient);
    console.log("smartAccountSigner", smartAccountSigner);
    console.log("kernelAccount", kernelAccount);
    console.log("smartAccountClient", smartAccountClient);
  }, [
    wallets,
    eip1193provider,
    embeddedWallet,
    privyClient,
    smartAccountSigner,
    kernelAccount,
    smartAccountClient,
  ]);

  return (
    <PrivyContext.Provider
      value={{
        pimlicoBundler,
        pimlicoPaymaster,
        embeddedWallet,
        eip1193provider,
        privyClient,
        smartAccountSigner,
        kernelAccount,
        smartAccountClient,
      }}
    >
      {props.children}
    </PrivyContext.Provider>
  );
}
