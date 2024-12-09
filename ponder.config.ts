import { createConfig } from "@ponder/core";
import { http } from "viem";

export default createConfig({
  networks: {
    foundry: {
      chainId: 31337,
      transport: http("http://127.0.0.1:8545"),
    },
  },
  contracts: {
    Token: {
      network: "foundry",
      abi: "./out/Token.sol/Token.json",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      startBlock: 0,
    },
    Marketplace: {
      network: "foundry",
      abi: "./out/Marketplace.sol/Marketplace.json",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      startBlock: 0,
    },
  },
});
