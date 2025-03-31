import type { Metadata } from "next"
import WatchlistTable from "@/components/watchlist/watchlist-table"
import WatchlistHeader from "@/components/watchlist/watchlist-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Watchlist - Convex",
  description: "Track and monitor your favorite stocks and assets",
}

export default function WatchlistPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">WATCHLIST</h1>
      </div>

      <WatchlistHeader />
      <WatchlistTable />
    </div>
  )
}

