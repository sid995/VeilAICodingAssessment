import { ArrowLeft, TrendingUp, Eye, Lightbulb, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "../types"

interface UntrackedProductViewProps {
  product: Product
  onBack: () => void
  onTrackProduct: () => void
}

export function UntrackedProductView({ product, onBack, onTrackProduct }: UntrackedProductViewProps) {
  return (
    <div className="h-full bg-gradient-to-br from-[#FEFDFB] to-[#F7F6F3] overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6 p-6 pb-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-[#1E1D1B]">{product.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-[#934F3C]/70">
            <span className="font-medium">Product ID: {product.asin}</span>
            <span>·</span>
            <span>Amazon/Shopify</span>
            <span>·</span>
            <Badge variant="secondary" className="bg-[#E3DED8] text-[#934F3C]">
              Untracked
            </Badge>
          </div>
        </div>

        <Card className="border-2 border-[#E3DED8] shadow-lg">
          <CardContent className="p-10">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Product Image with enhanced styling */}
              <div className="w-full max-w-lg h-80 bg-gradient-to-br from-[#F7F6F3] to-[#FCBBA9]/20 rounded-2xl overflow-hidden border-2 border-[#E3DED8] shadow-md">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3 max-w-xl">
                <h2 className="text-2xl font-bold text-[#1E1D1B]">{product.title}</h2>
                <div className="flex items-center justify-center gap-4 text-base">
                  <span className="px-3 py-1 bg-[#FCBBA9]/30 text-[#B86048] rounded-full font-medium">
                    {product.brand}
                  </span>
                  <span className="px-3 py-1 bg-[#F0A490]/30 text-[#934F3C] rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Features Grid */}
              <div className="w-full max-w-xl grid grid-cols-2 gap-4 py-6">
                <div className="flex items-center gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E3DED8]">
                  <div className="p-2 bg-[#FCBBA9]/30 rounded-lg">
                    <Eye className="w-5 h-5 text-[#FF7D55]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-[#934F3C]/70">Visibility</div>
                    <div className="text-sm font-semibold text-[#1E1D1B]">Analytics</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E3DED8]">
                  <div className="p-2 bg-[#FCBBA9]/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-[#FF7D55]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-[#934F3C]/70">Performance</div>
                    <div className="text-sm font-semibold text-[#1E1D1B]">Tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E3DED8]">
                  <div className="p-2 bg-[#FCBBA9]/30 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-[#FF7D55]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-[#934F3C]/70">Smart</div>
                    <div className="text-sm font-semibold text-[#1E1D1B]">Recommendations</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F7F6F3] rounded-xl border border-[#E3DED8]">
                  <div className="p-2 bg-[#FCBBA9]/30 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-[#FF7D55]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-[#934F3C]/70">Version</div>
                    <div className="text-sm font-semibold text-[#1E1D1B]">History</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-4 max-w-xl w-full">
                <div className="p-6 bg-gradient-to-br from-[#FCBBA9]/20 to-[#F0A490]/20 rounded-2xl border-2 border-[#FCBBA9]/40">
                  <p className="text-[#934F3C] leading-relaxed">
                    <strong className="text-[#1E1D1B]">Start tracking this product</strong> to unlock detailed AI
                    visibility analytics, competitor insights, query performance, actionable recommendations, and
                    complete version history.
                  </p>
                </div>
                <Button
                  onClick={onTrackProduct}
                  size="lg"
                  className="w-full bg-[#FF7D55] hover:bg-[#FB7D5C] text-white font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Track Product
                </Button>
                <p className="text-xs text-[#934F3C]/60">
                  Get instant access to analytics, insights, and recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

