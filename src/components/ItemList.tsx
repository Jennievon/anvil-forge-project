import React from 'react';
import { useMarketplace } from '../hooks/useMarketplace';
import { useToken } from '../hooks/useToken';
import { formatEther } from 'viem';

export function ItemList() {
  const { activeItems, buyItem, isBuying } = useMarketplace();
  const { approve, isApproving } = useToken();

  const handleBuy = async (itemId: bigint, price: bigint) => {
    await approve(formatEther(price));
    await buyItem(itemId);
  };

  if (!activeItems || activeItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No items available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeItems.map((item) => (
        <div key={item.id.toString()} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <p className="text-lg font-medium mb-4">
            Price: {formatEther(item.price)} tokens
          </p>
          <button
            onClick={() => handleBuy(item.id, item.price)}
            disabled={isBuying || isApproving}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isBuying || isApproving ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      ))}
    </div>
  );
}