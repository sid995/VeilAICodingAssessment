"use client"

import { MoreVertical, BarChart3, Lightbulb, MessageSquare, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

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

interface ProductsTableProps {
  products: Product[]
  selectedProducts: string[]
  onSelectProduct: (productId: string) => void
  onSelectAll: (checked: boolean) => void
  onViewDetails: (product: Product) => void
}

export const ProductsTable = ({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onViewDetails,
}: ProductsTableProps) => {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 70) return "bg-[#E8F4F0] text-[#5D9B89] border-[#5D9B89]/20"
    if (score >= 50) return "bg-[#FEF3E2] text-[#D4A574] border-[#D4A574]/20"
    return "bg-[#EECBC2] text-[#DE7053] border-[#DE7053]/20"
  }

  return (
    <div className="border border-[#E3DED8] border-l-0 bg-white flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F6F3] border-b border-[#E3DED8] sticky top-0 z-10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 w-12 bg-[#F7F6F3]">
                <Checkbox
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">Product</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">ASIN</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">GEO Score</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">Visibility</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">Engines</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">Status</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 bg-[#F7F6F3]">Actions</th>
              <th className="text-left p-4 text-sm font-medium text-[#934F3C]/70 w-12 bg-[#F7F6F3]"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#E3DED8] hover:bg-[#F7F6F3]/50 transition-colors cursor-pointer group"
                onClick={() => onViewDetails(product)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => onSelectProduct(product.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F7F6F3] rounded overflow-hidden flex-shrink-0 border border-[#E3DED8]">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium line-clamp-2 text-[#1E1D1B] group-hover:text-[#FF7D55] transition-colors">
                        {product.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-[#934F3C]/70">{product.asin}</span>
                </td>
                <td className="p-4">
                  <Badge variant="secondary" className={`${getScoreBadgeColor(product.geoScore)} border font-medium`}>
                    {product.geoScore}
                  </Badge>
                </td>
                <td className="p-4">
                  {product.visibilityChange !== 0 && (
                    <div
                      className={`flex items-center gap-1.5 text-sm font-medium ${product.visibilityChange > 0 ? "text-[#5D9B89]" : "text-[#DE7053]"}`}
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
                        <Badge
                          key={engine}
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-[#E3DED8] text-[#1E1D1B]"
                        >
                          {engine}
                        </Badge>
                      ))}
                      {product.engines.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-[#E3DED8] text-[#1E1D1B]">
                          +{product.engines.length - 3}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-[#934F3C]/50">—</span>
                  )}
                </td>
                <td className="p-4">
                  {product.status === "tracked" && (
                    <Badge variant="secondary" className="bg-[#E8F4F0] text-[#5D9B89] border border-[#5D9B89]/20 text-xs">
                      Tracked
                    </Badge>
                  )}
                  {product.status === "untracked" && (
                    <Badge variant="secondary" className="bg-[#F7F6F3] text-[#934F3C]/70 border border-[#E3DED8] text-xs">
                      Untracked
                    </Badge>
                  )}
                  {product.status === "pending" && (
                    <Badge variant="secondary" className="bg-[#FEF3E2] text-[#D4A574] border border-[#D4A574]/20 text-xs">
                      Analyzing...
                    </Badge>
                  )}
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <Link href={`/visibility?productId=${product.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 gap-1 hover:bg-[#FF7D55]/10 hover:text-[#FF7D55]"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/recommendations?productId=${product.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 gap-1 relative hover:bg-[#FF7D55]/10 hover:text-[#FF7D55]"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        {product.recommendationsCount > 0 && (
                          <Badge
                            variant="secondary"
                            className="absolute -top-1 -right-1 h-4 px-1 text-[10px] bg-[#FF7D55] text-white border-0"
                          >
                            {product.recommendationsCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Link href={`/prompts?productId=${product.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 gap-1 hover:bg-[#FF7D55]/10 hover:text-[#FF7D55]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-[#FF7D55]/10 hover:text-[#FF7D55]"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-[#E3DED8]">
                      <DropdownMenuItem onClick={() => onViewDetails(product)}>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>View Recommendations</DropdownMenuItem>
                      <DropdownMenuItem className="text-[#DE7053]">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

