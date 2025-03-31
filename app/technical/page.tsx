import type { Metadata } from "next"
import TechnicalAnalysisChart from "@/components/technical/technical-analysis-chart"
import TechnicalAnalysisHeader from "@/components/technical/technical-analysis-header"
import TechnicalIndicators from "@/components/technical/technical-indicators"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Technical Analysis - Convex",
  description: "Advanced technical analysis tools and charts",
}

export default function TechnicalAnalysisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">TECHNICAL ANALYSIS</h1>
      </div>

      <TechnicalAnalysisHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TechnicalAnalysisChart />
        </div>
        <div>
          <TechnicalIndicators />
        </div>
      </div>
    </div>
  )
}

