"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Eye,
  Target,
  LineChartIcon,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend, // Added Legend
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-3 rounded-lg shadow-lg border border-gray-800">
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-sm font-medium">{label}</p>
          <span className="text-gray-400 text-xs">/200 queries</span>
        </div>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-gray-400">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold text-green-400">
                {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

const trafficData = [
  {
    date: "Sep 14",
    amazonAppearances: 245,
    amazonReferrals: 89,
    shopifyAppearances: 189,
    shopifyReferrals: 67,
    chatgptAmazon: 98,
    chatgptShopify: 76,
    geminiAmazon: 82,
    geminiShopify: 67,
    perplexityAmazon: 65,
    perplexityShopify: 50,
    // Position data (lower is better)
    chatgptAmazonPos: 3.2,
    chatgptShopifyPos: 3.8,
    geminiAmazonPos: 4.1,
    geminiShopifyPos: 4.5,
    perplexityAmazonPos: 4.8,
    perplexityShopifyPos: 5.2,
  },
  {
    date: "Sep 15",
    amazonAppearances: 268,
    amazonReferrals: 95,
    shopifyAppearances: 201,
    shopifyReferrals: 72,
    chatgptAmazon: 107,
    chatgptShopify: 81,
    geminiAmazon: 89,
    geminiShopify: 67,
    perplexityAmazon: 72,
    perplexityShopify: 53,
    chatgptAmazonPos: 3.0,
    chatgptShopifyPos: 3.6,
    geminiAmazonPos: 3.9,
    geminiShopifyPos: 4.3,
    perplexityAmazonPos: 4.6,
    perplexityShopifyPos: 5.0,
  },
  {
    date: "Sep 16",
    amazonAppearances: 289,
    amazonReferrals: 102,
    shopifyAppearances: 215,
    shopifyReferrals: 78,
    chatgptAmazon: 116,
    chatgptShopify: 86,
    geminiAmazon: 96,
    geminiShopify: 72,
    perplexityAmazon: 77,
    perplexityShopify: 57,
    chatgptAmazonPos: 2.8,
    chatgptShopifyPos: 3.4,
    geminiAmazonPos: 3.7,
    geminiShopifyPos: 4.1,
    perplexityAmazonPos: 4.4,
    perplexityShopifyPos: 4.8,
  },
  {
    date: "Sep 17",
    amazonAppearances: 312,
    amazonReferrals: 110,
    shopifyAppearances: 234,
    shopifyReferrals: 85,
    chatgptAmazon: 125,
    chatgptShopify: 94,
    geminiAmazon: 104,
    geminiShopify: 78,
    perplexityAmazon: 83,
    perplexityShopify: 62,
    chatgptAmazonPos: 2.6,
    chatgptShopifyPos: 3.2,
    geminiAmazonPos: 3.5,
    geminiShopifyPos: 3.9,
    perplexityAmazonPos: 4.2,
    perplexityShopifyPos: 4.6,
  },
  {
    date: "Sep 18",
    amazonAppearances: 298,
    amazonReferrals: 105,
    shopifyAppearances: 223,
    shopifyReferrals: 81,
    chatgptAmazon: 119,
    chatgptShopify: 89,
    geminiAmazon: 99,
    geminiShopify: 74,
    perplexityAmazon: 80,
    perplexityShopify: 60,
    chatgptAmazonPos: 2.7,
    chatgptShopifyPos: 3.3,
    geminiAmazonPos: 3.6,
    geminiShopifyPos: 4.0,
    perplexityAmazonPos: 4.3,
    perplexityShopifyPos: 4.7,
  },
  {
    date: "Sep 19",
    amazonAppearances: 325,
    amazonReferrals: 115,
    shopifyAppearances: 245,
    shopifyReferrals: 89,
    chatgptAmazon: 130,
    chatgptShopify: 98,
    geminiAmazon: 108,
    geminiShopify: 82,
    perplexityAmazon: 87,
    perplexityShopify: 65,
    chatgptAmazonPos: 2.5,
    chatgptShopifyPos: 3.1,
    geminiAmazonPos: 3.4,
    geminiShopifyPos: 3.8,
    perplexityAmazonPos: 4.1,
    perplexityShopifyPos: 4.5,
  },
  {
    date: "Sep 20",
    amazonAppearances: 342,
    amazonReferrals: 121,
    shopifyAppearances: 258,
    shopifyReferrals: 94,
    chatgptAmazon: 137,
    chatgptShopify: 103,
    geminiAmazon: 114,
    geminiShopify: 86,
    perplexityAmazon: 91,
    perplexityShopify: 69,
    chatgptAmazonPos: 2.4,
    chatgptShopifyPos: 3.0,
    geminiAmazonPos: 3.3,
    geminiShopifyPos: 3.7,
    perplexityAmazonPos: 4.0,
    perplexityShopifyPos: 4.4,
  },
]

const competitorData = [
  { rank: 1, name: "HubSpot", visibility: 65, sentiment: 86, position: 2.7, visibilityChange: 3, sentimentChange: 2 },
  {
    rank: 2,
    name: "Salesforce",
    visibility: 62,
    sentiment: 62,
    position: 2.9,
    visibilityChange: -2,
    sentimentChange: -1,
  },
  {
    rank: 3,
    name: "Your Brand",
    visibility: 47,
    sentiment: 89,
    position: 3.6,
    visibilityChange: 3,
    sentimentChange: 5,
  },
  {
    rank: 4,
    name: "Pipedrive",
    visibility: 41,
    sentiment: 76,
    position: 3.9,
    visibilityChange: -3,
    sentimentChange: 0,
  },
  { rank: 5, name: "Zero", visibility: 28, sentiment: 88, position: 2.3, visibilityChange: 4, sentimentChange: 2 },
]

const queryData = [
  {
    id: 1,
    query: "best CRM for small business",
    intent: "Comparison",
    persona: "Small Business Owner",
    engines: ["ChatGPT", "Perplexity", "Gemini"],
    rank: 3,
    score: 78,
    competitors: ["HubSpot", "Salesforce"],
    whyNotRanking: "Missing pricing comparison",
  },
  {
    id: 2,
    query: "affordable CRM software",
    intent: "Purchase",
    persona: "Startup Founder",
    engines: ["ChatGPT", "Gemini"],
    rank: 5,
    score: 65,
    competitors: ["Pipedrive", "Zoho"],
    whyNotRanking: "Weak feature descriptions",
  },
  {
    id: 3,
    query: "CRM with email integration",
    intent: "Feature Research",
    persona: "Sales Manager",
    engines: ["Perplexity", "Gemini"],
    rank: 2,
    score: 85,
    competitors: ["Salesforce"],
    whyNotRanking: "Limited integration examples",
  },
]

const platformVisibilityData = [
  { platform: "OpenAI", visibility: 48, icon: "/chatgpt-logo.svg" },
  { platform: "Google", visibility: 38, icon: "/gemini-logo.jpeg" },
  { platform: "Perplexity", visibility: 28, icon: "/perplexity-logo.png" },
]

const rankDistributionData = [
  { rank: "1st rank", percentage: 10.8, answers: 25 },
  { rank: "2nd rank", percentage: 17.3, answers: 40 },
  { rank: "3rd rank", percentage: 22.1, answers: 51 },
  { rank: "4th rank", percentage: 15.4, answers: 36 },
  { rank: "5th rank and below", percentage: 34.4, answers: 79 },
]

const topCitedDomainsData = [
  { domain: "reddit.com", answers: 145, icon: "🔴" },
  { domain: "zapier.com", answers: 129, icon: "🟠" },
  { domain: "wikipedia.org", answers: 125, icon: "W" },
  { domain: "atlassian.com", answers: 96, icon: "🔷" },
  { domain: "clickup.com", answers: 78, isYou: true, icon: "C" },
  { domain: "thedigitalprojectmanager.com", answers: 74, icon: "📊" },
]

const topCitedPagesData = [
  {
    title: "We Tried 25 Free Project Management Software: Only One Nailed It",
    url: "https://clickup.com/blog/free-project-management-software/",
    answers: 24,
  },
  {
    title: "15 Best Agile Tools for Streamlined Project Management in 2025",
    url: "https://clickup.com/blog/agile-tools/",
    answers: 7,
  },
  {
    title: "15 Best Microsoft Project Alternatives for 2025 | ClickUp",
    url: "https://clickup.com/blog/microsoft-project-alternatives/",
    answers: 5,
  },
  {
    title: "Honest Review of the 15 Best Project Management Tools that I Used",
    url: "https://clickup.com/blog/best-project-management-tools/",
    answers: 4,
  },
]

const visibilityTrendsData = [
  { date: "Jun 28", Asana: 45, Atlassian: 38, ClickUp: 36, Monday: 30, Trello: 25, Wrike: 23 },
  { date: "Jun 29", Asana: 46, Atlassian: 39, ClickUp: 37, Monday: 31, Trello: 26, Wrike: 24 },
  { date: "Jun 30", Asana: 47, Atlassian: 40, ClickUp: 38, Monday: 32, Trello: 27, Wrike: 25 },
]

const mockProducts = [
  { id: "1", name: "Wireless Bluetooth Headphones", isTop3: true },
  { id: "2", name: "Smart Fitness Tracker", isTop3: true },
  { id: "3", name: "Portable Phone Charger", isTop3: true },
  { id: "4", name: "USB-C Hub Adapter", isTop3: false },
  { id: "5", name: "Laptop Stand", isTop3: false },
  { id: "6", name: "Wireless Mouse", isTop3: false },
  { id: "7", name: "Keyboard Cover", isTop3: false },
]

export default function VisibilityPage() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState("week")
  const [engineFilter, setEngineFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState<"both" | "amazon" | "shopify">("both")
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["1", "2", "3"])
  const [competitorLensOpen, setCompetitorLensOpen] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [productPopoverOpen, setProductPopoverOpen] = useState(false)

  const [llmChartType, setLlmChartType] = useState<"line" | "bar">("line")
  const [llmMetric, setLlmMetric] = useState<"visibility" | "position">("visibility") // Removed "sentiment" option
  const [timeUntilNextRun, setTimeUntilNextRun] = useState({ days: 2, hours: 14, minutes: 32 }) // Added initial countdown values

  const [expandedQueries, setExpandedQueries] = useState<number[]>([])
  const [citationPage, setCitationPage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilNextRun((prev) => {
        let { days, hours, minutes } = prev

        if (minutes > 0) {
          minutes--
        } else if (hours > 0) {
          hours--
          minutes = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
        }

        return { days, hours, minutes }
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleQueryExpansion = (queryId: number) => {
    setExpandedQueries((prev) => (prev.includes(queryId) ? prev.filter((id) => id !== queryId) : [...prev, queryId]))
  }

  const getFilteredMetrics = () => {
    let baseMetrics = {
      visibility: 4.3,
      visibilityChange: -3.1,
      promptsRun: 1247,
      totalQueries: 1500,
      promptsRunChange: 156,
      competitorShare: 26,
      shareChange: -1.5,
    }

    if (platformFilter === "amazon") {
      baseMetrics = {
        visibility: 4.7,
        visibilityChange: -3.4,
        promptsRun: 723,
        totalQueries: 900,
        promptsRunChange: 89,
        competitorShare: 28,
        shareChange: -2,
      }
    } else if (platformFilter === "shopify") {
      baseMetrics = {
        visibility: 3.9,
        visibilityChange: -2.8,
        promptsRun: 524,
        totalQueries: 600,
        promptsRunChange: 67,
        competitorShare: 24,
        shareChange: -1,
      }
    }

    const top3ProductIds = mockProducts.filter((p) => p.isTop3).map((p) => p.id)
    const isTop3Selected = selectedProducts.length === 3 && selectedProducts.every((id) => top3ProductIds.includes(id))

    if (isTop3Selected) {
      return {
        ...baseMetrics,
        visibility: baseMetrics.visibility + 0.5,
        promptsRun: Math.round(baseMetrics.promptsRun * 0.7),
        totalQueries: Math.round(baseMetrics.totalQueries * 0.7),
        competitorShare: baseMetrics.competitorShare - 3,
      }
    } else if (selectedProducts.length > 0) {
      return {
        ...baseMetrics,
        visibility: baseMetrics.visibility - 0.3,
        promptsRun: Math.round(baseMetrics.promptsRun * 1.2),
        totalQueries: Math.round(baseMetrics.totalQueries * 1.2),
        competitorShare: baseMetrics.competitorShare + 2,
      }
    }

    return baseMetrics
  }

  const metrics = getFilteredMetrics()

  // Removed getDataKeys function as it's no longer needed

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Visibility</h1>

              <Badge variant="secondary" className="text-xs">
                Semaine
              </Badge>

              <Popover open={productPopoverOpen} onOpenChange={setProductPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 bg-transparent">
                    {selectedProducts.length === 0
                      ? "Select Products"
                      : selectedProducts.length === mockProducts.length
                        ? "All Products"
                        : `${selectedProducts.length} product${selectedProducts.length > 1 ? "s" : ""}`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-3" align="start">
                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-2">Select Products</div>
                    {mockProducts.map((product) => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                        <label
                          htmlFor={`product-${product.id}`}
                          className="text-sm flex-1 cursor-pointer leading-tight"
                        >
                          {product.name}
                          {product.isTop3 && (
                            <Badge variant="secondary" className="ml-1.5 text-[10px] px-1 py-0">
                              Top 3
                            </Badge>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last week</SelectItem>
                  <SelectItem value="2weeks">Last 2 weeks</SelectItem>
                  <SelectItem value="month">Last month</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                </SelectContent>
              </Select>

              <TooltipProvider>
                <ToggleGroup
                  type="single"
                  value={engineFilter}
                  onValueChange={(value) => value && setEngineFilter(value)}
                  className="border rounded-md"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="all" aria-label="All Engines" className="h-9 px-3">
                        <Globe className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>All Engines</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="chatgpt" aria-label="ChatGPT" className="h-9 px-3">
                        <img
                          src="/chatgpt-logo.svg"
                          alt="ChatGPT"
                          className="h-4 w-4 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/chatgpt-logo-inspired.png"
                          }}
                        />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ChatGPT</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="gemini" aria-label="Gemini" className="h-9 px-3">
                        <img
                          src="/gemini-logo.jpeg"
                          alt="Gemini"
                          className="h-4 w-4 object-contain rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/google-gemini-logo.png"
                          }}
                        />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gemini</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="perplexity" aria-label="Perplexity" className="h-9 px-3">
                        <img
                          src="/perplexity-logo.png"
                          alt="Perplexity"
                          className="h-4 w-4 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/perplexity-ai-logo.png"
                          }}
                        />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Perplexity</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>

                <ToggleGroup
                  type="single"
                  value={platformFilter}
                  onValueChange={(value: "both" | "amazon" | "shopify") => value && setPlatformFilter(value)}
                  className="border rounded-md"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="both" aria-label="Both Platforms" className="h-9 px-3">
                        <Layers className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Both Platforms</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="amazon" aria-label="Amazon" className="h-9 px-3">
                        <img src="/amazon-a-logo.png" alt="Amazon" className="h-4 w-4 object-contain" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Amazon</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="shopify" aria-label="Shopify" className="h-9 px-3">
                        <img src="/shopify-bag-logo.jpg" alt="Shopify" className="h-4 w-4 object-contain" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Shopify</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="border-b bg-muted/30 px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Overview</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span>Visibility dropped {Math.abs(metrics.visibilityChange)}% this period</span>
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Visibility:</span>
                <span className="font-semibold">{metrics.visibility}%</span>
                {metrics.visibilityChange < 0 ? (
                  <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                )}
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Queries:</span>
                <span className="font-semibold">
                  {metrics.promptsRun.toLocaleString()}/{metrics.totalQueries.toLocaleString()}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Share of Voice:</span>
                <span className="font-semibold">{metrics.competitorShare}%</span>
                {metrics.shareChange < 0 ? (
                  <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex gap-4">
            {/* Countdown card - translucent light teal */}
            <Card className="bg-teal-50/50 border-teal-200/50 flex-1">
              <CardContent className="px-4 py-2">
                <p className="text-xs text-teal-900/70 mb-0.5">Next content test in</p>
                <div className="flex items-center gap-2 text-base font-semibold text-teal-900">
                  <span>{timeUntilNextRun.days}d</span>
                  <span className="text-teal-900/50">:</span>
                  <span>{timeUntilNextRun.hours}h</span>
                  <span className="text-teal-900/50">:</span>
                  <span>{timeUntilNextRun.minutes}m</span>
                </div>
              </CardContent>
            </Card>

            {/* Visibility change card - translucent light orange */}
            <Card className="bg-orange-50/50 border-orange-200/50 flex-1">
              <CardContent className="px-4 py-2">
                <p className="text-xs text-orange-900/70 mb-0.5">Visibility trend</p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-orange-900">
                    Dropped {Math.abs(metrics.visibilityChange)}% this period
                  </p>
                  <TrendingDown className="h-4 w-4 text-orange-900" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* LLM Traffic & Engagement - takes 2/3 width */}
            <Card className="col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-base">LLM Traffic & Engagement</CardTitle>
                  <div className="flex items-center gap-2">
                    <ToggleGroup
                      type="single"
                      value={llmMetric}
                      onValueChange={(value: "visibility" | "position") => value && setLlmMetric(value)}
                      className="border rounded-md"
                    >
                      <ToggleGroupItem value="visibility" aria-label="Visibility" className="h-9 px-3 gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Visibility</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="position" aria-label="Position" className="h-9 px-3 gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm">Position</span>
                      </ToggleGroupItem>
                    </ToggleGroup>

                    <div className="flex items-center gap-1 border rounded-md">
                      <Button
                        variant={llmChartType === "line" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-9 px-3"
                        onClick={() => setLlmChartType("line")}
                      >
                        <LineChartIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={llmChartType === "bar" ? "secondary" : "ghost"}
                        size="sm"
                        className="h-9 px-3"
                        onClick={() => setLlmChartType("bar")}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {llmChartType === "line" ? (
                      <LineChart data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          label={{
                            value: llmMetric === "position" ? "Avg Position" : "Visibility",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          reversed={llmMetric === "position"}
                        />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        {(platformFilter === "both" || platformFilter === "amazon") && (
                          <>
                            {(engineFilter === "all" || engineFilter === "chatgpt") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "chatgptAmazonPos" : "chatgptAmazon"}
                                stroke="#10B981"
                                strokeWidth={2}
                                name="Amazon - ChatGPT"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "gemini") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "geminiAmazonPos" : "geminiAmazon"}
                                stroke="#3B82F6"
                                strokeWidth={2}
                                name="Amazon - Gemini"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "perplexity") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "perplexityAmazonPos" : "perplexityAmazon"}
                                stroke="#8B5CF6"
                                strokeWidth={2}
                                name="Amazon - Perplexity"
                              />
                            )}
                          </>
                        )}
                        {(platformFilter === "both" || platformFilter === "shopify") && (
                          <>
                            {(engineFilter === "all" || engineFilter === "chatgpt") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "chatgptShopifyPos" : "chatgptShopify"}
                                stroke="#F59E0B"
                                strokeWidth={2}
                                name="Shopify - ChatGPT"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "gemini") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "geminiShopifyPos" : "geminiShopify"}
                                stroke="#EF4444"
                                strokeWidth={2}
                                name="Shopify - Gemini"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "perplexity") && (
                              <Line
                                type="monotone"
                                dataKey={llmMetric === "position" ? "perplexityShopifyPos" : "perplexityShopify"}
                                stroke="#EC4899"
                                strokeWidth={2}
                                name="Shopify - Perplexity"
                              />
                            )}
                          </>
                        )}
                      </LineChart>
                    ) : (
                      <BarChart data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          label={{
                            value: llmMetric === "position" ? "Avg Position" : "Visibility",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        {(platformFilter === "both" || platformFilter === "amazon") && (
                          <>
                            {(engineFilter === "all" || engineFilter === "chatgpt") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "chatgptAmazonPos" : "chatgptAmazon"}
                                fill="#10B981"
                                name="Amazon - ChatGPT"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "gemini") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "geminiAmazonPos" : "geminiAmazon"}
                                fill="#3B82F6"
                                name="Amazon - Gemini"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "perplexity") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "perplexityAmazonPos" : "perplexityAmazon"}
                                fill="#8B5CF6"
                                name="Amazon - Perplexity"
                              />
                            )}
                          </>
                        )}
                        {(platformFilter === "both" || platformFilter === "shopify") && (
                          <>
                            {(engineFilter === "all" || engineFilter === "chatgpt") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "chatgptShopifyPos" : "chatgptShopify"}
                                fill="#F59E0B"
                                name="Shopify - ChatGPT"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "gemini") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "geminiShopifyPos" : "geminiShopify"}
                                fill="#EF4444"
                                name="Shopify - Gemini"
                              />
                            )}
                            {(engineFilter === "all" || engineFilter === "perplexity") && (
                              <Bar
                                dataKey={llmMetric === "position" ? "perplexityShopifyPos" : "perplexityShopify"}
                                fill="#EC4899"
                                name="Shopify - Perplexity"
                              />
                            )}
                          </>
                        )}
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Rank Distribution - takes 1/3 width */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Rank Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rankDistributionData.map((rank, index) => (
                    <div key={rank.rank} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{rank.rank}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{rank.answers}x</span>
                          <span className="text-xs text-muted-foreground">({rank.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                                ? "bg-orange-500"
                                : index === 2
                                  ? "bg-yellow-500"
                                  : index === 3
                                    ? "bg-purple-500"
                                    : "bg-cyan-500"
                          }`}
                          style={{ width: `${rank.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="comparison">Competitor Comparison</TabsTrigger>
                  <TabsTrigger value="trends">Visibility Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="mt-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="text-sm font-medium text-muted-foreground w-12">#</TableHead>
                        <TableHead className="text-sm font-medium text-muted-foreground">Brand</TableHead>
                        <TableHead className="text-sm font-medium text-muted-foreground text-right">
                          Visibility
                        </TableHead>
                        <TableHead className="text-sm font-medium text-muted-foreground text-right">
                          Avg Position
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {competitorData.map((comp) => (
                        <TableRow
                          key={comp.rank}
                          className={`border-b cursor-pointer hover:bg-muted/50 ${comp.name === "Your Brand" ? "bg-blue-50/50" : ""}`}
                          onClick={() => {
                            setSelectedCompetitor(comp.name)
                            setCompetitorLensOpen(true)
                          }}
                        >
                          <TableCell className="text-sm text-muted-foreground">{comp.rank}</TableCell>
                          <TableCell className="text-sm font-medium">
                            {comp.name}
                            {comp.name === "Your Brand" && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                You
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-semibold">{comp.visibility}%</span>
                              <span
                                className={`text-xs flex items-center gap-1 ${comp.visibilityChange > 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {comp.visibilityChange > 0 ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                {Math.abs(comp.visibilityChange)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-sm font-semibold">{comp.position}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="trends" className="mt-0">
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visibilityTrendsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          label={{
                            value: "Citations",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <RechartsTooltip content={<CustomChartTooltip />} />
                        <Line type="monotone" dataKey="Asana" stroke="#4F46E5" strokeWidth={2} name="Asana" />
                        <Line type="monotone" dataKey="Atlassian" stroke="#F97316" strokeWidth={2} name="Atlassian" />
                        <Line type="monotone" dataKey="ClickUp" stroke="#EAB308" strokeWidth={2} name="ClickUp You" />
                        <Line type="monotone" dataKey="Monday" stroke="#10B981" strokeWidth={2} name="Monday.com" />
                        <Line type="monotone" dataKey="Trello" stroke="#8B5CF6" strokeWidth={2} name="Trello" />
                        <Line type="monotone" dataKey="Wrike" stroke="#06B6D4" strokeWidth={2} name="Wrike" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Shows the number of times each competitor was cited in AI answers over time
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Platform wise brand visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformVisibilityData.map((platform) => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={platform.icon || "/placeholder.svg"}
                          alt={platform.platform}
                          className="h-5 w-5 rounded"
                        />
                        <span className="text-sm font-medium">{platform.platform}</span>
                      </div>
                      <span className="text-sm font-semibold">{platform.visibility}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${platform.visibility}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6 relative">
            {/* Left arrow navigation */}
            <button
              onClick={() => setCitationPage((prev) => Math.max(0, prev - 1))}
              disabled={citationPage === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Top cited domains */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Top cited domains</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      See which domains dominate AI citations and their answers
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-sm font-medium text-muted-foreground">Citing domain</TableHead>
                      <TableHead className="text-sm font-medium text-muted-foreground text-right">Answers</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCitedDomainsData.map((domain) => (
                      <TableRow key={domain.domain} className="border-b">
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${domain.domain}&sz=32`}
                              alt={domain.domain}
                              className="h-4 w-4"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                              }}
                            />
                            <span>{domain.domain}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-semibold text-blue-600">{domain.answers}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Your top cited pages */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Your top cited pages</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      See which of your website pages are most cited in AI answers
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="text-sm font-medium text-muted-foreground">Your Page URL</TableHead>
                      <TableHead className="text-sm font-medium text-muted-foreground text-right">Answers</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCitedPagesData.map((page, index) => (
                      <TableRow key={index} className="border-b">
                        <TableCell className="text-sm">
                          <div>
                            <div className="font-medium mb-1">{page.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{page.url}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-semibold text-blue-600">{page.answers}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Right arrow navigation */}
            <button
              onClick={() => setCitationPage((prev) => prev + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Competitor Lens Sheet */}
      <Sheet open={competitorLensOpen} onOpenChange={setCompetitorLensOpen}>
        <SheetContent className="w-[600px] sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Competitor Lens: {selectedCompetitor}</SheetTitle>
            <SheetDescription>Analyze why this competitor is ranking higher</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Top Answer Excerpt</h4>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <p>
                  "{selectedCompetitor} offers <mark className="bg-yellow-200">comprehensive CRM features</mark> with{" "}
                  <mark className="bg-yellow-200">competitive pricing</mark> starting at $45/month. Their platform
                  includes <mark className="bg-yellow-200">email integration, sales automation</mark>, and{" "}
                  <mark className="bg-yellow-200">24/7 customer support</mark>."
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Winning Claims</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    1
                  </Badge>
                  <span>Specific pricing information ($45/month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    2
                  </Badge>
                  <span>Clear feature list (email integration, sales automation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    3
                  </Badge>
                  <span>Support availability (24/7 customer support)</span>
                </li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
