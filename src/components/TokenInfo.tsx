import React from 'react';
import { useToken } from '../hooks/useToken';
import { formatEther } from 'viem';

export function TokenInfo() {
  const { name, symbol, totalSupply } = useToken();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Token Information</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">Name:</span> {name}</p>
        <p><span className="font-semibold">Symbol:</span> {symbol}</p>
        <p><span className="font-semibold">Total Supply:</span> {totalSupply ? formatEther(totalSupply) : '0'}</p>
      </div>
    </div>
  );
}