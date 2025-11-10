"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ProductVersion {
  date: string
  geoScore: number
  visibilityChange: number
  snapshot: {
    title: string
    description: string
    bulletPoints: string[]
    images: number
  }
}

interface Product {
  id: string
  asin: string
  title: string
  image: string
  geoScore: number
  lastRun: string
  status: "tracked" | "untracked" | "pending" | "error"
  tracked: boolean
  visibilityChange: number
  visibilityTrend: number[]
  engines: string[]
  category: string
  brand: string
  recommendationsCount: number
  versions: ProductVersion[]
}

const mockProducts: Product[] = [
  {
    id: "1",
    asin: "B0FD16J243",
    title: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 62,
    lastRun: "10/17/2025",
    status: "tracked",
    tracked: true,
    visibilityChange: 3.2,
    visibilityTrend: [45, 48, 52, 55, 58, 60, 62],
    engines: ["ChatGPT", "Perplexity", "Gemini"],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 8,
    versions: [
      {
        date: "10/17/2025",
        geoScore: 62,
        visibilityChange: 3.2,
        snapshot: {
          title: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
          description: "Current version with updated ergonomic features",
          bulletPoints: ["Ergonomic design", "No-roll feature", "Adjustable height"],
          images: 7,
        },
      },
      {
        date: "10/10/2025",
        geoScore: 60,
        visibilityChange: 2.1,
        snapshot: {
          title: "Gaiam Balance Ball Chair - Office Chair",
          description: "Previous version",
          bulletPoints: ["Ergonomic design", "Adjustable height"],
          images: 5,
        },
      },
      {
        date: "10/03/2025",
        geoScore: 58,
        visibilityChange: 1.5,
        snapshot: {
          title: "Gaiam Balance Ball Chair",
          description: "Initial version",
          bulletPoints: ["Ergonomic design"],
          images: 3,
        },
      },
    ],
  },
  {
    id: "2",
    asin: "B006FFR37W",
    title: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 66,
    lastRun: "10/17/2025",
    status: "tracked",
    tracked: true,
    visibilityChange: -1.5,
    visibilityTrend: [70, 68, 67, 66, 66, 66, 66],
    engines: ["ChatGPT", "Perplexity"],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 5,
    versions: [
      {
        date: "10/17/2025",
        geoScore: 66,
        visibilityChange: -1.5,
        snapshot: {
          title: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
          description: "Current version",
          bulletPoints: ["Classic design", "Stability features"],
          images: 6,
        },
      },
    ],
  },
  {
    id: "3",
    asin: "B07G3SZXF2",
    title: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 64,
    lastRun: "10/17/2025",
    status: "tracked",
    tracked: true,
    visibilityChange: 0.8,
    visibilityTrend: [63, 63, 64, 64, 64, 64, 64],
    engines: ["ChatGPT", "Gemini", "Copilot"],
    category: "Fitness",
    brand: "Gaiam",
    recommendationsCount: 12,
    versions: [
      {
        date: "10/17/2025",
        geoScore: 64,
        visibilityChange: 0.8,
        snapshot: {
          title: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
          description: "Current version",
          bulletPoints: ["Core training", "Wobble cushion"],
          images: 5,
        },
      },
    ],
  },
  {
    id: "4",
    asin: "B0FD16J244",
    title: "Gaiam Classic Balance Ball Chair - Purple",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 68,
    lastRun: "10/17/2025",
    status: "untracked",
    tracked: false,
    visibilityChange: 0,
    visibilityTrend: [68, 68, 68, 68, 68, 68, 68],
    engines: [],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 0,
    versions: [],
  },
  {
    id: "5",
    asin: "B0FD16J245",
    title: "Gaiam Balance Ball Chair - Black",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 61,
    lastRun: "10/17/2025",
    status: "pending",
    tracked: true,
    visibilityChange: 0,
    visibilityTrend: [61, 61, 61, 61, 61, 61, 61],
    engines: [],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 0,
    versions: [],
  },
  {
    id: "6",
    asin: "B0FD16J246",
    title: "Gaiam Balance Ball Chair - Gray",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 59,
    lastRun: "10/17/2025",
    status: "untracked",
    tracked: false,
    visibilityChange: 0,
    visibilityTrend: [59, 59, 59, 59, 59, 59, 59],
    engines: [],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 0,
    versions: [],
  },
  {
    id: "7",
    asin: "B0FD16J247",
    title: "Gaiam Balance Ball Chair - Blue",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    geoScore: 63,
    lastRun: "10/17/2025",
    status: "tracked",
    tracked: true,
    visibilityChange: 2.1,
    visibilityTrend: [58, 59, 60, 61, 62, 62, 63],
    engines: ["ChatGPT", "Perplexity", "Gemini", "Copilot"],
    category: "Office Furniture",
    brand: "Gaiam",
    recommendationsCount: 6,
    versions: [
      {
        date: "10/17/2025",
        geoScore: 63,
        visibilityChange: 2.1,
        snapshot: {
          title: "Gaiam Balance Ball Chair - Blue",
          description: "Current version",
          bulletPoints: ["Blue color variant"],
          images: 6,
        },
      },
    ],
  },
]

