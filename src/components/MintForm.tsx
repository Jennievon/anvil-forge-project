import React, { useState } from 'react';
import { useToken } from '../hooks/useToken';

export function MintForm() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { mint, isMinting } = useToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mint(address, amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mint Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Recipient Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="0x..."
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            step="0.000000000000000001"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isMinting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isMinting ? 'Minting...' : 'Mint'}
        </button>
      </form>
    </div>
  );
}