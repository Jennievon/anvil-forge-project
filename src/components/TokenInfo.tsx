import { Card } from "./ui/Card";
import { useTokenContract } from "../lib/hooks/useContract";
import { formatPrice } from "../lib/utils/format";

export function TokenInfo() {
  const { name, symbol, totalSupply } = useTokenContract();

  return (
    <Card title="Token Information">
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {name || "Loading..."}
        </p>
        <p>
          <span className="font-semibold">Symbol:</span>{" "}
          {symbol || "Loading..."}
        </p>
        <p>
          <span className="font-semibold">Total Supply:</span>{" "}
          {totalSupply ? formatPrice(totalSupply) : "Loading..."}
        </p>
      </div>
    </Card>
  );
}
