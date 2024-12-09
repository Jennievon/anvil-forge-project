import { createPonder } from "@ponder/core";
import { Contract } from "ethers";

const ponder = createPonder();

ponder.on("Token:Transfer", async ({ event, context }) => {
  const { Token, TokenHolder } = context.db;
  const { from, to, value } = event.args;

  // Update sender balance
  if (from !== "0x0000000000000000000000000000000000000000") {
    const sender = await TokenHolder.findUnique({ id: from });
    if (sender) {
      await TokenHolder.update({
        where: { id: from },
        data: { balance: sender.balance - value },
      });
    }
  }

  // Update receiver balance
  const receiver = await TokenHolder.findUnique({ id: to });
  if (receiver) {
    await TokenHolder.update({
      where: { id: to },
      data: { balance: receiver.balance + value },
    });
  } else {
    await TokenHolder.create({
      data: {
        id: to,
        address: to,
        balance: value,
        token: event.address,
      },
    });
  }
});

ponder.on("Marketplace:ItemListed", async ({ event, context }) => {
  const { MarketplaceItem } = context.db;
  const { id, seller, name, price } = event.args;

  await MarketplaceItem.create({
    data: {
      id: id.toString(),
      seller,
      name,
      description: "",
      price,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
});

ponder.on("Marketplace:ItemSold", async ({ event, context }) => {
  const { MarketplaceItem } = context.db;
  const { id } = event.args;

  await MarketplaceItem.update({
    where: { id: id.toString() },
    data: {
      active: false,
      updatedAt: new Date(),
    },
  });
});

export default ponder;
