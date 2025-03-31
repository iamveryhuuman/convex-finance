"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"
import Link from "next/link"

const insights = [
  "NVDA showing strong momentum with AI chip demand, consider a bull call spread strategy",
  "Energy sector showing weakness, XLE approaching key support level",
  "Volatility index (VIX) declining, favorable for short put strategies",
  "AAPL earnings approaching, implied volatility suggests potential for iron condor strategy",
]

export default function AIInsights() {
  const [loading, setLoading] = useState(false)

  const refreshInsights = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <div className="card-header">
        <div className="terminal-header tracking-[0.25em] flex items-center gap-2">
          AI INSIGHTS
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 border-zinc-700"
          onClick={refreshInsights}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 rounded-md bg-zinc-900 text-sm font-mono">
              {insight}
            </div>
          ))}
          <Link href="/ai-assistant">
            <Button className="w-full mt-2 bg-white text-black hover:bg-zinc-200">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="tracking-[0.15em]">ASK AI ASSISTANT</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

