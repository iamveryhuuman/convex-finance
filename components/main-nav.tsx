"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  LineChart,
  BarChart2,
  Sparkles,
  BookOpen,
  Bell,
  Settings,
  Menu,
  X,
  TrendingUp,
  Star,
  Users,
  Newspaper,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

// 3D Geometric Logo component
const GeometricLogo = () => (
  <div className="relative w-8 h-8">
    {/* Base cube */}
    <div className="absolute w-6 h-6 top-1 left-1 border-2 border-white transform rotate-[15deg] skew-y-[15deg]"></div>

    {/* Top face */}
    <div className="absolute w-6 h-6 top-0 left-1 border-2 border-white transform rotate-[15deg] skew-x-[-15deg]"></div>

    {/* Side face */}
    <div className="absolute w-6 h-6 top-1 left-0 border-2 border-white transform rotate-[15deg] skew-y-[-15deg]"></div>

    {/* Inner detail */}
    <div className="absolute w-2 h-2 top-3 left-3 bg-white transform rotate-[15deg]"></div>
  </div>
)

export default function MainNav() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Watchlist",
      href: "/watchlist",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Strategies",
      href: "/strategies",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Technical Analysis",
      href: "/technical",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Fundamental Analysis",
      href: "/fundamental",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "AI Assistant",
      href: "/ai-assistant",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "News & Research",
      href: "/news",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      title: "Community",
      href: "/community",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Learning Center",
      href: "/learning",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 transition-transform duration-300 ease-in-out",
    {
      "translate-x-0": isOpen || !isMobile,
      "-translate-x-full": !isOpen && isMobile,
    },
  )

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800">
            <Link href="/" className="flex items-center gap-3">
              <GeometricLogo />
              <span className="text-xl blocky-title">CONVEX</span>
            </Link>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-mono uppercase text-zinc-500" style={{ letterSpacing: "0.2em" }}>
              // Main Navigation
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-2 text-xs font-mono uppercase transition-colors",
                    pathname === item.href
                      ? "bg-zinc-900 text-white border-l-2 border-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                  )}
                  style={{ letterSpacing: "0.15em" }}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4">
            <div className="space-y-1">
              <Link
                href="/notifications"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span style={{ letterSpacing: "0.1em" }}>NOTIFICATIONS</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span style={{ letterSpacing: "0.1em" }}>SETTINGS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isOpen && isMobile && <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />}

      {isMobile ? <div className="w-0" /> : <div className="w-64" />}
    </>
  )
}

