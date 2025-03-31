"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Star } from "lucide-react"
import Link from "next/link"

const watchlistData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.63, change: 1.24, changePercent: 0.68 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 337.42, change: 2.87, changePercent: 0.86 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 131.86, change: -0.54, changePercent: -0.41 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 127.74, change: 1.32, changePercent: 1.04 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 237.49, change: -3.21, changePercent: -1.33 },
]

export default function WatchlistSummary() {
  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <div className="card-header">
        <div className="terminal-header tracking-[0.25em]">WATCHLIST</div>
        <Link href="/watchlist">
          <Button variant="ghost" size="sm" className="h-7 text-xs tracking-wider">
            VIEW ALL
          </Button>
        </Link>
      </div>
      <CardContent>
        <div className="space-y-2">
          {watchlistData.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-white" />
                <div>
                  <div className="font-medium tracking-wider">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${stock.price}</div>
                <div className={`text-xs flex items-center ${stock.change >= 0 ? "text-white" : "text-zinc-400"}`}>
                  {stock.change >= 0 ? (
                    <ChevronUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change > 0 ? "+" : ""}
                  {stock.change} ({stock.changePercent > 0 ? "+" : ""}
                  {stock.changePercent}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

