"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  BarChart3,
  Lightbulb,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

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

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isTrackedView = useMemo(() => {
    return searchParams?.get("view") === "tracked"
  }, [searchParams])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "tracked" | "untracked">("all")
  const [sortBy, setSortBy] = useState("visibility")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [products, setProducts] = useState(mockProducts)

  useEffect(() => {
    setFilterStatus(isTrackedView ? "tracked" : "all")
  }, [isTrackedView])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.asin.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "tracked" && product.tracked) ||
        (filterStatus === "untracked" && !product.tracked)
      return matchesSearch && matchesFilter
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "visibility":
          return b.geoScore - a.geoScore
        case "improving":
          return b.visibilityChange - a.visibilityChange
        case "recent":
          return new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime()
        case "recommendations":
          return b.recommendationsCount - a.recommendationsCount
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchQuery, filterStatus, sortBy])

  const trackedCount = products.filter((p) => p.tracked).length
  const avgGeoScore = Math.round(
    products.filter((p) => p.tracked).reduce((sum, p) => sum + p.geoScore, 0) / trackedCount,
  )
  const avgVisibilityChange =
    products.filter((p) => p.tracked).reduce((sum, p) => sum + p.visibilityChange, 0) / trackedCount

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleViewDetails = (product: Product) => {
    router.push(`/products/${product.id}`)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 70) return "bg-green-100 text-green-700"
    if (score >= 50) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  const handleTrackProducts = () => {
    setProducts((prev) =>
      prev.map((product) =>
        selectedProducts.includes(product.id) ? { ...product, tracked: true, status: "tracked" as const } : product,
      ),
    )
    setSelectedProducts([])
  }

  const handleRunScan = () => {
    const productIds = selectedProducts.join(",")
    router.push(`/visibility?productIds=${productIds}`)
  }

  const handleAssignPromptSet = () => {
    const productIds = selectedProducts.join(",")
    router.push(`/prompts?productIds=${productIds}`)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 max-w-[1800px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {isTrackedView ? "Tracked Products" : "Product Optimization Hub"}
            </h1>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ASIN, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="tracked">Tracked Only</SelectItem>
                <SelectItem value="untracked">Untracked Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="visibility">Highest Visibility</SelectItem>
                <SelectItem value="improving">Fastest Improving</SelectItem>
                <SelectItem value="recent">Most Recently Scanned</SelectItem>
                <SelectItem value="recommendations">Most Recommendations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <Card className="p-4 mb-6 bg-teal-50 border-teal-200">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleTrackProducts}>
                  Track Products
                </Button>
                <Button variant="outline" size="sm" onClick={handleRunScan}>
                  Run Scan
                </Button>
                <Button variant="outline" size="sm" onClick={handleAssignPromptSet}>
                  Assign Prompt Set
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProducts([])}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-12">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProducts(filteredProducts.map((p) => p.id))
                        } else {
                          setSelectedProducts([])
                        }
                      }}
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ASIN</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">GEO Score</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Visibility</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Engines</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => handleViewDetails(product)}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {product.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{product.asin}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className={getScoreBadgeColor(product.geoScore)}>
                        {product.geoScore}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {product.visibilityChange !== 0 && (
                        <div
                          className={`flex items-center gap-1.5 text-sm font-medium ${product.visibilityChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {product.visibilityChange > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {Math.abs(product.visibilityChange)}%
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {product.engines.length > 0 ? (
                        <div className="flex items-center gap-1 flex-wrap max-w-[200px]">
                          {product.engines.slice(0, 3).map((engine) => (
                            <Badge key={engine} variant="outline" className="text-xs px-2 py-0.5">
                              {engine}
                            </Badge>
                          ))}
                          {product.engines.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              +{product.engines.length - 3}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {product.status === "tracked" && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Tracked
                        </Badge>
                      )}
                      {product.status === "untracked" && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                          Untracked
                        </Badge>
                      )}
                      {product.status === "pending" && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Analyzing...
                        </Badge>
                      )}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <Link href={`/visibility?productId=${product.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
                            <BarChart3 className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/recommendations?productId=${product.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 relative">
                            <Lightbulb className="w-3.5 h-3.5" />
                            {product.recommendationsCount > 0 && (
                              <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 px-1 text-[10px]">
                                {product.recommendationsCount}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                        <Link href={`/prompts?productId=${product.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 px-2 gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(product)}>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>View Recommendations</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span>
              <strong>{trackedCount}</strong> / {products.length} products tracked
            </span>
            <span className="text-muted-foreground">·</span>
            <span>
              Average GEO Score: <strong className={getScoreColor(avgGeoScore)}>{avgGeoScore}</strong>
            </span>
            <span className="text-muted-foreground">·</span>
            <span>
              Visibility change:{" "}
              <strong className={avgVisibilityChange >= 0 ? "text-green-600" : "text-red-600"}>
                {avgVisibilityChange >= 0 ? "+" : ""}
                {avgVisibilityChange.toFixed(1)}%
              </strong>{" "}
              week-over-week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
