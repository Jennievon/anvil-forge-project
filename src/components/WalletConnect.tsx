import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";

export function WalletConnect() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Disconnect {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Connect Wallet
    </button>
  );
}
