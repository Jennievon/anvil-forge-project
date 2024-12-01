import React from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { TokenInfo } from './components/TokenInfo';
import { MintForm } from './components/MintForm';
import { ListItemForm } from './components/ListItemForm';
import { ItemList } from './components/ItemList';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Marketplace dApp</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TokenInfo />
            <MintForm />
          </div>
          
          <ListItemForm />
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Items</h2>
            <ItemList />
          </div>
        </div>
      </div>
    </WagmiConfig>
  );
}

export default App;