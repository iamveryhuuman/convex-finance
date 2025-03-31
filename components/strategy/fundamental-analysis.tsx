"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts"

type FundamentalAnalysisProps = {
  symbol: string
}

// Mock financial data
const financialData = {
  revenue: [
    { year: "2019", value: 260.2 },
    { year: "2020", value: 274.5 },
    { year: "2021", value: 365.8 },
    { year: "2022", value: 394.3 },
    { year: "2023", value: 383.3 },
  ],
  eps: [
    { year: "2019", value: 2.97 },
    { year: "2020", value: 3.28 },
    { year: "2021", value: 5.61 },
    { year: "2022", value: 6.11 },
    { year: "2023", value: 6.14 },
  ],
  margins: [
    { name: "Gross Margin", value: 43.5 },
    { name: "Operating Margin", value: 30.3 },
    { name: "Net Margin", value: 25.0 },
    { name: "FCF Margin", value: 24.2 },
  ],
  ratios: [
    { name: "P/E", value: 29.4 },
    { name: "P/S", value: 7.3 },
    { name: "P/B", value: 46.2 },
    { name: "EV/EBITDA", value: 21.5 },
  ],
}

export default function FundamentalAnalysis({ symbol }: FundamentalAnalysisProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="financials">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="ratios">Ratios</TabsTrigger>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
        </TabsList>

        <TabsContent value="financials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-800">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Revenue (Billions $)</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData.revenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="value" fill="#3b82f6" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Earnings Per Share ($)</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData.eps}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#14b8a6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="EPS"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-800">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Profit Margins (%)</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData.margins} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          borderColor: "#334155",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="value" fill="#f59e0b" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-xl font-medium">$2.85T</div>
                </div>
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">Dividend Yield</div>
                  <div className="text-xl font-medium">0.51%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">Debt to Equity</div>
                  <div className="text-xl font-medium">1.52</div>
                </div>
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">ROE</div>
                  <div className="text-xl font-medium">160.09%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">Current Ratio</div>
                  <div className="text-xl font-medium">0.94</div>
                </div>
                <div className="p-4 rounded-md bg-slate-800">
                  <div className="text-sm text-muted-foreground">ROIC</div>
                  <div className="text-xl font-medium">30.83%</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ratios">
          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Valuation Ratios</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialData.ratios}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            borderColor: "#334155",
                            color: "#fff",
                          }}
                        />
                        <Bar dataKey="value" fill="#14b8a6" name="Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Peer Comparison</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>P/E Ratio vs Sector</span>
                      <span className="text-amber-500">+15.2%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>P/S Ratio vs Sector</span>
                      <span className="text-red-500">+42.7%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>EV/EBITDA vs Sector</span>
                      <span className="text-amber-500">+12.3%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Dividend Yield vs Sector</span>
                      <span className="text-red-500">-65.4%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estimates">
          <Card className="border-slate-800">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Analyst Estimates</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">EPS Estimate (Next Quarter)</span>
                        <span className="text-sm text-green-500">+5.2% YoY</span>
                      </div>
                      <div className="text-xl font-medium">$1.52</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">Range:</div>
                        <div className="text-xs">$1.45 - $1.62</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Revenue Estimate (Next Quarter)</span>
                        <span className="text-sm text-green-500">+3.8% YoY</span>
                      </div>
                      <div className="text-xl font-medium">$94.5B</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">Range:</div>
                        <div className="text-xs">$92.1B - $97.2B</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Annual EPS Estimate</span>
                        <span className="text-sm text-green-500">+8.1% YoY</span>
                      </div>
                      <div className="text-xl font-medium">$6.58</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">Range:</div>
                        <div className="text-xs">$6.32 - $6.85</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Analyst Recommendations</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.2</div>
                      <div className="text-xs text-muted-foreground">Avg. Rating</div>
                    </div>
                    <div className="h-20 w-20 rounded-full border-8 border-green-500 flex items-center justify-center">
                      <span className="text-xl font-bold">Buy</span>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">32</div>
                      <div className="text-xs text-muted-foreground">Analysts</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">Strong Buy</div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="w-8 text-right text-sm">21</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">Buy</div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <div className="w-8 text-right text-sm">8</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">Hold</div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "9%" }}></div>
                      </div>
                      <div className="w-8 text-right text-sm">3</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">Sell</div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                      <div className="w-8 text-right text-sm">0</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">Strong Sell</div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                      <div className="w-8 text-right text-sm">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

