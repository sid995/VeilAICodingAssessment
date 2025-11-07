"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  Info,
  CheckSquare,
  Users,
  PenLine,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Package,
  Eye,
  TrendingDown,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DashboardStats {
  totalProducts: number
  queried: number
  scored: number
  avgScore: number
  inCatalog: number
  withQueries: number
  analyzed: number
}

const visibilityTrendData = [
  { date: "Sep 14", score: 6.2 },
  { date: "Sep 15", score: 5.8 },
  { date: "Sep 16", score: 5.4 },
  { date: "Sep 17", score: 5.9 },
  { date: "Sep 18", score: 4.8 },
  { date: "Sep 19", score: 3.5 },
  { date: "Sep 20", score: 2.7 },
]

const platformVisibilityData = [
  { platform: "ChatGPT", score: 5.2, icon: "chatgpt" },
  { platform: "Perplexity", score: 4.8, icon: "perplexity" },
  { platform: "Google Gemini", score: 4.1, icon: "gemini" },
]

export default function DashboardPage() {
  const { t, language } = useLanguage()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [period, setPeriod] = useState("current")
  const [compareCompetitors, setCompareCompetitors] = useState(false)
  const [chartView, setChartView] = useState<"trend" | "platform">("trend")
  const [selectedProducts, setSelectedProducts] = useState("all")
  const router = useRouter()

  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 7,
    queried: 1,
    scored: 0,
    avgScore: 0,
    inCatalog: 7,
    withQueries: 14,
    analyzed: 0,
  })

  useEffect(() => {
    // This ensures the component updates when language changes
  }, [language])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {t("refresh")}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Brand Overview</h2>
          <span className="text-sm text-muted-foreground">Weekly Performance</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Visibility</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7%</div>
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3" />
                -3.4% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Share of Voice</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.3%</div>
              <p className="text-xs text-muted-foreground mt-1">Across all platforms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {chartView === "trend" ? "Visibility Trend" : "Platform Visibility"}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{t("scoreExplanationTitle")}</h4>
                    <p className="text-sm text-muted-foreground">{t("scoreExplanationText")}</p>
                    <p className="text-sm text-muted-foreground">{t("scoreExplanationDetails")}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant={chartView === "trend" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setChartView("trend")}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button
                variant={chartView === "platform" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setChartView("platform")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartView === "trend" ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibilityTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, 7]}
                        ticks={[0, 1.7, 3.4, 5.1, 6.8]}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Visibility Score"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformVisibilityData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="platform" tick={false} tickLine={false} axisLine={false} />
                      <YAxis
                        domain={[0, 7]}
                        ticks={[0, 1.7, 3.4, 5.1, 6.8]}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Visibility Score"]}
                      />
                      <Bar dataKey="score" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around px-12">
                    <div className="flex flex-col items-center gap-1">
                      <img src="/chatgpt-logo.svg" alt="ChatGPT" className="w-5 h-5" />
                      <span className="text-xs text-muted-foreground">ChatGPT</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <img src="/perplexity-logo.png" alt="Perplexity" className="w-5 h-5" />
                      <span className="text-xs text-muted-foreground">Perplexity</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <img src="/gemini-logo.jpeg" alt="Google Gemini" className="w-5 h-5" />
                      <span className="text-xs text-muted-foreground">Google Gemini</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <RadioGroup value={period} onValueChange={setPeriod} className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="text-sm font-normal cursor-pointer">
                      Current Period
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="previous" id="previous" />
                    <Label htmlFor="previous" className="text-sm font-normal cursor-pointer">
                      Previous Period
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="compare-competitors"
                    checked={compareCompetitors}
                    onCheckedChange={setCompareCompetitors}
                  />
                  <Label htmlFor="compare-competitors" className="text-sm font-normal cursor-pointer">
                    Compare competitors
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 pt-4 border-t-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Product Insights</h2>
          <Select value={selectedProducts} onValueChange={setSelectedProducts}>
            <SelectTrigger className="w-[200px]">
              <Package className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products (7)</SelectItem>
              <SelectItem value="selected">Selected (3)</SelectItem>
              <SelectItem value="top">Top Performers (5)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Tracked</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.inCatalog} in catalog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Product Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.8</div>
              <p className="text-xs text-muted-foreground mt-1">Out of 10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products with Queries</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.withQueries}</div>
              <p className="text-xs text-muted-foreground mt-1">Active this week</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("improveVisibility")}</h2>
        <Card className="rounded-2xl border-2">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                variant="outline"
                className="h-auto flex items-center justify-between p-6 text-left bg-transparent hover:bg-accent rounded-xl"
                onClick={() => router.push("/action-center")}
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-base">{t("actionCenter")}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Button
                variant="outline"
                className="h-auto flex items-center justify-between p-6 text-left bg-transparent hover:bg-accent rounded-xl"
                onClick={() => router.push("/personas")}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-base">{t("personas")}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Button
                variant="outline"
                className="h-auto flex items-center justify-between p-6 text-left bg-transparent hover:bg-accent rounded-xl"
                onClick={() => router.push("/content-creation")}
              >
                <div className="flex items-center gap-3">
                  <PenLine className="h-5 w-5 text-teal-600" />
                  <span className="font-semibold text-base">{t("contentCreation")}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
