"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GeometricLogo } from "@/components/geometric-logo"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await signUp(email, password)

      if (error) {
        throw error
      }

      // Redirect to verification page with email
      router.push(`/auth/verification?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      setError(err.message || "Failed to sign up")
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
          <CardTitle className="text-2xl blocky-title">CREATE ACCOUNT</CardTitle>
          <CardDescription>Enter your details to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-3 mb-4 rounded-md bg-red-900/30 border border-accent-red text-white">{error}</div>
          )}

          <form onSubmit={handleRegister}>
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
                <Label htmlFor="password" style={{ letterSpacing: "0.1em" }}>
                  PASSWORD
                </Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password" style={{ letterSpacing: "0.1em" }}>
                  CONFIRM PASSWORD
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent-blue hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

