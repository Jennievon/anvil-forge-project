import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";
import { TOKEN_ABI } from "../../constants/abi";
import { TOKEN_ADDRESS, MARKETPLACE_ADDRESS } from "../../constants/addresses";

export function useToken() {
  const { data: name } = useContractRead({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "symbol",
  });

  const { data: totalSupply } = useContractRead({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "totalSupply",
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMinting,
  } = useContractWrite({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "mint",
  });

  const {
    data: approveData,
    write: approve,
    isLoading: isApproving,
  } = useContractWrite({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "approve",
  });

  const { isLoading: isWaitingForMint } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const { isLoading: isWaitingForApprove } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const handleMint = async (to: string, amount: string) => {
    try {
      await mint({
        args: [to, parseEther(amount)],
      });
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const handleApprove = async (amount: string) => {
    try {
      await approve({
        args: [MARKETPLACE_ADDRESS, parseEther(amount)],
      });
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };

  return {
    name,
    symbol,
    totalSupply,
    mint: handleMint,
    approve: handleApprove,
    isMinting: isMinting || isWaitingForMint,
    isApproving: isApproving || isWaitingForApprove,
  };
}
