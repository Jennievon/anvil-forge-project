import { useContractWrite, useWaitForTransaction } from "wagmi";
import { formatPrice, formatAddress } from "../lib/utils/format";
import { useMarketplaceContract } from "../lib/hooks/useContract";
import { MARKETPLACE_ABI } from "../config/abis";
import { MARKETPLACE_ADDRESS } from "../config/contracts";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export function ItemList() {
  const { items } = useMarketplaceContract();

  const { data: buyData, write: buyItem } = useContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "buyItem",
  });

  const { isLoading: isBuying } = useWaitForTransaction({
    hash: buyData?.hash,
  });

  if (!items || items.length === 0) {
    return (
      <Card>
        <p className="text-gray-500 text-center">No items available</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id.toString()} className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="mt-auto space-y-2">
            <p className="text-sm text-gray-500">
              Seller: {formatAddress(item.seller)}
            </p>
            <p className="text-lg font-medium">
              Price: {formatPrice(item.price)} tokens
            </p>
            <Button
              onClick={() => buyItem({ args: [item.id] })}
              disabled={isBuying}
              className="w-full"
            >
              {isBuying ? "Processing..." : "Buy Now"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
