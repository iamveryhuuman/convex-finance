import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import MarketOverview from "@/components/dashboard/market-overview"
import WatchlistSummary from "@/components/dashboard/watchlist-summary"
import RecentStrategies from "@/components/dashboard/recent-strategies"
import AIInsights from "@/components/dashboard/ai-insights"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Convex - Financial Intelligence Platform",
  description: "Professional-grade financial intelligence platform for stock and options analysis",
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl blocky-title tracking-[0.35em]">DASHBOARD</h1>
        <Link href="/strategy/new">
          <Button className="bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-[0.15em]">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Strategy
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <MarketOverview />
        </div>
        <div>
          <WatchlistSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentStrategies />
        <AIInsights />
      </div>
    </div>
  )
}

