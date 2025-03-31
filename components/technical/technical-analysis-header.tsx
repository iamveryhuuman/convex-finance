"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TechnicalAnalysisHeader() {
  const [symbol, setSymbol] = useState("AAPL")
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 game-border game-border-bottom">
            <Input
              type="text"
              placeholder="SEARCH SYMBOL..."
              className="pl-10 bg-black border-none font-mono text-sm tracking-wider"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white" />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="1d">
              <SelectTrigger className="w-full md:w-[120px] bg-black border-zinc-800">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="1w">1 Week</SelectItem>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="candle">
              <SelectTrigger className="w-full md:w-[120px] bg-black border-zinc-800">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candle">Candlestick</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-zinc-800"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Star className={`h-4 w-4 ${isFavorite ? "fill-accent-amber text-accent-amber" : "text-zinc-500"}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

