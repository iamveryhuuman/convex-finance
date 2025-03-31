"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Minus, AlertTriangle, TrendingUp, TrendingDown, BarChart4 } from "lucide-react"

export default function TechnicalIndicators() {
  return (
    <div className="space-y-4">
      <Card className="border-zinc-800 game-border game-border-bottom">
        <div className="card-header">
          <div className="terminal-header">TECHNICAL SUMMARY</div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold">AAPL</div>
            <Badge className="bg-accent-green text-white">BULLISH</Badge>
          </div>

          <p className="text-sm mb-4">
            Apple Inc. (AAPL) is currently showing bullish momentum with price action above key moving averages. The
            stock has formed a bullish flag pattern and is testing previous resistance levels.
          </p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-2 bg-zinc-900 rounded-md text-center">
              <div className="text-xs text-zinc-400">SHORT</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-accent-green mr-1" />
                <span className="text-accent-green">BUY</span>
              </div>
            </div>
            <div className="p-2 bg-zinc-900 rounded-md text-center">
              <div className="text-xs text-zinc-400">MEDIUM</div>
              <div className="flex items-center justify-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-accent-green mr-1" />
                <span className="text-accent-green">BUY</span>
              </div>
            </div>
            <div className="p-2 bg-zinc-900 rounded-md text-center">
              <div className="text-xs text-zinc-400">LONG</div>
              <div className="flex items-center justify-center mt-1">
                <Minus className="h-4 w-4 text-accent-amber mr-1" />
                <span className="text-accent-amber">HOLD</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Moving Averages</span>
              <Badge className="bg-accent-green text-white">BUY</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Oscillators</span>
              <Badge className="bg-accent-amber text-white">NEUTRAL</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pivot Points</span>
              <Badge className="bg-accent-green text-white">BULLISH</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 game-border game-border-bottom">
        <div className="card-header">
          <div className="terminal-header">KEY LEVELS</div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-accent-red mr-2" />
                <span>Resistance 2</span>
              </div>
              <div className="font-mono">$190.50</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-accent-red mr-2" />
                <span>Resistance 1</span>
              </div>
              <div className="font-mono">$185.75</div>
            </div>
            <div className="flex justify-between items-center bg-zinc-900 p-2 rounded-md">
              <div className="flex items-center">
                <BarChart4 className="h-4 w-4 text-white mr-2" />
                <span>Current Price</span>
              </div>
              <div className="font-mono">$182.63</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-accent-green mr-2" />
                <span>Support 1</span>
              </div>
              <div className="font-mono">$175.20</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-accent-green mr-2" />
                <span>Support 2</span>
              </div>
              <div className="font-mono">$172.40</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 game-border game-border-bottom">
        <div className="card-header">
          <div className="terminal-header">ALERTS</div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="p-3 border border-accent-amber rounded-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent-amber" />
                <h4 className="font-medium">Price Approaching Resistance</h4>
              </div>
              <p className="text-sm mt-1">
                AAPL is approaching a key resistance level at $185.75. Consider setting a take-profit order if you're in
                a long position.
              </p>
            </div>

            <div className="p-3 border border-accent-green rounded-md">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent-green" />
                <h4 className="font-medium">Golden Cross Detected</h4>
              </div>
              <p className="text-sm mt-1">
                The 50-day moving average has crossed above the 200-day moving average, forming a golden cross pattern.
                This is typically a bullish signal.
              </p>
            </div>

            <Button className="w-full bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
              SET CUSTOM ALERT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

