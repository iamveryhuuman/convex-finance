"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

type Stock = {
  symbol: string
  name: string
}

type StockSelectorProps = {
  selectedStock: Stock
  onSelectStock: (stock: Stock) => void
}

const popularStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
]

export default function StockSelector({ selectedStock, onSelectStock }: StockSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Stock[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call with timeout
    setTimeout(() => {
      const results = popularStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="space-y-4">
      <Label style={{ letterSpacing: "0.1em" }}>SELECT STOCK OR OPTION</Label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="SEARCH BY SYMBOL OR COMPANY NAME"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-background border-zinc-700"
            style={{ letterSpacing: "0.05em" }}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-7 w-7" onClick={clearSearch}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-white text-black hover:bg-zinc-200"
          style={{ letterSpacing: "0.1em" }}
        >
          {isSearching ? "SEARCHING..." : "SEARCH"}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="border border-zinc-800 rounded-md max-h-60 overflow-y-auto">
          {searchResults.map((stock) => (
            <div
              key={stock.symbol}
              className="p-3 hover:bg-zinc-900 cursor-pointer flex justify-between items-center"
              onClick={() => {
                onSelectStock(stock)
                clearSearch()
              }}
            >
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </div>
              <Button variant="ghost" size="sm" style={{ letterSpacing: "0.1em" }}>
                SELECT
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-md">
        <div>
          <div className="font-medium">{selectedStock.symbol}</div>
          <div className="text-xs text-muted-foreground">{selectedStock.name}</div>
        </div>
        <div className="ml-auto text-xs px-2 py-1 rounded bg-zinc-800 text-white" style={{ letterSpacing: "0.05em" }}>
          SELECTED
        </div>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground mb-2 block" style={{ letterSpacing: "0.1em" }}>
          POPULAR STOCKS
        </Label>
        <div className="flex flex-wrap gap-2">
          {popularStocks.slice(0, 6).map((stock) => (
            <Button
              key={stock.symbol}
              variant="outline"
              size="sm"
              className="border-zinc-700"
              onClick={() => onSelectStock(stock)}
            >
              {stock.symbol}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

