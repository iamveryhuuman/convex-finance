"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, TrendingUp, Calendar, ChevronRight, Sparkles, Copy, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock strategies data
const strategiesData = [
  {
    id: "strat-1",
    name: "AAPL Bull Call Spread",
    description: "Bullish strategy on Apple with limited risk and reward",
    type: "Options",
    expectedReturn: "+12.4%",
    risk: "Medium",
    date: "2023-11-15",
    assets: ["AAPL"],
    aiGenerated: true,
  },
  {
    id: "strat-2",
    name: "TSLA Covered Call",
    description: "Generate income on Tesla shares with upside potential",
    type: "Options",
    expectedReturn: "+5.2%",
    risk: "Low",
    date: "2023-11-10",
    assets: ["TSLA"],
    aiGenerated: false,
  },
  {
    id: "strat-3",
    name: "Tech Sector Rotation",
    description: "Tactical allocation to tech subsectors based on momentum",
    type: "Equity",
    expectedReturn: "+8.7%",
    risk: "Medium",
    date: "2023-11-05",
    assets: ["XLK", "SOXX", "ARKK", "QQQJ"],
    aiGenerated: false,
  },
  {
    id: "strat-4",
    name: "SPY Iron Condor",
    description: "Neutral strategy on S&P 500 with defined risk/reward",
    type: "Options",
    expectedReturn: "+3.8%",
    risk: "Low",
    date: "2023-11-01",
    assets: ["SPY"],
    aiGenerated: true,
  },
  {
    id: "strat-5",
    name: "Semiconductor Momentum",
    description: "Long position in semiconductor stocks showing technical strength",
    type: "Equity",
    expectedReturn: "+15.2%",
    risk: "High",
    date: "2023-10-28",
    assets: ["NVDA", "AMD", "AMAT", "ASML"],
    aiGenerated: false,
  },
  {
    id: "strat-6",
    name: "AMZN Diagonal Spread",
    description: "Capitalize on time decay while maintaining upside potential",
    type: "Options",
    expectedReturn: "+7.5%",
    risk: "Medium",
    date: "2023-10-22",
    assets: ["AMZN"],
    aiGenerated: true,
  },
]

export default function StrategiesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {strategiesData.map((strategy) => (
        <Card
          key={strategy.id}
          className="border-zinc-800 game-border game-border-bottom hover:border-zinc-700 transition-colors"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {strategy.type === "Options" ? (
                  <BarChart className="h-5 w-5 text-accent-blue" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-accent-teal" />
                )}
                <h3 className="font-medium tracking-wider">{strategy.name}</h3>
                {strategy.aiGenerated && <Sparkles className="h-4 w-4 text-accent-amber" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Calendar className="h-3 w-3" />
                <span>{new Date(strategy.date).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-3">{strategy.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-xs">
                <span className="text-zinc-400">Type: </span>
                <Badge variant="outline" className="ml-1 border-zinc-700">
                  {strategy.type}
                </Badge>
              </div>
              <div className="text-xs">
                <span className="text-zinc-400">Expected Return: </span>
                <span className="text-accent-green">{strategy.expectedReturn}</span>
              </div>
              <div className="text-xs">
                <span className="text-zinc-400">Risk: </span>
                <span
                  className={
                    strategy.risk === "Low"
                      ? "text-accent-green"
                      : strategy.risk === "Medium"
                        ? "text-accent-amber"
                        : "text-accent-red"
                  }
                >
                  {strategy.risk}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {strategy.assets.map((asset) => (
                <Badge key={asset} variant="outline" className="border-zinc-700">
                  {asset}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Copy className="h-4 w-4 text-zinc-400" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Trash2 className="h-4 w-4 text-accent-red" />
                </Button>
              </div>
              <Link href={`/strategy/${strategy.id}`}>
                <Button className="bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
                  VIEW
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

