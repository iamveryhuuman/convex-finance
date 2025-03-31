"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronUp, ChevronDown, BarChart2, LineChart, Trash2 } from "lucide-react"

// Mock watchlist data
const watchlistData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.24,
    changePercent: 0.68,
    volume: "32.5M",
    marketCap: "2.85T",
    pe: 29.4,
    sector: "Technology",
    favorite: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 337.42,
    change: 2.87,
    changePercent: 0.86,
    volume: "28.7M",
    marketCap: "2.51T",
    pe: 34.2,
    sector: "Technology",
    favorite: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 131.86,
    change: -0.54,
    changePercent: -0.41,
    volume: "19.2M",
    marketCap: "1.67T",
    pe: 25.1,
    sector: "Technology",
    favorite: false,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 127.74,
    change: 1.32,
    changePercent: 1.04,
    volume: "42.1M",
    marketCap: "1.32T",
    pe: 62.8,
    sector: "Consumer Cyclical",
    favorite: true,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 237.49,
    change: -3.21,
    changePercent: -1.33,
    volume: "108.3M",
    marketCap: "753.2B",
    pe: 85.3,
    sector: "Automotive",
    favorite: false,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 326.49,
    change: 4.87,
    changePercent: 1.51,
    volume: "15.7M",
    marketCap: "837.4B",
    pe: 28.6,
    sector: "Technology",
    favorite: false,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 437.53,
    change: 12.34,
    changePercent: 2.9,
    volume: "52.8M",
    marketCap: "1.08T",
    pe: 114.2,
    sector: "Technology",
    favorite: true,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 151.28,
    change: 0.42,
    changePercent: 0.28,
    volume: "8.3M",
    marketCap: "437.9B",
    pe: 11.3,
    sector: "Financial Services",
    favorite: false,
  },
]

export default function WatchlistTable() {
  const [favorites, setFavorites] = useState<string[]>(
    watchlistData.filter((stock) => stock.favorite).map((stock) => stock.symbol),
  )

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="text-xs font-mono" style={{ letterSpacing: "0.1em" }}>
                  SYMBOL
                </TableHead>
                <TableHead className="text-xs font-mono" style={{ letterSpacing: "0.1em" }}>
                  NAME
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  PRICE
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  CHANGE
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  VOLUME
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  MARKET CAP
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  P/E
                </TableHead>
                <TableHead className="text-xs font-mono" style={{ letterSpacing: "0.1em" }}>
                  SECTOR
                </TableHead>
                <TableHead className="text-xs font-mono text-right" style={{ letterSpacing: "0.1em" }}>
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-mono text-sm">
              {watchlistData.map((stock) => (
                <TableRow key={stock.symbol} className="hover:bg-zinc-900/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(stock.symbol)}
                    >
                      <Star
                        className={`h-4 w-4 ${favorites.includes(stock.symbol) ? "fill-accent-amber text-accent-amber" : "text-zinc-500"}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="font-bold">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end ${stock.change >= 0 ? "text-accent-green" : "text-accent-red"}`}
                    >
                      {stock.change >= 0 ? (
                        <ChevronUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ChevronDown className="h-3 w-3 mr-1" />
                      )}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change} ({stock.changePercent > 0 ? "+" : ""}
                      {stock.changePercent}%)
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{stock.volume}</TableCell>
                  <TableCell className="text-right">{stock.marketCap}</TableCell>
                  <TableCell className="text-right">{stock.pe}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-zinc-700">
                      {stock.sector}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <BarChart2 className="h-4 w-4 text-accent-blue" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <LineChart className="h-4 w-4 text-accent-teal" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-accent-red" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

