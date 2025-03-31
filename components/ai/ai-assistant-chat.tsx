"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, Send, ChevronDown, LineChart, BarChart2, TrendingUp } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your Convex AI financial assistant. I can help you analyze stocks, build investment strategies, explain market concepts, or provide insights on market trends. What would you like to know today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "Based on recent technical analysis, AAPL is showing a bullish pattern with the 50-day moving average crossing above the 200-day moving average. This golden cross suggests potential upward momentum in the coming weeks.",
        "Looking at the options chain for TSLA, I notice elevated implied volatility in the near-term contracts. This could present an opportunity for a short iron condor strategy to capitalize on potential volatility contraction after earnings.",
        "The current market conditions suggest defensive sectors like utilities and consumer staples may outperform in the near term. Consider adjusting your portfolio allocation to increase exposure to these sectors while reducing positions in high-beta growth stocks.",
        "When evaluating a bull call spread, you want to select strike prices based on your price target and risk tolerance. The lower strike should be near or slightly above the current price, while the upper strike determines your maximum profit potential and reduces the cost of the position.",
      ]

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border-zinc-800 game-border game-border-bottom overflow-hidden flex flex-col">
        <div className="card-header">
          <div className="terminal-header">AI TERMINAL</div>
          <div className="text-xs text-zinc-400">v1.0.4</div>
        </div>
        <CardContent className="p-4 flex-1 overflow-y-auto bg-black">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg font-mono text-sm ${
                    message.role === "assistant"
                      ? "bg-zinc-900 text-zinc-100 game-border game-border-bottom"
                      : "bg-zinc-800 text-white border border-zinc-700"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div
                      className="flex items-center gap-2 mb-2 text-xs text-zinc-400"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                      <span className="uppercase">CONVEX_AI</span>
                    </div>
                  )}
                  <div>{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 rounded-lg bg-zinc-900 text-zinc-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-white" />
                    <span className="font-medium" style={{ letterSpacing: "0.15em" }}>
                      CONVEX AI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" className="border-zinc-700" style={{ letterSpacing: "0.1em" }}>
              <LineChart className="mr-2 h-4 w-4" />
              TECHNICAL
            </Button>
            <Button variant="outline" size="sm" className="border-zinc-700" style={{ letterSpacing: "0.1em" }}>
              <BarChart2 className="mr-2 h-4 w-4" />
              FUNDAMENTALS
            </Button>
            <Button variant="outline" size="sm" className="border-zinc-700" style={{ letterSpacing: "0.1em" }}>
              <TrendingUp className="mr-2 h-4 w-4" />
              STRATEGIES
            </Button>
            <Button variant="outline" size="sm" className="border-zinc-700">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="ASK ABOUT STOCKS, OPTIONS, STRATEGIES..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-background border-zinc-700"
              style={{ letterSpacing: "0.05em" }}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-white text-black hover:bg-zinc-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

