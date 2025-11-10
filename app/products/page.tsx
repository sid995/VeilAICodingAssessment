"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ProductsHeader } from "./components/products-header"
import { ProductsTable } from "./components/products-table"
import { BulkActionsBar } from "./components/bulk-actions-bar"

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleViewDetails = (product: Product) => {
    router.push(`/products/${product.id}`)
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

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-[#5D9B89]"
    if (score >= 50) return "text-[#D4A574]"
    return "text-[#DE7053]"
  }

  // Get the most recent scan date from tracked products
  const lastScanDate = useMemo(() => {
    const trackedProducts = products.filter((p) => p.tracked)
    if (trackedProducts.length === 0) return "N/A"
    const sortedByDate = [...trackedProducts].sort(
      (a, b) => new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime()
    )
    return sortedByDate[0]?.lastRun || "N/A"
  }, [products])

  // Calculate additional metrics
  const totalRecommendations = useMemo(() => {
    return products.filter((p) => p.tracked).reduce((sum, p) => sum + p.recommendationsCount, 0)
  }, [products])

  const improvingProducts = useMemo(() => {
    return products.filter((p) => p.tracked && p.visibilityChange > 0).length
  }, [products])

  const decliningProducts = useMemo(() => {
    return products.filter((p) => p.tracked && p.visibilityChange < 0).length
  }, [products])

  const uniqueEngines = useMemo(() => {
    const engines = new Set<string>()
    products.forEach((p) => {
      if (p.tracked) {
        p.engines.forEach((e) => engines.add(e))
      }
    })
    return engines.size
  }, [products])

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <ProductsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isTrackedView={isTrackedView}
        trackedCount={trackedCount}
        totalCount={products.length}
      />

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Bulk Actions Bar */}
          {selectedProducts.length > 0 && (
            <div className="flex-shrink-0 px-6 pt-6">
              <BulkActionsBar
                selectedCount={selectedProducts.length}
                onTrackProducts={handleTrackProducts}
                onRunScan={handleRunScan}
                onAssignPromptSet={handleAssignPromptSet}
                onClear={() => setSelectedProducts([])}
              />
            </div>
          )}

          {/* Products Table */}
          <div className="flex-1 flex flex-col min-h-0">
            <ProductsTable
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Footer Stats Bar */}
      <div className="border-t border-[#E3DED8] bg-gradient-to-r from-[#F7F6F3] to-[#FEFDFB] px-6 py-3 shadow-sm flex-shrink-0">
        <div className="grid grid-cols-7 divide-x divide-[#E3DED8]">
          {/* Products Tracked */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Tracked</span>
            <span className="text-sm text-[#1E1D1B]">
              <strong className="text-[#5B8BB8]">{trackedCount}</strong> / {products.length}
            </span>
          </div>

          {/* Average GEO Score */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Avg Score</span>
            <span className="text-sm text-[#1E1D1B]">
              <strong className={getScoreColor(avgGeoScore)}>{avgGeoScore}</strong> / 100
            </span>
          </div>

          {/* Visibility Trend */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Trend</span>
            <span className="text-sm text-[#1E1D1B]">
              <strong className={avgVisibilityChange >= 0 ? 'text-[#5D9B89]' : 'text-[#DE7053]'}>
                {avgVisibilityChange >= 0 ? "+" : ""}{avgVisibilityChange.toFixed(1)}%
              </strong>{" "}
              WoW
            </span>
          </div>

          {/* Last Scan */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Last Scan</span>
            <span className="text-sm font-semibold text-[#FF7D55]">{lastScanDate}</span>
          </div>

          {/* Recommendations */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Actions</span>
            <span className="text-sm text-[#1E1D1B]">
              <strong className="text-[#FF7D55]">{totalRecommendations}</strong> pending
            </span>
          </div>

          {/* Performance Split */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Performance</span>
            <span className="text-sm text-[#1E1D1B]">
              <span className="text-[#5D9B89] font-semibold">↑{improvingProducts}</span> <span className="text-[#DE7053] font-semibold">↓{decliningProducts}</span>
            </span>
          </div>

          {/* Engines Coverage */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <span className="text-xs text-[#934F3C]/60 uppercase tracking-wide font-medium">Engines</span>
            <span className="text-sm text-[#1E1D1B]">
              <strong>{uniqueEngines}</strong> active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
