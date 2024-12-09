import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { MARKETPLACE_ABI } from "../../constants/abi";
import { MARKETPLACE_ADDRESS } from "../../constants/addresses";

export function useMarketplace() {
  const { data: activeItems, refetch: refetchItems } = useContractRead({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "getActiveItems",
  });

  const {
    data: listItemData,
    write: listItem,
    isLoading: isListing,
  } = useContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "listItem",
  });

  const {
    data: buyItemData,
    write: buyItem,
    isLoading: isBuying,
  } = useContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "buyItem",
  });

  const { isLoading: isWaitingForList } = useWaitForTransaction({
    hash: listItemData?.hash,
    onSuccess: () => refetchItems(),
  });

  const { isLoading: isWaitingForBuy } = useWaitForTransaction({
    hash: buyItemData?.hash,
    onSuccess: () => refetchItems(),
  });

  const handleListItem = async (
    name: string,
    description: string,
    price: string
  ) => {
    try {
      await listItem({
        args: [name, description, parseEther(price)],
      });
    } catch (error) {
      console.error("Error listing item:", error);
    }
  };

  const handleBuyItem = async (itemId: bigint) => {
    try {
      await buyItem({
        args: [itemId],
      });
    } catch (error) {
      console.error("Error buying item:", error);
    }
  };

  return {
    activeItems,
    listItem: handleListItem,
    buyItem: handleBuyItem,
    isListing: isListing || isWaitingForList,
    isBuying: isBuying || isWaitingForBuy,
  };
}
