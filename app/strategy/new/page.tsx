import type { Metadata } from "next"
import StrategyBuilder from "@/components/strategy/strategy-builder"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Create New Strategy - Convex",
  description: "Build a new investment strategy with Convex",
}

export default function NewStrategy() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">CREATE NEW STRATEGY</h1>
      </div>

      <StrategyBuilder />
    </div>
  )
}

