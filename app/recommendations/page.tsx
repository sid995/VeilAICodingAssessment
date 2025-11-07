"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import confetti from "canvas-confetti"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  title: string
  description: string
  whyItHelps: string
  priority: "high" | "medium" | "low"
  status: "pending" | "completed"
  product: string
  category: "seo" | "content" | "images" | "reviews" | "technical" | "marketing"
}

const trackedProducts = [
  { id: "all", name: "All Products", count: 169, domain: "" },
  {
    id: "product-1",
    name: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    count: 45,
    domain: "gaiam.com",
  },
  {
    id: "product-2",
    name: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    count: 38,
    domain: "gaiam.com",
  },
  {
    id: "product-3",
    name: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    count: 42,
    domain: "gaiam.com",
  },
  { id: "product-4", name: "Gaiam Balance Ball Chair - Blue", count: 44, domain: "gaiam.com" },
]

const mockActions: Action[] = [
  {
    id: "1",
    title: "Update product descriptions with recent customer testimonials",
    description: "Add 3-5 recent reviews to top products to improve AI visibility and trust signals.",
    whyItHelps:
      "Recent testimonials signal freshness to AI engines like ChatGPT, increasing your chances of being recommended. This can boost visibility by 15-20%.",
    priority: "high",
    status: "pending",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    category: "reviews",
  },
  {
    id: "2",
    title: "Optimize product titles for search engines",
    description: "Include key terms like 'ergonomic' and 'office seating' in product titles.",
    whyItHelps:
      "AI engines prioritize products with clear, descriptive titles that match user intent. Better titles can improve your ranking in 60% of relevant queries.",
    priority: "high",
    status: "pending",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    category: "seo",
  },
  {
    id: "3",
    title: "Add technical specifications to product pages",
    description: "Include detailed specs like dimensions, weight capacity, and materials.",
    whyItHelps:
      "Detailed specifications help AI engines answer specific customer questions, making your products more likely to be cited in technical comparisons.",
    priority: "medium",
    status: "pending",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    category: "technical",
  },
  {
    id: "4",
    title: "Create comparison charts for similar products",
    description: "Help customers understand differences between product variants.",
    whyItHelps:
      "Comparison content positions you as an authority and increases the likelihood of being featured in 'best of' recommendations by AI engines.",
    priority: "medium",
    status: "completed",
    product: "Gaiam Balance Ball Chair - Blue",
    category: "content",
  },
  {
    id: "5",
    title: "Update product images with lifestyle photos",
    description: "Add contextual images showing products in use.",
    whyItHelps:
      "Visual context helps AI engines understand product use cases better, improving relevance matching for customer queries about specific scenarios.",
    priority: "low",
    status: "pending",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    category: "images",
  },
  {
    id: "6",
    title: "Add FAQ section addressing common customer questions",
    description: "Create a comprehensive FAQ covering setup, maintenance, and usage questions.",
    whyItHelps:
      "FAQs directly feed AI engines with structured Q&A content, making your products 3x more likely to appear in conversational search results.",
    priority: "high",
    status: "pending",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    category: "content",
  },
  {
    id: "7",
    title: "Implement structured data markup for products",
    description: "Add schema.org markup to help search engines understand your product data.",
    whyItHelps:
      "Structured data makes it easier for AI to extract accurate product information, improving citation accuracy and ranking potential by 25%.",
    priority: "high",
    status: "pending",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    category: "technical",
  },
  {
    id: "8",
    title: "Create video demonstrations for top products",
    description: "Produce 2-3 minute videos showing product features and benefits.",
    whyItHelps:
      "Video content signals high-quality resources to AI engines and increases engagement, leading to better visibility in multimedia search results.",
    priority: "medium",
    status: "completed",
    product: "Gaiam Balance Ball Chair - Blue",
    category: "marketing",
  },
  {
    id: "9",
    title: "Add size guides and fit recommendations",
    description: "Include detailed sizing information to help customers choose the right product.",
    whyItHelps:
      "Size guides reduce returns and provide valuable structured content that AI engines use to answer fit-related queries, improving recommendation rates.",
    priority: "medium",
    status: "pending",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    category: "content",
  },
  {
    id: "10",
    title: "Optimize product URLs with descriptive keywords",
    description: "Update URLs to include product names and key features instead of generic IDs.",
    whyItHelps:
      "Descriptive URLs improve SEO and help AI engines understand page content before crawling, increasing indexing priority and relevance scores.",
    priority: "low",
    status: "completed",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    category: "seo",
  },
  {
    id: "11",
    title: "Add customer use case stories and testimonials",
    description: "Feature real customer stories about how they use the product in their daily lives.",
    whyItHelps:
      "Use case stories provide context that AI engines use to match products with specific customer needs, improving recommendation accuracy by 30%.",
    priority: "medium",
    status: "pending",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    category: "reviews",
  },
  {
    id: "12",
    title: "Create buying guides for product categories",
    description: "Develop comprehensive guides to help customers choose the right product type.",
    whyItHelps:
      "Buying guides establish authority and provide rich content that AI engines reference when recommending products, increasing visibility in educational queries.",
    priority: "high",
    status: "pending",
    product: "Gaiam Balance Ball Chair - Blue",
    category: "content",
  },
  {
    id: "13",
    title: "Add high-resolution product images from multiple angles",
    description: "Upload 6-8 professional photos showing product details and features.",
    whyItHelps:
      "Multiple high-quality images improve user experience and provide visual data that AI engines use for image search and product understanding.",
    priority: "medium",
    status: "pending",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    category: "images",
  },
  {
    id: "14",
    title: "Implement customer Q&A section on product pages",
    description: "Enable customers to ask questions and get answers from other users or your team.",
    whyItHelps:
      "User-generated Q&A provides fresh, relevant content that AI engines prioritize, increasing your chances of appearing in long-tail search queries.",
    priority: "low",
    status: "pending",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    category: "content",
  },
  {
    id: "15",
    title: "Add sustainability and eco-friendly product information",
    description: "Highlight environmental benefits, materials, and certifications.",
    whyItHelps:
      "Sustainability information is increasingly important to AI recommendations as more users search for eco-friendly options, improving visibility in green searches.",
    priority: "medium",
    status: "completed",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    category: "marketing",
  },
]

