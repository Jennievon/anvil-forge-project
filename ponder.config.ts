import { createConfig } from "@ponder/core";
import { http } from "viem";

import { MARKETPLACE_ABI, TOKEN_ABI } from "./src/constants/abi";
import { MARKETPLACE_ADDRESS, TOKEN_ADDRESS } from "./src/constants/addresses";

export default createConfig({
  networks: {
    anvil: {
      chainId: 31337,
      transport: http("http://127.0.0.1:8545"),
    },
  },
  contracts: {
    Token: {
      network: "anvil",
      abi: TOKEN_ABI,
      address: TOKEN_ADDRESS,
      startBlock: 0,
    },
    Marketplace: {
      network: "anvil",
      abi: MARKETPLACE_ABI,
      address: MARKETPLACE_ADDRESS,
      startBlock: 0,
    },
  },
});
