"use client"

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type StrategyVisualizerProps = {
  symbol: string
  strategyType: string
}

// Mock strategy performance data
const generateStrategyData = (strategyType: string) => {
  const data = []
  let price = 100
  let strategyValue = 100

  for (let i = 0; i < 30; i++) {
    const marketChange = (Math.random() - 0.48) * 2
    price = Math.max(90, Math.min(110, price + marketChange))

    // Strategy performance varies by type
    let strategyChange
    if (strategyType === "options") {
      // Options strategies can have more leverage/volatility
      strategyChange = marketChange * (1.5 + Math.random())
    } else if (strategyType === "equity") {
      // Equity strategies track closer to market
      strategyChange = marketChange * (1 + Math.random() * 0.3)
    } else {
      // Mixed strategies are in between
      strategyChange = marketChange * (1.2 + Math.random() * 0.5)
    }

    strategyValue = Math.max(90, Math.min(120, strategyValue + strategyChange))

    data.push({
      day: i + 1,
      market: price,
      strategy: strategyValue,
    })
  }

  return data
}

// Mock option payoff data
const generateOptionsPayoff = () => {
  const data = []

  for (let price = 160; price <= 200; price += 2) {
    let payoff

    // Simulate a bull call spread payoff
    if (price < 175) {
      payoff = -2.5
    } else if (price >= 175 && price < 190) {
      payoff = -2.5 + (price - 175) * 0.8
    } else {
      payoff = 9.5
    }

    data.push({
      price,
      payoff,
    })
  }

  return data
}

export default function StrategyVisualizer({ symbol, strategyType }: StrategyVisualizerProps) {
  const strategyData = generateStrategyData(strategyType)
  const optionsPayoff = generateOptionsPayoff()

  return (
    <div className="space-y-6">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={strategyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" />
            <YAxis domain={[90, 120]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                color: "#fff",
              }}
            />
            <Line type="monotone" dataKey="market" stroke="#94a3b8" dot={false} name="Market" />
            <Line type="monotone" dataKey="strategy" stroke="#3b82f6" dot={false} strokeWidth={2} name="Strategy" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {strategyType === "options" && (
        <div className="h-[200px]">
          <h4 className="text-sm font-medium mb-2">Options Payoff at Expiration</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={optionsPayoff}>
              <defs>
                <linearGradient id="colorPayoff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="price" />
              <YAxis domain={[-5, 15]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                  color: "#fff",
                }}
              />
              <ReferenceLine y={0} stroke="#666" />
              <ReferenceLine
                x={180}
                stroke="#f59e0b"
                strokeDasharray="3 3"
                label={{ value: "Current", position: "top", fill: "#f59e0b" }}
              />
              <Area
                type="monotone"
                dataKey="payoff"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorPayoff)"
                name="P/L"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-md bg-slate-800">
          <div className="text-xs text-muted-foreground">Expected Return</div>
          <div className="text-xl font-medium text-green-500">+12.4%</div>
        </div>
        <div className="p-3 rounded-md bg-slate-800">
          <div className="text-xs text-muted-foreground">Max Drawdown</div>
          <div className="text-xl font-medium text-red-500">-5.2%</div>
        </div>
        <div className="p-3 rounded-md bg-slate-800">
          <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
          <div className="text-xl font-medium">1.85</div>
        </div>
        <div className="p-3 rounded-md bg-slate-800">
          <div className="text-xs text-muted-foreground">Win Rate</div>
          <div className="text-xl font-medium">68%</div>
        </div>
      </div>
    </div>
  )
}

