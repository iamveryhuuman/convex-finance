import type { Metadata } from "next"
import StrategiesList from "@/components/strategies/strategies-list"
import StrategiesHeader from "@/components/strategies/strategies-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Strategies - Convex",
  description: "Manage and track your investment strategies",
}

export default function StrategiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">STRATEGIES</h1>
      </div>

      <StrategiesHeader />
      <StrategiesList />
    </div>
  )
}

