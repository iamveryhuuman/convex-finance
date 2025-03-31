"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GeometricLogo } from "@/components/geometric-logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await signIn(email, password)

      if (error) {
        throw error
      }

      // Redirect to dashboard on successful login
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <Card className="w-full max-w-md border-zinc-800 game-border game-border-bottom">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 mb-2">
            <GeometricLogo />
          </div>
          <CardTitle className="text-2xl blocky-title">LOGIN TO CONVEX</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 mb-4 rounded-md bg-red-900/30 border border-accent-red text-white">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ letterSpacing: "0.1em" }}>
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" style={{ letterSpacing: "0.1em" }}>
                    PASSWORD
                  </Label>
                  <Link href="/auth/reset-password" className="text-xs text-accent-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black border-zinc-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-accent-blue text-white hover:bg-accent-blue/90"
                disabled={isLoading}
                style={{ letterSpacing: "0.1em" }}
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-accent-blue hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

