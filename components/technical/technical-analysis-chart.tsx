"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts"
import { TrendingUp, TrendingDown, Pencil, Share2, Download, Maximize2, Minimize2 } from "lucide-react"

// Generate mock price data
const generatePriceData = () => {
  const data = []
  let price = 180
  let volume = 0

  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.48) * 2
    price = Math.max(150, Math.min(210, price + change))
    volume = Math.floor(Math.random() * 10000000) + 5000000

    data.push({
      date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
      price,
      volume,
      ma20: 180 + Math.sin(i / 10) * 5,
      ma50: 180 + Math.sin(i / 20) * 8,
      upperBB: price + 10 + Math.random() * 5,
      lowerBB: price - 10 - Math.random() * 5,
      rsi: 50 + Math.sin(i / 5) * 20,
    })
  }

  return data
}

const priceData = generatePriceData()

export default function TechnicalAnalysisChart() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeIndicator, setActiveIndicator] = useState("price")

  return (
    <Card className={`border-zinc-800 game-border game-border-bottom ${isFullscreen ? "fixed inset-4 z-50" : ""}`}>
      <div className="card-header">
        <div className="terminal-header">AAPL TECHNICAL CHART</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs tracking-wider">
            <Pencil className="mr-2 h-3 w-3" />
            DRAW
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs tracking-wider">
            <Share2 className="mr-2 h-3 w-3" />
            SHARE
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs tracking-wider">
            <Download className="mr-2 h-3 w-3" />
            EXPORT
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">$182.63</div>
            <div className="flex items-center text-accent-green">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+1.24 (+0.68%)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={activeIndicator === "ma" ? "default" : "outline"}
              size="sm"
              className={activeIndicator === "ma" ? "bg-accent-blue text-white" : "border-zinc-700"}
              onClick={() => setActiveIndicator("ma")}
            >
              MA
            </Button>
            <Button
              variant={activeIndicator === "bb" ? "default" : "outline"}
              size="sm"
              className={activeIndicator === "bb" ? "bg-accent-teal text-white" : "border-zinc-700"}
              onClick={() => setActiveIndicator("bb")}
            >
              BB
            </Button>
            <Button
              variant={activeIndicator === "rsi" ? "default" : "outline"}
              size="sm"
              className={activeIndicator === "rsi" ? "bg-accent-amber text-white" : "border-zinc-700"}
              onClick={() => setActiveIndicator("rsi")}
            >
              RSI
            </Button>
            <Button
              variant={activeIndicator === "volume" ? "default" : "outline"}
              size="sm"
              className={activeIndicator === "volume" ? "bg-accent-blue text-white" : "border-zinc-700"}
              onClick={() => setActiveIndicator("volume")}
            >
              VOL
            </Button>
          </div>
        </div>

        <div className="h-[500px] p-4">
          <Tabs defaultValue="price">
            <TabsList className="mb-4">
              <TabsTrigger value="price" className="text-xs tracking-wider">
                PRICE
              </TabsTrigger>
              <TabsTrigger value="indicators" className="text-xs tracking-wider">
                INDICATORS
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-xs tracking-wider">
                PATTERNS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="h-[400px]">
              {activeIndicator === "price" && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent-blue))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--accent-blue))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--accent-blue))"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                      name="Price"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {activeIndicator === "ma" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#fff" dot={false} strokeWidth={2} name="Price" />
                    <Line type="monotone" dataKey="ma20" stroke="hsl(var(--accent-blue))" dot={false} name="MA (20)" />
                    <Line type="monotone" dataKey="ma50" stroke="hsl(var(--accent-teal))" dot={false} name="MA (50)" />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeIndicator === "bb" && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData}>
                    <defs>
                      <linearGradient id="colorBB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent-teal))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--accent-teal))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="upperBB"
                      stroke="hsl(var(--accent-teal))"
                      fillOpacity={1}
                      fill="url(#colorBB)"
                      name="Upper BB"
                    />
                    <Line type="monotone" dataKey="price" stroke="#fff" dot={false} strokeWidth={2} name="Price" />
                    <Area
                      type="monotone"
                      dataKey="lowerBB"
                      stroke="hsl(var(--accent-teal))"
                      fillOpacity={0}
                      name="Lower BB"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {activeIndicator === "rsi" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <ReferenceLine y={70} stroke="hsl(var(--accent-red))" strokeDasharray="3 3" />
                    <ReferenceLine y={30} stroke="hsl(var(--accent-green))" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="rsi"
                      stroke="hsl(var(--accent-amber))"
                      dot={false}
                      strokeWidth={2}
                      name="RSI"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeIndicator === "volume" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#121212",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                      formatter={(value: any) => [new Intl.NumberFormat().format(value), "Volume"]}
                    />
                    <Bar dataKey="volume" fill="hsl(var(--accent-blue))" name="Volume" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>

            <TabsContent value="indicators" className="h-[400px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                <Card className="border-zinc-800">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">Moving Averages</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>MA (20)</span>
                        <span className="text-accent-green">BULLISH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>MA (50)</span>
                        <span className="text-accent-green">BULLISH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>MA (100)</span>
                        <span className="text-accent-green">BULLISH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>MA (200)</span>
                        <span className="text-accent-amber">NEUTRAL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>EMA (20)</span>
                        <span className="text-accent-green">BULLISH</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-zinc-800">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">Oscillators</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>RSI (14)</span>
                        <span className="text-accent-amber">NEUTRAL (54.2)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>MACD</span>
                        <span className="text-accent-green">BULLISH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stochastic</span>
                        <span className="text-accent-red">OVERBOUGHT</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CCI</span>
                        <span className="text-accent-amber">NEUTRAL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ADX</span>
                        <span className="text-accent-green">STRONG TREND</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="h-[400px]">
              <div className="p-4 rounded-md bg-zinc-900 h-full">
                <h3 className="text-lg font-medium mb-4">Detected Patterns</h3>
                <div className="space-y-4">
                  <div className="p-3 border border-accent-green rounded-md">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent-green" />
                      <h4 className="font-medium">Bullish Flag Pattern</h4>
                    </div>
                    <p className="text-sm mt-2">
                      A bullish continuation pattern has formed, suggesting potential upward movement. The pattern shows
                      consolidation after a strong uptrend, indicating a possible continuation of the bullish momentum.
                    </p>
                    <div className="mt-2 text-xs text-accent-green">Detected at: $178.50 on 2023-01-15</div>
                  </div>

                  <div className="p-3 border border-accent-amber rounded-md">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent-amber" />
                      <h4 className="font-medium">Support Level</h4>
                    </div>
                    <p className="text-sm mt-2">
                      A strong support level has been identified at $175.20. The price has bounced off this level
                      multiple times, indicating a significant area of buying interest.
                    </p>
                    <div className="mt-2 text-xs text-accent-amber">Confidence: Medium</div>
                  </div>

                  <div className="p-3 border border-zinc-700 rounded-md">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-zinc-400" />
                      <h4 className="font-medium">No Resistance Detected</h4>
                    </div>
                    <p className="text-sm mt-2">
                      No significant resistance levels detected in the current price range. The price may continue to
                      move freely until a new resistance level is established.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

