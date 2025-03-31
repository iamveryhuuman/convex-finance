import type { Metadata } from "next"
import AIAssistantChat from "@/components/ai/ai-assistant-chat"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Assistant - Convex",
  description: "AI-powered financial assistant for market analysis and strategy building",
}

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">AI ASSISTANT</h1>
      </div>

      <AIAssistantChat />
    </div>
  )
}

