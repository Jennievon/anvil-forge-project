import { useWaitForTransaction } from "wagmi";

export function useTransactionStatus(hash?: `0x${string}`) {
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash,
  });

  return {
    isLoading,
    isSuccess,
  };
}
