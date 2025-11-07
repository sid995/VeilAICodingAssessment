"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import {
  ExternalLink,
  Copy,
  Star,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronUp,
  ChevronDown,
  Zap,
  Loader2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Product {
  id: string
  asin: string
  title: string
  image: string
  geoScore: number
  lastRun: string
  status: string
}

interface ProductDetailModalProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState("product-info")
  const [expandedRecommendation, setExpandedRecommendation] = useState<number | null>(null)
  const [expandedDeepRecommendation, setExpandedDeepRecommendation] = useState<number | null>(null)
  const [scoringLoaded, setScoringLoaded] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden flex-shrink-0 border-2 border-border">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-3 text-balance leading-tight">{product.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="text-muted-foreground">ASIN:</span>
                <span className="font-semibold">{product.asin}</span>
                <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => copyToClipboard(product.asin)}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-3 py-1">
                  Pending Analysis
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              ✕
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3 gap-3 h-auto p-2 bg-muted/50">
            <TabsTrigger
              value="product-info"
              className="flex items-center justify-center gap-2.5 px-5 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="text-sm font-medium">Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="querying"
              className="flex items-center justify-center gap-2.5 px-5 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
              </svg>
              <span className="text-sm font-medium">Querying</span>
            </TabsTrigger>
            <TabsTrigger
              value="deep-scoring"
              className="flex items-center justify-center gap-2.5 px-5 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span className="text-sm font-medium">Scoring</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="product-info" className="mt-8 space-y-8">
            <Card className="p-8 border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Basic Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">ASIN</div>
                  <div className="font-semibold text-lg">{product.asin}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </div>
                  <div className="font-semibold text-lg">
                    3.7/5.0 <span className="text-sm text-muted-foreground font-normal">(83 reviews)</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground mb-2">Status</div>
                  <Badge variant="secondary" className="px-3 py-1">
                    Pending
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Product Variants</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 border-2 border-border rounded-xl bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-2">Variant 1</div>
                  <div className="font-semibold">{product.asin}</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Product Specifications</h3>

              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">ASIN</div>
                  <div className="col-span-2 text-sm font-semibold">{product.asin}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="col-span-2 text-sm">10/17/2025</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">Brand</div>
                  <div className="col-span-2 text-sm font-semibold">Gaiam</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">Manufacturer</div>
                  <div className="col-span-2 text-sm font-semibold">Fit For Life</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                  <div className="col-span-2 text-sm font-semibold">3.7/5</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-b border-border">
                  <div className="text-sm text-muted-foreground">Total Ratings</div>
                  <div className="col-span-2 text-sm font-semibold">83</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-sm text-muted-foreground">Key Features</div>
                  <div className="col-span-2 text-sm">
                    Balance Ball Chair - Our high-quality non-rolling balance chair for adults has five built-in legs
                    that help provide stability and keep the ball in place when not in use. {"It's"} 25.5 inches (65 cm)
                    tall, making it ideal for people {"5'6\""} to {"5'11\""} in height., Promotes Healthy Posture - The
                    ergonomic design of the stability ball chair is ideal for practicing healthy posture. Its size puts
                    the user at eye-level of most desks for sitting up straight and engages the core to help promote a
                    better posture., Improves Focus & Energy - The balance ball chair for adults is great for increasing
                    productivity. The {"ball's"} movements promote blood flow to the brain helping improve concentration
                    and increasing overall focus.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm bg-teal-50 border-teal-200">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4h.01" />
                </svg>
                <h3 className="text-xl font-semibold">Store Information & Links</h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <polyline
                        points="12 6 12 12 16 14"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Last Updated
                  </div>
                  <div className="font-semibold text-lg">10/17/2025</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <ExternalLink className="w-4 h-4" />
                    Product Link
                  </div>
                  <Button variant="link" className="h-auto p-0 text-teal-600 font-semibold text-lg">
                    View on Amazon
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">ASIN (Copy)</div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 h-12 w-full bg-transparent"
                    onClick={() => copyToClipboard(product.asin)}
                  >
                    <Copy className="w-4 h-4" />
                    Copy ASIN
                  </Button>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Share Link</div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 h-12 w-full bg-transparent"
                    onClick={() => copyToClipboard(`https://amazon.com/dp/${product.asin}`)}
                  >
                    <Copy className="w-4 h-4" />
                    Copy URL
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preliminary-scoring" className="mt-8 space-y-8">
            <Card className="p-6 border-2 shadow-sm bg-yellow-50 border-yellow-300">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 text-xl mb-2">Initial Analysis</h3>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    <strong>Note:</strong> This is initial scoring and may be inaccurate. These scores are based on a
                    basic checklist and do not include competitive analysis or market context. For accurate,
                    comprehensive analysis, please use the full Scoring tab.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 shadow-sm bg-purple-50 border-purple-200">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-xl">Initial Scoring</h3>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs px-3 py-1">
                      Quick Check
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is a fast, checklist-based analysis of your {"product's"} SEO, GEO, and conversion
                    optimization. Scores are calculated instantly when products are extracted. For detailed competitive
                    analysis and AI-powered recommendations, use the full Scoring tab.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Overall AI Visibility Score</h3>
                <Badge variant="secondary" className="bg-red-100 text-red-700 text-xl px-5 py-1.5">
                  D
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="84" stroke="#e5e7eb" strokeWidth="14" fill="none" />
                      <circle
                        cx="96"
                        cy="96"
                        r="84"
                        stroke="#14b8a6"
                        strokeWidth="14"
                        fill="none"
                        strokeDasharray={`${(61.7 / 100) * 527.8} 527.8`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-extrabold">61.7</div>
                      <div className="text-base text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-lg">SEO Score</span>
                        <span className="text-sm text-muted-foreground ml-3">
                          (Search visibility & discoverability)
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-bold text-teal-600">Good</span>
                        <span className="font-bold text-lg">36.7/50</span>
                      </div>
                    </div>
                    <Progress value={73.4} className="h-3 bg-gray-200 rounded-full" indicatorClassName="bg-teal-500" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-lg">GEO Score</span>
                        <span className="text-sm text-muted-foreground ml-3">(Geographic targeting & relevance)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-bold text-teal-600">Excellent</span>
                        <span className="font-bold text-lg">10/10</span>
                      </div>
                    </div>
                    <Progress value={100} className="h-3 bg-gray-200 rounded-full" indicatorClassName="bg-teal-500" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-lg">Conversion Score</span>
                        <span className="text-sm text-muted-foreground ml-3">(Purchase likelihood & optimization)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-bold text-red-600">Needs Work</span>
                        <span className="font-bold text-lg">15/40</span>
                      </div>
                    </div>
                    <Progress value={37.5} className="h-3 bg-gray-200 rounded-full" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                <h3 className="text-xl font-semibold">Item-Level Checklist</h3>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">
                  Content Quality & SEO{" "}
                  <span className="text-sm text-muted-foreground font-normal">(1/6 complete)</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Delivery Date", score: "0/10", status: "error" },
                    { name: "A Plus Content", score: "3/10", status: "error" },
                    { name: "Brand Store", score: "3/10", status: "error" },
                    { name: "Category Mapping", score: "5/10", status: "warning" },
                    { name: "Best Seller Rank", score: "7/10", status: "warning" },
                    { name: "Product Specs", score: "10/10", status: "success" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border-2 border-border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        {item.status === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                        {item.status === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        {item.status === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          item.status === "error"
                            ? "bg-red-100 text-red-700"
                            : item.status === "warning"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {item.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">
                  Conversion & Engagement{" "}
                  <span className="text-sm text-muted-foreground font-normal">(2/6 complete)</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Stock Status", score: "0/10", status: "error" },
                    { name: "Review Velocity", score: "1.2/10", status: "error" },
                    { name: "Rating Quality", score: "5/10", status: "warning" },
                    { name: "Price Strategy", score: "6/10", status: "warning" },
                    { name: "Reviews Exist", score: "8/10", status: "success" },
                    { name: "Prime Fba", score: "12/10", status: "success" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border-2 border-border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        {item.status === "error" && <XCircle className="w-5 h-5 text-red-500" />}
                        {item.status === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        {item.status === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          item.status === "error"
                            ? "bg-red-100 text-red-700"
                            : item.status === "warning"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {item.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">
                  Technical & Media <span className="text-sm text-muted-foreground font-normal">(0/2 complete)</span>
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Variant Asins", score: "0/10", status: "error" },
                    { name: "Image Count", score: "1.5/10", status: "error" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 border-2 border-border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {item.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 shadow-sm bg-yellow-50 border-yellow-300">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 text-xl mb-3">Missing Fields (3)</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white border-yellow-400 text-yellow-800">
                      variant_asins: Multiple product variants (8.0 points)
                    </Badge>
                    <Badge variant="outline" className="bg-white border-yellow-400 text-yellow-800">
                      stock_status: Real-time stock availability (10.0 points)
                    </Badge>
                    <Badge variant="outline" className="bg-white border-yellow-400 text-yellow-800">
                      delivery_date: Delivery date estimate (5.0 points)
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm bg-teal-50 border-teal-200">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-semibold">Recommendations</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    text: "CRITICAL: Real-time stock availability (+10.0 points available, currently 0.0/10.0)",
                    impact: "High Impact (15/10)",
                    category: "Coverage",
                    source: "coverage_scorer",
                    queryId: "091eeb25-9eab-4c59-b503-047239677427",
                  },
                  {
                    text: "CRITICAL: Rating ≥4.0 stars (+5.0 points available, currently 5.0/10.0)",
                    impact: "High Impact (15/10)",
                    category: "Quality",
                    source: "rating_scorer",
                    queryId: "091eeb25-9eab-4c59-b503-047239677428",
                  },
                  {
                    text: "CRITICAL: Delivery date estimate (+5.0 points available, currently 0.0/5.0)",
                    impact: "Medium Impact (10/10)",
                    category: "Conversion",
                    source: "delivery_scorer",
                    queryId: "091eeb25-9eab-4c59-b503-047239677429",
                  },
                ].map((rec, index) => (
                  <Card key={index} className="p-5 border-l-4 border-l-blue-500 bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{rec.text}</p>
                          {expandedRecommendation === index && (
                            <div className="mt-4 pt-4 border-t border-border space-y-3 text-sm">
                              <div>
                                <span className="text-muted-foreground font-semibold uppercase">CATEGORY</span>
                                <div className="font-medium">{rec.category}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground font-semibold uppercase">SOURCE</span>
                                <div className="font-mono text-xs">{rec.source}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground font-semibold uppercase">QUERY ID</span>
                                <div className="font-mono text-xs">{rec.queryId}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-100 text-red-700 whitespace-nowrap">
                          {rec.impact}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => copyToClipboard(rec.text)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setExpandedRecommendation(expandedRecommendation === index ? null : index)}
                        >
                          {expandedRecommendation === index ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="querying" className="mt-8 space-y-8">
            <Card className="p-6 border-2 shadow-sm bg-teal-50 border-teal-200">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                </svg>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-xl">Query Generation</h3>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-xs px-3 py-1">
                      AI-Powered
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These search queries are generated for scoring your {"product's"} visibility and for future
                    analysis. Queries help evaluate how customers might search for your product and prepare data for
                    comprehensive scoring analysis.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Query Breakdown</h3>
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Total Queries</div>
                  <div className="text-4xl font-extrabold">50</div>
                </Card>
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Unique Platforms</div>
                  <div className="text-4xl font-extrabold">4</div>
                </Card>
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Buyer Roles</div>
                  <div className="text-4xl font-extrabold">4</div>
                </Card>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                <h3 className="text-xl font-semibold">Query Coverage Analysis</h3>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Queries Analyzed</div>
                  <div className="text-3xl font-bold">50</div>
                </Card>
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Avg Coverage</div>
                  <div className="text-3xl font-bold text-teal-600">63.8%</div>
                </Card>
                <Card className="p-5 border-2 shadow-sm bg-muted/10">
                  <div className="text-sm text-muted-foreground mb-2">Best Coverage</div>
                  <div className="text-3xl font-bold text-teal-600">1.0%</div>
                </Card>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <span className="text-base font-medium">Title Coverage</span>
                    </div>
                    <span className="font-bold">38.0%</span>
                  </div>
                  <Progress value={38} className="h-2.5 bg-gray-200 rounded-full" indicatorClassName="bg-teal-500" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span className="text-base font-medium">Supporting Terms Coverage</span>
                    </div>
                    <span className="font-bold">68.0%</span>
                  </div>
                  <Progress value={68} className="h-2.5 bg-gray-200 rounded-full" indicatorClassName="bg-teal-500" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">Top Covered Queries</h4>
                <div className="space-y-3">
                  {[
                    { query: "ethically sourced ingredients in menstrual cramps relief", coverage: "1.0%" },
                    { query: "natural PMS relief that supports every menstrual cycle", coverage: "1.0%" },
                  ].map((item, index) => (
                    <Card key={index} className="p-5 border-2 shadow-sm bg-muted/10">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1.5">{item.query}</p>
                          <p className="text-xs text-muted-foreground">
                            Title: {index === 0 ? "1%" : "0%"} Support: 1%
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-red-100 text-red-700 ml-4">
                          {item.coverage}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Generated Search Queries</h3>
              </div>

              <div className="space-y-5">
                {[
                  {
                    query: "period relief supplements that are lab-tested and trusted",
                    date: "Oct 17, 2025",
                    who: [
                      { label: "Role: parent", color: "teal" },
                      { label: "Location: IL", color: "teal" },
                      { label: "Price: mid-range", color: "teal" },
                    ],
                    what: [
                      { label: "Tone: practical", color: "teal" },
                      { label: "Keywords: lab-tested, trusted, period relief", color: "teal" },
                    ],
                    when: [{ label: "fall", color: "teal" }],
                    where: [{ label: "Amazon", color: "teal" }],
                  },
                  {
                    query: "artisan menstrual relief capsules for mood management",
                    date: "Oct 17, 2025",
                    who: [
                      { label: "Role: professional", color: "teal" },
                      { label: "Location: FL", color: "teal" },
                      { label: "Price: premium", color: "teal" },
                    ],
                    what: [
                      { label: "Tone: sophisticated", color: "teal" },
                      { label: "Keywords: artisan, menstrual relief, mood", color: "teal" },
                    ],
                    when: [{ label: "fall", color: "teal" }],
                    where: [{ label: "Amazon", color: "teal" }],
                  },
                ].map((item, index) => (
                  <Card key={index} className="p-5 border-l-4 border-l-teal-500 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="font-bold text-lg mb-1.5">{item.query}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth={2} />
                            <polyline
                              points="12 6 12 12 16 14"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-5 text-sm">
                      <div>
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase">WHO (TARGET BUYER)</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.who.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase">WHERE (PLATFORM)</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.where.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase">WHAT (FEATURES)</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.what.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-muted-foreground mb-2 uppercase">WHEN</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.when.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {tag.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deep-scoring" className="mt-8 space-y-8">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setScoringLoaded(!scoringLoaded)} className="gap-2">
                {scoringLoaded ? "Show Loading State" : "Show Loaded State"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {!scoringLoaded ? (
              <>
                <Card className="p-8 border-2 shadow-sm bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold">Overall AI Visibility Score</h3>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xl px-5 py-1.5">
                      D
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                    <div className="flex justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="84" stroke="#e5e7eb" strokeWidth="14" fill="none" />
                          <circle
                            cx="96"
                            cy="96"
                            r="84"
                            stroke="#14b8a6"
                            strokeWidth="14"
                            fill="none"
                            strokeDasharray={`${(61.7 / 100) * 527.8} 527.8`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-5xl font-extrabold">61.7</div>
                          <div className="text-base text-muted-foreground">/100</div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-lg">SEO Score</span>
                            <span className="text-sm text-muted-foreground ml-3">
                              (Search visibility & discoverability)
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-base font-bold text-teal-600">Good</span>
                            <span className="font-bold text-lg">36.7/50</span>
                          </div>
                        </div>
                        <Progress
                          value={73.4}
                          className="h-3 bg-gray-200 rounded-full"
                          indicatorClassName="bg-teal-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-lg">GEO Score</span>
                            <span className="text-sm text-muted-foreground ml-3">
                              (Geographic targeting & relevance)
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-base font-bold text-teal-600">Excellent</span>
                            <span className="font-bold text-lg">10/10</span>
                          </div>
                        </div>
                        <Progress
                          value={100}
                          className="h-3 bg-gray-200 rounded-full"
                          indicatorClassName="bg-teal-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="font-bold text-lg">Conversion Score</span>
                            <span className="text-sm text-muted-foreground ml-3">
                              (Purchase likelihood & optimization)
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-base font-bold text-red-600">Needs Work</span>
                            <span className="font-bold text-lg">15/40</span>
                          </div>
                        </div>
                        <Progress
                          value={37.5}
                          className="h-3 bg-gray-200 rounded-full"
                          indicatorClassName="bg-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 shadow-sm bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-4">
                    <Loader2 className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1 animate-spin" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-900 text-2xl mb-3">Check back soon for results</h3>
                      <p className="text-base text-yellow-800 leading-relaxed">
                        We're currently scraping your products and analyzing competitive data across multiple AI
                        platforms. This comprehensive analysis includes query coverage, ranking positions, and
                        actionable recommendations. Results typically take 5-10 minutes to complete.
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <Card className="p-6 border-2 shadow-sm bg-teal-50 border-teal-200">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-xl">Scoring Complete</h3>
                        <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-xs px-3 py-1">
                          Live Data
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Comprehensive competitive analysis with real-time platform rankings, query coverage metrics, and
                        AI-powered recommendations. Last updated: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-teal-600" />
                      <h3 className="text-xl font-semibold">Actionable Recommendations</h3>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-base px-4 py-1.5">
                      10 High Priority
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Add supporting term 'flavored' to bullets",
                        description:
                          "Include the term 'flavored' in your product bullets or description to improve query coverage and visibility.",
                        why: "This term appears in 8 high-volume search queries. Adding it could increase your coverage score by 12% and improve rankings on ChatGPT and Perplexity.",
                        estimatedTime: "5 min",
                        impact: "High Impact",
                        category: "Coverage",
                      },
                      {
                        title: "Add supporting term 'buy' to description",
                        description:
                          "Incorporate the action term 'buy' naturally into your product description to match user search intent.",
                        why: "Users searching with 'buy' intent are 3x more likely to convert. This term appears in 12 queries with strong purchase signals.",
                        estimatedTime: "5 min",
                        impact: "High Impact",
                        category: "Conversion",
                      },
                      {
                        title: "Add supporting term 'supplements' to bullets",
                        description:
                          "Include 'supplements' in your bullet points to capture health-conscious shoppers searching for supplement products.",
                        why: "This category term helps AI engines understand your product type and improves categorization accuracy by 25%.",
                        estimatedTime: "5 min",
                        impact: "High Impact",
                        category: "Coverage",
                      },
                      {
                        title: "Improve product title with core search terms",
                        description:
                          "Restructure your product title to include the most important search terms in the first 80 characters.",
                        why: "Product titles are weighted 3x higher than descriptions in AI ranking algorithms. Optimizing your title could improve visibility by 40%.",
                        estimatedTime: "15 min",
                        impact: "Critical",
                        category: "SEO",
                      },
                      {
                        title: "Add more product images",
                        description:
                          "Upload at least 5 high-quality product images showing different angles, use cases, and lifestyle contexts.",
                        why: "Products with 5+ images have 30% higher conversion rates. AI engines also use image analysis to verify product claims and improve ranking confidence.",
                        estimatedTime: "30 min",
                        impact: "High Impact",
                        category: "Conversion",
                      },
                    ].map((task, index) => (
                      <Card
                        key={index}
                        className="p-6 border-2 border-border hover:border-teal-300 transition-colors bg-white"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-2">{task.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                task.impact === "Critical" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                              }
                            >
                              {task.impact}
                            </Badge>
                          </div>

                          <Card className="p-4 bg-teal-50 border-teal-200">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-semibold text-teal-900 mb-1">Why this matters:</p>
                                <p className="text-sm text-teal-800">{task.why}</p>
                              </div>
                            </div>
                          </Card>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4 text-sm">
                              <Badge variant="outline" className="bg-white">
                                {task.category}
                              </Badge>
                              <span className="text-muted-foreground">Est. Time: {task.estimatedTime}</span>
                            </div>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                              Let's do it
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 border-2 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold">Platform Performance</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border-l-4 border-l-green-500 bg-green-50/50">
                      <div className="flex items-start gap-4 mb-6">
                        <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">ChatGPT</h4>
                          <p className="text-sm text-muted-foreground">9 queries analyzed</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm">Avg Position</span>
                            <span className="font-bold text-green-600">#N/A</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span className="text-sm">Top 10 Visibility</span>
                            </div>
                            <span className="font-bold">0%</span>
                          </div>
                          <Progress
                            value={0}
                            className="h-1.5 bg-gray-200 rounded-full"
                            indicatorClassName="bg-gray-400"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Performance</span>
                            <span className="font-bold text-red-600">0.0/100</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-purple-500 bg-purple-50/50">
                      <div className="flex items-start gap-4 mb-6">
                        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">Perplexity</h4>
                          <p className="text-sm text-muted-foreground">10 queries analyzed</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm">Avg Position</span>
                            <span className="font-bold text-purple-600">#N/A</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span className="text-sm">Top 10 Visibility</span>
                            </div>
                            <span className="font-bold">0%</span>
                          </div>
                          <Progress
                            value={0}
                            className="h-1.5 bg-gray-200 rounded-full"
                            indicatorClassName="bg-gray-400"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Performance</span>
                            <span className="font-bold text-red-600">0.0/100</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-pink-500 bg-pink-50/50">
                      <div className="flex items-start gap-4 mb-6">
                        <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">Gemini</h4>
                          <p className="text-sm text-muted-foreground">14 queries analyzed</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm">Avg Position</span>
                            <span className="font-bold text-pink-600">#N/A</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span className="text-sm">Top 10 Visibility</span>
                            </div>
                            <span className="font-bold">0%</span>
                          </div>
                          <Progress
                            value={0}
                            className="h-1.5 bg-gray-200 rounded-full"
                            indicatorClassName="bg-gray-400"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Performance</span>
                            <span className="font-bold text-red-600">0.0/100</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-l-4 border-l-orange-500 bg-orange-50/50">
                      <div className="flex items-start gap-4 mb-6">
                        <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">Amazon</h4>
                          <p className="text-sm text-muted-foreground">No data</p>
                        </div>
                      </div>
                      <p className="text-sm text-center text-muted-foreground py-10">
                        No queries analyzed on this platform
                      </p>
                    </Card>
                  </div>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
