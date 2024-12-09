export const TOKEN_ABI = [
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const MARKETPLACE_ABI = [
  {
    inputs: [{ name: "_paymentToken", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ name: "_id", type: "uint256" }],
    name: "buyItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveItems",
    outputs: [
      {
        components: [
          { name: "id", type: "uint256" },
          { name: "seller", type: "address" },
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "price", type: "uint256" },
          { name: "active", type: "bool" },
        ],
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_description", type: "string" },
      { name: "_price", type: "uint256" },
    ],
    name: "listItem",
    outputs: [{ type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
