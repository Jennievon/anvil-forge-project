import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parsePrice } from "../lib/utils/format";
import { MARKETPLACE_ABI } from "../config/abis";
import { MARKETPLACE_ADDRESS } from "../config/contracts";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export function ListItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const { writeContract: listItem, isPending: isListing } = useWriteContract();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) return;

    listItem({
      abi: MARKETPLACE_ABI,
      address: MARKETPLACE_ADDRESS,
      functionName: "listItem",
      args: [name, description, parsePrice(price)],
    });
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <Card title="List New Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (in tokens)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            step="0.000000000000000001"
            required
          />
        </div>
        <Button type="submit" disabled={isListing}>
          {isListing ? "Listing..." : "List Item"}
        </Button>
      </form>
    </Card>
  );
}