const getDefaultVersion = (product: Product): ProductVersion => ({
  date: product.lastRun,
  geoScore: product.geoScore,
  visibilityChange: product.visibilityChange,
  snapshot: {
    title: product.title,
    description: `${product.brand} ${product.category} product`,
    bulletPoints: ["Product information not yet available"],
    images: 1,
  },
})

const competitorData = [
  {
    rank: 1,
    brand: "Vivora",
    domain: "vivora.com",
    visibility: 72,
    visibilityTrend: 5,
    sentiment: 88,
    sentimentTrend: 3,
    avgPosition: 2.1,
  },
  {
    rank: 2,
    brand: "Trideer",
    domain: "trideer.com",
    visibility: 68,
    visibilityTrend: -2,
    sentiment: 85,
    sentimentTrend: 1,
    avgPosition: 2.4,
  },
  {
    rank: 3,
    brand: "Your Brand",
    domain: "gaiam.com",
    isYou: true,
    visibility: 62,
    visibilityTrend: 3,
    sentiment: 89,
    sentimentTrend: 5,
    avgPosition: 3.2,
  },
  {
    rank: 4,
    brand: "URBNFit",
    domain: "urbnfit.com",
    visibility: 58,
    visibilityTrend: -3,
    sentiment: 76,
    sentimentTrend: 0,
    avgPosition: 3.8,
  },
  {
    rank: 5,
    brand: "Live Infinitely",
    domain: "liveinfinitely.com",
    visibility: 45,
    visibilityTrend: 4,
    sentiment: 82,
    sentimentTrend: 2,
    avgPosition: 4.5,
  },
]

const visibilityTrendsData = [
  {
    date: "Jun 28",
    Vivora: 70,
    Trideer: 69,
    "Your Brand": 60,
    URBNFit: 60,
    "Live Infinitely": 42,
  },
  {
    date: "Jun 29",
    Vivora: 71,
    Trideer: 68,
    "Your Brand": 61,
    URBNFit: 59,
    "Live Infinitely": 44,
  },
  {
    date: "Jun 30",
    Vivora: 72,
    Trideer: 68,
    "Your Brand": 62,
    URBNFit: 58,
    "Live Infinitely": 45,
  },
]

