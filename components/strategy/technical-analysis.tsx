"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Label } from "@/components/ui/label"

type TechnicalAnalysisProps = {
  symbol: string
}

// Mock price data
const generatePriceData = () => {
  const data = []
  let price = 180

  for (let i = 0; i < 60; i++) {
    const change = (Math.random() - 0.48) * 2
    price = Math.max(150, Math.min(210, price + change))

    const volume = Math.floor(Math.random() * 10000000) + 5000000

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

export default function TechnicalAnalysis({ symbol }: TechnicalAnalysisProps) {
  const [timeframe, setTimeframe] = useState("3m")
  const [indicator, setIndicator] = useState("ma")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Timeframe</Label>
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[100px] bg-background border-slate-700">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="1w">1 Week</SelectItem>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Indicator</Label>
            <Select defaultValue={indicator} onValueChange={setIndicator}>
              <SelectTrigger className="w-[120px] bg-background border-slate-700">
                <SelectValue placeholder="Indicator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ma">Moving Avg</SelectItem>
                <SelectItem value="bb">Bollinger Bands</SelectItem>
                <SelectItem value="rsi">RSI</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-slate-700">
            Support/Resistance
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700">
            Patterns
          </Button>
        </div>
      </div>

      <Card className="border-slate-800">
        <CardContent className="pt-6">
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="signals">Signals</TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <div className="h-[400px]">
                {indicator === "ma" && (
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
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <Line type="monotone" dataKey="price" stroke="#fff" dot={false} strokeWidth={2} name="Price" />
                      <Line type="monotone" dataKey="ma20" stroke="#3b82f6" dot={false} name="MA (20)" />
                      <Line type="monotone" dataKey="ma50" stroke="#14b8a6" dot={false} name="MA (50)" />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {indicator === "bb" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData}>
                      <defs>
                        <linearGradient id="colorBB" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="upperBB"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorBB)"
                        name="Upper BB"
                      />
                      <Line type="monotone" dataKey="price" stroke="#fff" dot={false} strokeWidth={2} name="Price" />
                      <Area type="monotone" dataKey="lowerBB" stroke="#3b82f6" fillOpacity={0} name="Lower BB" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {indicator === "rsi" && (
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
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                      <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="rsi" stroke="#f59e0b" dot={false} strokeWidth={2} name="RSI" />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {indicator === "volume" && (
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
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                        formatter={(value: any) => [new Intl.NumberFormat().format(value), "Volume"]}
                      />
                      <Bar dataKey="volume" fill="#3b82f6" name="Volume" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </TabsContent>

            <TabsContent value="signals">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-md bg-green-900/30 border border-green-800">
                    <div className="text-sm text-green-400 mb-1">BULLISH SIGNAL</div>
                    <div className="font-medium">Golden Cross</div>
                    <div className="text-xs text-muted-foreground mt-1">50-day MA crossed above 200-day MA</div>
                  </div>

                  <div className="p-4 rounded-md bg-amber-900/30 border border-amber-800">
                    <div className="text-sm text-amber-400 mb-1">NEUTRAL SIGNAL</div>
                    <div className="font-medium">RSI Midrange</div>
                    <div className="text-xs text-muted-foreground mt-1">RSI at 54.2, indicating neutral momentum</div>
                  </div>

                  <div className="p-4 rounded-md bg-slate-800 border border-slate-700">
                    <div className="text-sm text-blue-400 mb-1">SUPPORT LEVEL</div>
                    <div className="font-medium">$175.50</div>
                    <div className="text-xs text-muted-foreground mt-1">Strong support with multiple bounces</div>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-slate-800 border border-slate-700">
                  <h3 className="text-lg font-medium mb-2">Technical Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      {symbol} is currently in a <span className="text-green-500">bullish trend</span> with the price
                      trading above both the 20-day and 50-day moving averages. The recent golden cross (50-day MA
                      crossing above 200-day MA) suggests potential for continued upward momentum.
                    </p>
                    <p>
                      The RSI at 54.2 indicates neutral momentum, neither overbought nor oversold. Bollinger Bands show
                      moderate volatility with price near the middle band, suggesting a potential continuation of the
                      current trend.
                    </p>
                    <p>
                      Key support levels are established at $175.50 and $172.25, while resistance is found at $185.75
                      and $190.00. Volume has been <span className="text-amber-500">average</span> in recent sessions,
                      indicating neither strong accumulation nor distribution.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

