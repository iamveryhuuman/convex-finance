"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SelectContent, SelectItem } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PlusCircle, MinusCircle } from "lucide-react"

type OptionsChainProps = {
  symbol: string
}

// Mock data for options chain
const generateOptionsData = (strike: number, expiryIndex: number) => {
  const baseIV = 0.3 + (Math.random() * 0.2 - 0.1)
  const daysToExpiry = [7, 14, 30, 60, 90][expiryIndex] || 30
  const stockPrice = 180
  const distance = Math.abs(strike - stockPrice)
  const isCall = strike > stockPrice

  // Simplified option pricing logic
  const callPrice = Math.max(0.05, stockPrice * baseIV * Math.sqrt(daysToExpiry / 365) - distance * 0.8)
  const putPrice = Math.max(0.05, stockPrice * baseIV * Math.sqrt(daysToExpiry / 365) - distance * 0.7)

  return {
    strike,
    call: {
      bid: (callPrice * 0.95).toFixed(2),
      ask: (callPrice * 1.05).toFixed(2),
      iv: (baseIV * 100).toFixed(1),
      delta: isCall
        ? (0.5 - (distance / stockPrice) * 0.5).toFixed(2)
        : (0.5 - (distance / stockPrice) * 0.5).toFixed(2),
      volume: Math.floor(Math.random() * 1000),
    },
    put: {
      bid: (putPrice * 0.95).toFixed(2),
      ask: (putPrice * 1.05).toFixed(2),
      iv: ((baseIV + 0.02) * 100).toFixed(1),
      delta: isCall
        ? (-0.5 + (distance / stockPrice) * 0.5).toFixed(2)
        : (-0.5 + (distance / stockPrice) * 0.5).toFixed(2),
      volume: Math.floor(Math.random() * 1000),
    },
  }
}

export default function OptionsChain({ symbol }: OptionsChainProps) {
  const [expiry, setExpiry] = useState("30d")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // Generate strikes around current price
  const basePrice = 180 // Mock current price for AAPL
  const strikes = Array.from({ length: 11 }, (_, i) => basePrice - 20 + i * 4)

  const optionsData = strikes.map((strike) =>
    generateOptionsData(strike, ["7d", "14d", "30d", "60d", "90d"].indexOf(expiry)),
  )

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <Label className="text-xs text-muted-foreground" style={{ letterSpacing: "0.1em" }}>
              EXPIRATION
            </Label>
            <Select defaultValue={expiry} onValueChange={setExpiry}>
              <SelectTrigger className="w-[120px] bg-background border-zinc-700">
                <SelectValue placeholder="Expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 DAYS</SelectItem>
                <SelectItem value="14d">14 DAYS</SelectItem>
                <SelectItem value="30d">30 DAYS</SelectItem>
                <SelectItem value="60d">60 DAYS</SelectItem>
                <SelectItem value="90d">90 DAYS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground" style={{ letterSpacing: "0.1em" }}>
              STOCK PRICE
            </Label>
            <div className="font-medium">${basePrice.toFixed(2)}</div>
          </div>
        </div>

        <Badge variant="outline" className="border-white text-white" style={{ letterSpacing: "0.1em" }}>
          {selectedOptions.length} OPTIONS SELECTED
        </Badge>
      </div>

      <div className="border border-zinc-800 rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead
                className="text-center bg-zinc-900 text-xs font-mono"
                style={{ letterSpacing: "0.1em" }}
                colSpan={5}
              >
                CALLS
              </TableHead>
              <TableHead className="text-center text-xs font-mono" style={{ letterSpacing: "0.1em" }}>
                STRIKE
              </TableHead>
              <TableHead
                className="text-center bg-zinc-900 text-xs font-mono"
                style={{ letterSpacing: "0.1em" }}
                colSpan={5}
              >
                PUTS
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">BID</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">ASK</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">IV%</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">DELTA</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">VOL</TableHead>
              <TableHead className="text-center font-bold text-xs font-mono">STRIKE</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">BID</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">ASK</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">IV%</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">DELTA</TableHead>
              <TableHead className="bg-zinc-900 text-xs font-mono">VOL</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-mono text-sm">
            {optionsData.map((row, index) => (
              <TableRow key={index} className={row.strike === basePrice ? "bg-zinc-900/50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedOptions.includes(`call-${row.strike}`)}
                    onCheckedChange={() => toggleOption(`call-${row.strike}`)}
                  />
                </TableCell>
                <TableCell>{row.call.bid}</TableCell>
                <TableCell>{row.call.ask}</TableCell>
                <TableCell>{row.call.iv}%</TableCell>
                <TableCell>{row.call.delta}</TableCell>
                <TableCell>{row.call.volume}</TableCell>
                <TableCell className="text-center font-bold">{row.strike}</TableCell>
                <TableCell>{row.put.bid}</TableCell>
                <TableCell>{row.put.ask}</TableCell>
                <TableCell>{row.put.iv}%</TableCell>
                <TableCell>{row.put.delta}</TableCell>
                <TableCell>{row.put.volume}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedOptions.includes(`put-${row.strike}`)}
                    onCheckedChange={() => toggleOption(`put-${row.strike}`)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" className="border-zinc-700" style={{ letterSpacing: "0.1em" }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          ADD TO STRATEGY
        </Button>
        <Button variant="outline" className="border-zinc-700" style={{ letterSpacing: "0.1em" }}>
          <MinusCircle className="mr-2 h-4 w-4" />
          CLEAR SELECTION
        </Button>
      </div>
    </div>
  )
}

