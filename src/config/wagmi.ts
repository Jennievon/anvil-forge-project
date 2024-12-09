import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { foundry } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "Marketplace dApp",
    chains: [foundry],
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "",
    providers: [publicProvider()],
  })
);
