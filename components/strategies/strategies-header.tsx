"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function StrategiesHeader() {
  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 game-border game-border-bottom">
            <Input
              type="text"
              placeholder="SEARCH STRATEGIES..."
              className="pl-10 bg-black border-none font-mono text-sm tracking-wider"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white" />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px] bg-black border-zinc-800">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strategies</SelectItem>
                <SelectItem value="options">Options</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>

            <Link href="/strategy/new">
              <Button className="bg-accent-blue text-white hover:bg-accent-blue/90" style={{ letterSpacing: "0.1em" }}>
                <Plus className="mr-2 h-4 w-4" />
                NEW STRATEGY
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

