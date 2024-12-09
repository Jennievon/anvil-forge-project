import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Token: p.createTable({
    id: p.string(),
    name: p.string(),
    symbol: p.string(),
    totalSupply: p.bigint(),
  }),
  TokenHolder: p.createTable({
    id: p.string(),
    address: p.string(),
    balance: p.bigint(),
    token: p.foreignKey("Token.id"),
  }),
  MarketplaceItem: p.createTable({
    id: p.string(),
    seller: p.string(),
    name: p.string(),
    description: p.string(),
    price: p.bigint(),
    active: p.boolean(),
    createdAt: p.timestamp(),
    updatedAt: p.timestamp(),
  }),
}));