const competitorColors = {
  Vivora: "#FF7D55", // Primary warm orange
  Trideer: "#FB7D5C", // Bright orange
  "Your Brand": "#DE7053", // Coral
  URBNFit: "#B86048", // Medium orange
  "Live Infinitely": "#F0A490", // Peach
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1B19] text-white p-4 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const competitor = competitorData.find((c) => c.brand === entry.name)
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              {competitor?.domain && (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=16`}
                  alt={`${entry.name} logo`}
                  className="w-4 h-4"
                />
              )}
              <span className="text-[#C4BAAE]">{entry.name}</span>
              <span className="text-[#FF7D55] font-semibold ml-auto">{entry.value}</span>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string

  const product = mockProducts.find((p) => p.id === productId)

  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0)
  const [competitorTab, setCompetitorTab] = useState<"comparison" | "trends">("comparison")

  const handleTrackProduct = () => {
    alert(`Product "${product?.title}" will be tracked. Redirecting to products page...`)
    router.push("/products")
  }

  if (!product) {
    return (
      <div className="h-full bg-background overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
            <p className="text-[#934F3C]/70">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product.tracked) {
    return (
      <div className="h-full bg-background overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6 p-6 pb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-[#934F3C]/70">
              <span>Product ID: {product.asin}</span>
              <span>·</span>
              <span>Amazon/Shopify</span>
              <span>·</span>
              <Badge variant="secondary">Untracked</Badge>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-full max-w-md h-64 bg-[#F7F6F3] rounded-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <div className="flex items-center justify-center gap-4 text-sm text-[#934F3C]/70">
                    <span>{product.brand}</span>
                    <span>·</span>
                    <span>{product.category}</span>
                  </div>
                </div>

                <div className="space-y-3 max-w-md">
                  <p className="text-[#934F3C]/70">
                    This product is not being tracked. Track this product to access detailed analytics, queries,
                    recommendations, and version history.
                  </p>
                  <Button onClick={handleTrackProduct} size="lg" className="w-full">
                    Track Product
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const versions = product.versions.length > 0 ? product.versions : [getDefaultVersion(product)]
  const selectedVersion = versions[selectedVersionIndex]

  const versionChartData = versions
    .map((v) => ({
      date: new Date(v.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      geoScore: v.geoScore,
      change: v.visibilityChange,
    }))
    .reverse()

  const engineDistribution = [
    { name: "ChatGPT", value: 45, fill: "#FF7D55" }, // Primary warm orange
    { name: "Perplexity", value: 35, fill: "#B86048" }, // Medium orange (darker for contrast)
    { name: "Gemini", value: 20, fill: "#EECBC2" }, // Light peach (lighter for contrast)
  ]

  const scoreOverTimeData = [
    { date: "Oct 1", score: 52 },
    { date: "Oct 5", score: 55 },
    { date: "Oct 8", score: 58 },
    { date: "Oct 10", score: 60 },
    { date: "Oct 13", score: 59 },
    { date: "Oct 15", score: 61 },
    { date: "Oct 17", score: 62 },
  ]

  const getScoreBadgeColor = (score: number) => {
    if (score >= 70) return "bg-[#EECBC2] text-[#B86048]" // Light peach background with medium orange text
    if (score >= 50) return "bg-[#FCBBA9]/30 text-[#934F3C]" // Soft peach background with brown text
    return "bg-[#DE7053]/20 text-[#934F3C]" // Coral background with brown text
  }

  console.log("[v0] Engine distribution data:", engineDistribution)

  return (
    <div className="h-full bg-background overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 p-4 pb-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          {versions.length > 1 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#934F3C]/70">Product Version:</span>
              <Select
                value={selectedVersionIndex.toString()}
                onValueChange={(value) => setSelectedVersionIndex(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {new Date(version.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{selectedVersion.snapshot.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[#934F3C]/70">
            <span>Product ID: {product.asin}</span>
            <span>·</span>
            <span>Amazon/Shopify</span>
            <span>·</span>
            <span>
              Last updated:{" "}
              {new Date(selectedVersion.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              <div className="w-full h-40 bg-[#F7F6F3] rounded-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={selectedVersion.snapshot.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-sm">Description</h3>
                <p className="text-sm text-[#934F3C]/70">{selectedVersion.snapshot.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-[#934F3C]/70 text-xs">Category</div>
                  <div className="font-semibold">{product.category}</div>
                </div>
                <div>
                  <div className="text-[#934F3C]/70 text-xs">Brand</div>
                  <div className="font-semibold">{product.brand}</div>
                </div>
                <div>
                  <div className="text-[#934F3C]/70 text-xs">GEO Score</div>
                  <Badge className={getScoreBadgeColor(selectedVersion.geoScore)}>{selectedVersion.geoScore}</Badge>
                </div>
                <div>
                  <div className="text-[#934F3C]/70 text-xs">Images</div>
                  <div className="font-semibold">{selectedVersion.snapshot.images}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-sm">Product Features</h3>
                <ul className="space-y-1">
                  {selectedVersion.snapshot.bulletPoints.map((point, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-[#FF7D55] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#E3DED8] text-xs text-[#934F3C]/70">
                <p>
                  In future, this card would be available at amazon/brand/semaine/shopify/productid for public, so for
                  now extract this with the semantic data
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Product Analysis</CardTitle>
            </CardHeader>
            <CardContent className="py-0 h-full">
              <div className="flex flex-col flex-1 justify-between h-full">
                <div>
                  <div className="flex gap-2 border-b">
                    <button
                      onClick={() => setCompetitorTab("comparison")}
                      className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        competitorTab === "comparison"
                          ? "border-[#FF7D55] text-[#FF7D55]"
                          : "border-transparent text-[#934F3C]/70 hover:text-[#1E1D1B]",
                      )}
                    >
                      Competitor Comparison
                    </button>
                    <button
                      onClick={() => setCompetitorTab("trends")}
                      className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        competitorTab === "trends"
                          ? "border-[#FF7D55] text-[#FF7D55]"
                          : "border-transparent text-[#934F3C]/70 hover:text-[#1E1D1B]",
                      )}
                    >
                      Visibility Trends
                    </button>
                  </div>

                  {competitorTab === "comparison" && (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead className="text-right">Avg Position</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {competitorData.map((competitor) => (
                            <TableRow key={competitor.rank} className={competitor.isYou ? "bg-[#FCBBA9]/20" : ""}>
                              <TableCell className="font-medium">{competitor.rank}</TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={`https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=32`}
                                    alt={`${competitor.brand} logo`}
                                    className="w-5 h-5"
                                  />
                                  <span>{competitor.brand}</span>
                                  {competitor.isYou && (
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      You
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <span className="font-semibold">{competitor.visibility}%</span>
                                  <div className="flex items-center gap-1">
                                    {competitor.visibilityTrend > 0 ? (
                                      <>
                                        <span className="text-[#FF7D55] text-xs">↗</span>
                                        <span className="text-[#FF7D55] text-xs">{competitor.visibilityTrend}</span>
                                      </>
                                    ) : competitor.visibilityTrend < 0 ? (
                                      <>
                                        <span className="text-[#DE7053] text-xs">↘</span>
                                        <span className="text-[#DE7053] text-xs">
                                          {Math.abs(competitor.visibilityTrend)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-[#934F3C]/50 text-xs">—</span>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-semibold">{competitor.avgPosition}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {competitorTab === "trends" && (
                    <div className="space-y-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={visibilityTrendsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" vertical={false} />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "#E3DED8" }}
                            tickLine={false}
                          />
                          <YAxis
                            domain={[0, 80]}
                            ticks={[0, 15, 30, 45, 60]}
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "#E3DED8" }}
                            tickLine={false}
                            label={{
                              value: "Citations",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="Vivora"
                            stroke={competitorColors.Vivora}
                            strokeWidth={2}
                            dot={{ fill: competitorColors.Vivora, r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Trideer"
                            stroke={competitorColors.Trideer}
                            strokeWidth={2}
                            dot={{ fill: competitorColors.Trideer, r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Your Brand"
                            stroke={competitorColors["Your Brand"]}
                            strokeWidth={2}
                            dot={{ fill: competitorColors["Your Brand"], r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="URBNFit"
                            stroke={competitorColors.URBNFit}
                            strokeWidth={2}
                            dot={{ fill: competitorColors.URBNFit, r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Live Infinitely"
                            stroke={competitorColors["Live Infinitely"]}
                            strokeWidth={2}
                            dot={{ fill: competitorColors["Live Infinitely"], r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <p className="text-sm text-[#934F3C]/70 text-center">
                        Shows the number of times each competitor was cited in AI answers over time
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-[#E3DED8]">
                  <div className="p-3 bg-[#F7F6F3] rounded-lg">
                    <div className="text-[#934F3C]/70 mb-1 text-xs">Visibility Change</div>
                    <div className={`text-xl font-semibold ${selectedVersion.visibilityChange >= 0 ? 'text-[#FF7D55]' : 'text-[#DE7053]'}`}>
                      {selectedVersion.visibilityChange > 0 ? "+" : ""}
                      {selectedVersion.visibilityChange}%
                    </div>
                  </div>
                  <div className="p-3 bg-[#F7F6F3] rounded-lg">
                    <div className="text-[#934F3C]/70 mb-1 text-xs">Queries</div>
                    <div className="text-xl font-semibold text-[#1E1D1B]">
                      {Math.round(selectedVersion.geoScore * 10)}/{Math.round(selectedVersion.geoScore * 15)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">AI Engine Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={engineDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {engineDistribution.map((entry, index) => {
                      return <Cell key={`cell-${index}`} fill={entry.fill} stroke="#FFFFFF" strokeWidth={2} />
                    })}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => {
                      const entry = engineDistribution.find((e) => e.name === value)
                      return <span style={{ color: '#1E1D1B', fontWeight: 500 }}>{value}</span>
                    }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Score Over Date (Versions)</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={scoreOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    label={{ value: "date (versions)", position: "insideBottom", offset: -5, fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ value: "score", angle: -90, position: "insideLeft", fontSize: 12 }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#FF7D55" strokeWidth={2} dot={{ fill: "#FF7D55" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {product.tracked && (
          <>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Top Queries</CardTitle>
                  <span className="text-sm text-[#934F3C]/70">Query title - ChatGPT position</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Query</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQueries.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell className="font-medium">{query.query}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">#{query.position}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/prompts?product=${encodeURIComponent(product.title)}`}>
                            <Button variant="ghost" size="sm" className="gap-2">
                              View Details
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recommendations</CardTitle>
                  <Link href={`/recommendations?product=${encodeURIComponent(product.title)}`}>
                    <Button variant="outline" size="sm">
                      View All ({product.recommendationsCount})
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recommendation</TableHead>
                      <TableHead className="w-24">Impact</TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecommendations.map((rec) => (
                      <TableRow key={rec.id} className="hover:bg-[#F7F6F3]/50 cursor-pointer">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-8 bg-[#FF7D55] rounded-full flex-shrink-0" />
                            <span className="text-sm">{rec.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              rec.impact === "High" && "bg-[#FCBBA9]/30 text-[#B86048]",
                              rec.impact === "Medium" && "bg-[#F0A490]/30 text-[#934F3C]",
                              rec.impact === "Low" && "bg-[#E3DED8] text-[#934F3C]",
                            )}
                          >
                            {rec.impact}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/recommendations?product=${encodeURIComponent(product.title)}`}>
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              Details
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

const mockQueries = [
  { id: "q1", query: "best ergonomic office chair for back pain", position: 3, engine: "ChatGPT", snippetId: "snip1" },
  { id: "q2", query: "balance ball chair reviews 2025", position: 1, engine: "Perplexity", snippetId: "snip2" },
  { id: "q3", query: "office chair for posture improvement", position: 5, engine: "Gemini", snippetId: "snip3" },
  { id: "q4", query: "yoga ball chair benefits and drawbacks", position: 2, engine: "ChatGPT", snippetId: "snip4" },
  {
    id: "q5",
    query: "ergonomic seating solutions for home office",
    position: 7,
    engine: "Perplexity",
    snippetId: "snip5",
  },
  {
    id: "q6",
    query: "stability ball chair vs regular office chair",
    position: 4,
    engine: "Gemini",
    snippetId: "snip6",
  },
]

const mockRecommendations = [
  {
    id: "r1",
    title: "Add 'lumbar support' and 'posture correction' to product bullets",
    impact: "High",
    snippetId: "snip1",
  },
  {
    id: "r2",
    title: "Optimize title with high-volume search terms: 'ergonomic', 'back pain relief'",
    impact: "High",
    snippetId: "snip2",
  },
  {
    id: "r3",
    title: "Add lifestyle images showing product in home office setting (currently 3, recommended 7+)",
    impact: "Medium",
    snippetId: "snip3",
  },
  {
    id: "r4",
    title: "Include comparison chart with traditional office chairs in A+ content",
    impact: "Medium",
    snippetId: "snip4",
  },
  {
    id: "r5",
    title: "Add video demonstration of assembly and usage",
    impact: "High",
    snippetId: "snip5",
  },
]
