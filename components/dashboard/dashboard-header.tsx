"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center py-2">
      <div className="relative w-full sm:w-96">
        <form onSubmit={handleSearch}>
          <div className="relative game-border game-border-bottom">
            <Input
              type="text"
              placeholder="SEARCH STOCKS, OPTIONS, STRATEGIES..."
              className="pl-10 bg-black border-none font-mono text-sm tracking-wider"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white" />
          </div>
        </form>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="border-zinc-700 tracking-wider text-xs">
          MARKET HOURS: <span className="ml-2 text-white font-medium">OPEN</span>
        </Button>
        <Button variant="outline" className="border-zinc-700 tracking-wider text-xs">
          S&P 500: <span className="ml-2 text-white font-medium">+1.2%</span>
        </Button>
      </div>
    </div>
  )
}

