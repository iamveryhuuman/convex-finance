"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, LogOut, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { signOut } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/auth/login")
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl blocky-title">USER PROFILE</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-800 game-border game-border-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ letterSpacing: "0.1em" }}>
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-black border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ letterSpacing: "0.1em" }}>
                    DISPLAY NAME
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your display name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black border-zinc-800"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-accent-blue text-white hover:bg-accent-blue/90"
                  disabled={isLoading}
                  style={{ letterSpacing: "0.1em" }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "SAVING..." : "SAVE CHANGES"}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <Button
                variant="outline"
                className="w-full border-accent-red text-accent-red hover:bg-accent-red/10"
                onClick={handleLogout}
                style={{ letterSpacing: "0.1em" }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                SIGN OUT
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 game-border game-border-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-md bg-zinc-900 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Current Plan</h3>
                <Badge className="bg-accent-blue text-white">ACTIVE</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-1">Convex Pro</h2>
              <p className="text-sm text-zinc-400 mb-4">Unlimited access to all features</p>
              <div className="flex justify-between items-center">
                <span>$29.99/month</span>
                <span className="text-xs text-zinc-400">Next billing: Dec 15, 2023</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Plan Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-accent-green mr-2" />
                  <span>Real-time market data</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-accent-green mr-2" />
                  <span>Advanced technical indicators</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-accent-green mr-2" />
                  <span>AI-powered strategy recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-accent-green mr-2" />
                  <span>Options chain analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-accent-green mr-2" />
                  <span>Unlimited watchlists</span>
                </li>
              </ul>

              <Button className="w-full bg-white text-black hover:bg-zinc-200" style={{ letterSpacing: "0.1em" }}>
                MANAGE SUBSCRIPTION
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

