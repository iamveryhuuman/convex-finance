import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, TrendingUp } from "lucide-react"
import Link from "next/link"

const strategyData = [
  {
    id: "strat-1",
    name: "AAPL Bull Call Spread",
    type: "Options",
    expectedReturn: "+12.4%",
    risk: "Medium",
    date: "2 days ago",
  },
  {
    id: "strat-2",
    name: "TSLA Covered Call",
    type: "Options",
    expectedReturn: "+5.2%",
    risk: "Low",
    date: "1 week ago",
  },
  {
    id: "strat-3",
    name: "Tech Sector Rotation",
    type: "Equity",
    expectedReturn: "+8.7%",
    risk: "Medium",
    date: "2 weeks ago",
  },
]

export default function RecentStrategies() {
  return (
    <Card className="border-zinc-800 game-border game-border-bottom">
      <div className="card-header">
        <div className="terminal-header tracking-[0.25em]">RECENT STRATEGIES</div>
        <Link href="/strategies">
          <Button variant="ghost" size="sm" className="h-7 text-xs tracking-wider">
            VIEW ALL
          </Button>
        </Link>
      </div>
      <CardContent>
        <div className="space-y-4">
          {strategyData.map((strategy) => (
            <Link href={`/strategy/${strategy.id}`} key={strategy.id}>
              <div className="p-4 rounded-md border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {strategy.type === "Options" ? (
                      <BarChart className="h-4 w-4 text-white" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-white" />
                    )}
                    <h3 className="font-medium tracking-wider">{strategy.name}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{strategy.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Type: </span>
                    <span>{strategy.type}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Expected Return: </span>
                    <span className="text-white">{strategy.expectedReturn}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Risk: </span>
                    <span
                      className={
                        strategy.risk === "Low"
                          ? "text-white"
                          : strategy.risk === "Medium"
                            ? "text-zinc-300"
                            : "text-zinc-400"
                      }
                    >
                      {strategy.risk}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