const categoryConfig = {
  seo: { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-300" },
  content: { color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-300" },
  images: { color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-300" },
  reviews: { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-300" },
  technical: { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300" },
  marketing: { color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-300" },
}

function ActionCard({
  action,
  onComplete,
  onDismiss,
  onToggle,
}: {
  action: Action
  onComplete: (id: string) => void
  onDismiss: (id: string) => void
  onToggle: (id: string) => void
}) {
  const statusBadge = {
    pending: { label: "Pending", className: "bg-background text-foreground border" },
    completed: { label: "Completed", className: "bg-background text-foreground border" },
  }

  const isCompleted = action.status === "completed"
  const product = trackedProducts.find((p) => p.name === action.product)
  const categoryInfo = categoryConfig[action.category]

  return (
    <div className={cn("border rounded-lg p-4 bg-card transition-all hover:shadow-md", isCompleted && "opacity-60")}>
      <div className="flex items-start gap-3 mb-3">
        <Checkbox
          checked={action.status === "completed"}
          onCheckedChange={() => onToggle(action.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className={cn("font-semibold text-base", isCompleted && "line-through")}>{action.title}</h3>
            <Badge variant="outline" className={statusBadge[action.status].className}>
              {statusBadge[action.status].label}
            </Badge>
          </div>
          <p className={cn("text-sm text-muted-foreground mb-2", isCompleted && "line-through")}>
            {action.description}
          </p>
          <div className="flex items-center gap-2">
            {product?.domain && (
              <img
                src={`https://www.google.com/s2/favicons?domain=${product.domain}&sz=16`}
                alt={`${product.name} logo`}
                className="w-4 h-4"
              />
            )}
            <span className="text-xs text-muted-foreground font-medium">{action.product}</span>
          </div>
        </div>
      </div>

      <div className={cn("mt-3 ml-9 rounded-md p-3", categoryInfo.bg, "border-l-4", categoryInfo.border)}>
        <div className="flex items-start gap-2">
          <Lightbulb className={cn("w-4 h-4 mt-0.5 flex-shrink-0", categoryInfo.color)} />
          <div>
            <p className={cn("text-xs font-medium mb-1", categoryInfo.color)}>Why this helps:</p>
            <p className={cn("text-xs text-muted-foreground", isCompleted && "line-through")}>{action.whyItHelps}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 ml-9">
        {action.status === "pending" && (
          <Button onClick={() => onComplete(action.id)} size="sm" className="h-8 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            Mark as Done
          </Button>
        )}
        <Button onClick={() => onDismiss(action.id)} variant="outline" size="sm" className="h-8 text-xs">
          Dismiss
        </Button>
      </div>
    </div>
  )
}

export default function RecommendationsPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [actions, setActions] = useState(mockActions)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all")
  const [filterProduct, setFilterProduct] = useState("all")

  useEffect(() => {
    const productParam = searchParams.get("product")
    if (productParam) {
      // Find the matching product by checking if the param starts with the product name
      const matchingProduct = trackedProducts.find((p) => p.name !== "All Products" && productParam.startsWith(p.name))
      if (matchingProduct) {
        setFilterProduct(matchingProduct.name)
      }
    }
  }, [searchParams])

  const handleToggle = (id: string) => {
    const action = actions.find((a) => a.id === id)
    if (!action) return

    if (action.status === "pending") {
      setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status: "completed" as const } : a)))

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
      })

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }, 300)

      setTimeout(() => {
        setFilterStatus("completed")
      }, 800)
    } else {
      setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status: "pending" as const } : a)))
    }
  }

  const handleComplete = (id: string) => {
    handleToggle(id)
  }

  const handleDismiss = (id: string) => {
    setActions((prev) => prev.filter((action) => action.id !== id))
  }

  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      action.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || action.status === filterStatus
    const matchesProduct = filterProduct === "all" || action.product === filterProduct

    return matchesSearch && matchesStatus && matchesProduct
  })

  const pendingCount = actions.filter((a) => a.status === "pending").length
  const completedCount = actions.filter((a) => a.status === "completed").length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold mb-1">Action Center</h1>
              <p className="text-sm text-muted-foreground">Recommended actions to improve your product visibility</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{pendingCount} pending</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{completedCount} completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-3 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-[240px] h-9">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                {trackedProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id === "all" ? "all" : product.name}>
                    <div className="flex items-center gap-2">
                      {product.domain && (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${product.domain}&sz=16`}
                          alt={`${product.name} logo`}
                          className="w-4 h-4"
                        />
                      )}
                      <span className="truncate max-w-[180px]">{product.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className="h-9 text-sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
                className="h-9 text-sm"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("completed")}
                className="h-9 text-sm"
              >
                Completed
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              onComplete={handleComplete}
              onDismiss={handleDismiss}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No actions found</p>
          </div>
        )}
      </div>
    </div>
  )
}
