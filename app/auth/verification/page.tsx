"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification link to{" "}
            {email ? (
              <span className="font-medium text-foreground">{email}</span>
            ) : (
              "your email address"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Click the link in the email to verify your account and complete the signup process.
            The link will expire in 24 hours.
          </p>
          <div className="flex flex-col space-y-2 w-full">
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">
                Return to login
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Didn&apos;t receive the email?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Try again
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 