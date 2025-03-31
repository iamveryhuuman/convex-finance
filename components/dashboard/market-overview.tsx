"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const marketData = [
  { date: "9:30", sp500: 4200, nasdaq: 14100, dow: 34500 },
  { date: "10:00", sp500: 4210, nasdaq: 14150, dow: 34550 },
  { date: "10:30", sp500: 4215, nasdaq: 14200, dow: 34600 },
  { date: "11:00", sp500: 4225, nasdaq: 14250, dow: 34650 },
  { date: "11:30", sp500: 4230, nasdaq: 14300, dow: 34700 },
  { date: "12:00", sp500: 4240, nasdaq: 14350, dow: 34750 },
  { date: "12:30", sp500: 4235, nasdaq: 14325, dow: 34725 },
  { date: "13:00", sp500: 4245, nasdaq: 14375, dow: 34775 },
  { date: "13:30", sp500: 4255, nasdaq: 14400, dow: 34800 },
  { date: "14:00", sp500: 4260, nasdaq: 14425, dow: 34825 },
  { date: "14:30", sp500: 4265, nasdaq: 14450, dow: 34850 },
  { date: "15:00", sp500: 4270, nasdaq: 14475, dow: 34875 },
  { date: "15:30", sp500: 4280, nasdaq: 14500, dow: 34900 },
  { date: "16:00", sp500: 4290, nasdaq: 14550, dow: 34950 },
]

const sectorData = [
  { name: "Technology", value: 2.4 },
  { name: "Healthcare", value: 1.2 },
  { name: "Financials", value: 0.8 },
  { name: "Consumer", value: 0.5 },
  { name: "Energy", value: -0.3 },
  { name: "Utilities", value: -0.7 },
  { name: "Materials", value: 0.2 },
  { name: "Industrials", value: 1.0 },
  { name: "Real Estate", value: -0.5 },
  { name: "Telecom", value: 0.6 },
]

export default function MarketOverview() {
  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <div className="card-header">
        <div className="terminal-header tracking-[0.25em]">MARKET OVERVIEW</div>
        <div className="text-xs text-zinc-400">Real-time market performance</div>
      </div>
      <CardContent>
        <Tabs defaultValue="indices">
          <TabsList className="mb-4">
            <TabsTrigger value="indices" className="text-xs tracking-[0.15em]">
              INDICES
            </TabsTrigger>
            <TabsTrigger value="sectors" className="text-xs tracking-[0.15em]">
              SECTORS
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="text-xs tracking-[0.15em]">
              HEAT MAP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="indices" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData}>
                <defs>
                  <linearGradient id="colorSp500" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNasdaq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cccccc" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#cccccc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#666" />
                <YAxis domain={["auto", "auto"]} stroke="#666" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121212",
                    borderColor: "#333",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sp500"
                  stroke="#ffffff"
                  fillOpacity={1}
                  fill="url(#colorSp500)"
                  name="S&P 500"
                />
                <Area
                  type="monotone"
                  dataKey="nasdaq"
                  stroke="#cccccc"
                  fillOpacity={1}
                  fill="url(#colorNasdaq)"
                  name="NASDAQ"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="sectors" className="h-[300px]">
            <div className="grid grid-cols-2 gap-4">
              {sectorData.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between p-3 rounded-md bg-zinc-900">
                  <span className="font-mono tracking-wider">{sector.name}</span>
                  <span className={sector.value >= 0 ? "text-white" : "text-zinc-400"}>
                    {sector.value > 0 ? "+" : ""}
                    {sector.value}%
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="h-[300px]">
            <div className="grid grid-cols-5 gap-2 h-full">
              {Array.from({ length: 25 }).map((_, i) => {
                const randomValue = Math.random() * 6 - 3
                const intensity = Math.abs(randomValue) / 3
                const bgColor =
                  randomValue >= 0 ? `rgba(255, 255, 255, ${intensity})` : `rgba(100, 100, 100, ${intensity})`

                return (
                  <div
                    key={i}
                    className="flex flex-col justify-between p-2 rounded-md"
                    style={{ backgroundColor: bgColor }}
                  >
                    <span className="text-xs font-medium">AAPL</span>
                    <span className="text-xs">
                      {randomValue > 0 ? "+" : ""}
                      {randomValue.toFixed(1)}%
                    </span>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

