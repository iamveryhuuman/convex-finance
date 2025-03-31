"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { BarChart, Sparkles, LineChart, BarChart2, Save, Play } from "lucide-react"
import StockSelector from "@/components/strategy/stock-selector"
import OptionsChain from "@/components/strategy/options-chain"
import FundamentalAnalysis from "@/components/strategy/fundamental-analysis"
import TechnicalAnalysis from "@/components/strategy/technical-analysis"
import StrategyVisualizer from "@/components/strategy/strategy-visualizer"

export default function StrategyBuilder() {
  const [strategyType, setStrategyType] = useState("options")
  const [selectedStock, setSelectedStock] = useState({ symbol: "AAPL", name: "Apple Inc." })
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [useAI, setUseAI] = useState(true)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-zinc-800 game-border game-border-bottom">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="strategy-name" style={{ letterSpacing: "0.1em" }}>
                  STRATEGY NAME
                </Label>
                <Input
                  id="strategy-name"
                  placeholder="ENTER STRATEGY NAME"
                  className="bg-background border-zinc-700"
                  style={{ letterSpacing: "0.05em" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategy-type" style={{ letterSpacing: "0.1em" }}>
                  STRATEGY TYPE
                </Label>
                <Select defaultValue={strategyType} onValueChange={setStrategyType}>
                  <SelectTrigger id="strategy-type" className="bg-background border-zinc-700">
                    <SelectValue placeholder="Select strategy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="options">Options Strategy</SelectItem>
                    <SelectItem value="equity">Equity Strategy</SelectItem>
                    <SelectItem value="mixed">Mixed Strategy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <Label style={{ letterSpacing: "0.1em" }}>RISK TOLERANCE</Label>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs">CONSERVATIVE</span>
                <Slider
                  value={[riskTolerance]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setRiskTolerance(value[0])}
                  className="flex-1"
                />
                <span className="text-xs">AGGRESSIVE</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
              <Label htmlFor="use-ai" className="flex items-center gap-2" style={{ letterSpacing: "0.1em" }}>
                USE AI RECOMMENDATIONS
                <Sparkles className="h-4 w-4 text-white" />
              </Label>
            </div>

            <StockSelector selectedStock={selectedStock} onSelectStock={setSelectedStock} />
          </CardContent>
        </Card>

        <Tabs defaultValue="options" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="options" className="flex items-center gap-2" style={{ letterSpacing: "0.1em" }}>
              <BarChart className="h-4 w-4" />
              <span>OPTIONS CHAIN</span>
            </TabsTrigger>
            <TabsTrigger value="fundamental" className="flex items-center gap-2" style={{ letterSpacing: "0.1em" }}>
              <BarChart2 className="h-4 w-4" />
              <span>FUNDAMENTAL</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2" style={{ letterSpacing: "0.1em" }}>
              <LineChart className="h-4 w-4" />
              <span>TECHNICAL</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="options">
            <Card className="border-zinc-800 game-border game-border-bottom">
              <CardContent className="pt-6">
                <OptionsChain symbol={selectedStock.symbol} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fundamental">
            <Card className="border-zinc-800 game-border game-border-bottom">
              <CardContent className="pt-6">
                <FundamentalAnalysis symbol={selectedStock.symbol} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="border-zinc-800 game-border game-border-bottom">
              <CardContent className="pt-6">
                <TechnicalAnalysis symbol={selectedStock.symbol} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <Card className="border-zinc-800 game-border game-border-bottom">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4" style={{ letterSpacing: "0.15em" }}>
              STRATEGY VISUALIZATION
            </h3>
            <StrategyVisualizer symbol={selectedStock.symbol} strategyType={strategyType} />

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button className="w-full bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
                <Save className="mr-2 h-4 w-4" />
                SAVE
              </Button>
              <Button className="w-full bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
                <Play className="mr-2 h-4 w-4" />
                BACKTEST
              </Button>
            </div>
          </CardContent>
        </Card>

        {useAI && (
          <Card className="border-zinc-800 game-border game-border-bottom">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium" style={{ letterSpacing: "0.15em" }}>
                  AI RECOMMENDATIONS
                </h3>
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-md bg-zinc-900 text-sm">
                  Based on current volatility, a bull call spread may optimize your risk/reward ratio.
                </div>
                <div className="p-3 rounded-md bg-zinc-900 text-sm">
                  AAPL's upcoming earnings may increase IV. Consider closing positions before the announcement.
                </div>
                <div className="p-3 rounded-md bg-zinc-900 text-sm">
                  Technical indicators suggest strong support at $175. Consider this as your stop-loss level.
                </div>
              </div>

              <Button className="w-full mt-4 bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
                <Sparkles className="mr-2 h-4 w-4" />
                GENERATE AI STRATEGY
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

