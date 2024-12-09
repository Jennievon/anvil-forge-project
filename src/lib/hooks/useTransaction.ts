import { useWaitForTransactionReceipt } from "wagmi";

export function useTransactionStatus(hash?: `0x${string}`) {
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    isLoading,
    isSuccess,
  };
}
