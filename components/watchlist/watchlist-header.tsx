"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WatchlistHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 game-border game-border-bottom">
            <Input
              type="text"
              placeholder="SEARCH WATCHLIST..."
              className="pl-10 bg-black border-none font-mono text-sm tracking-wider"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white" />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px] bg-black border-zinc-800">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="etf">ETFs</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-accent-blue text-white hover:bg-accent-blue/90" style={{ letterSpacing: "0.1em" }}>
              <Plus className="mr-2 h-4 w-4" />
              ADD ASSET
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

