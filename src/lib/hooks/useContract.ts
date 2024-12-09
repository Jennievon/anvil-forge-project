import { useReadContract } from "wagmi";
import { MARKETPLACE_ABI, TOKEN_ABI } from "../../config/abis";
import { MARKETPLACE_ADDRESS, TOKEN_ADDRESS } from "../../config/contracts";

export function useTokenContract() {
  const { data: name } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "symbol",
  });

  const { data: totalSupply } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "totalSupply",
  });

  return {
    name,
    symbol,
    totalSupply,
  };
}

export function useMarketplaceContract() {
  const { data: items } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "getActiveItems",
  });

  return {
    items,
  };
}
