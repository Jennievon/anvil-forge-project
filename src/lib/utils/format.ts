import { formatUnits } from "viem";

export function formatPrice(value: bigint): string {
  return formatUnits(value, 18);
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function parsePrice(value: string): bigint {
  return BigInt(Math.floor(Number(value) * 1e18));
}
