import { createConfig } from "wagmi";
import { foundry } from "wagmi/chains";
import { http } from "viem";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    appName: "Marketplace dApp",
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "",
    chains: [foundry],
    transports: {
      [foundry.id]: http("http://127.0.0.1:8545"),
    },
  })
);
