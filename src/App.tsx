import { WagmiConfig } from "wagmi";
import { config } from "./config/wagmi";
import { TokenInfo } from "./components/TokenInfo";
import { MintForm } from "./components/MintForm";
import { ListItemForm } from "./components/ListItemForm";
import { ItemList } from "./components/ItemList";
import { WalletConnect } from "./components/WalletConnect";

function App() {
  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Marketplace dApp</h1>
            <WalletConnect />
          </div>

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
