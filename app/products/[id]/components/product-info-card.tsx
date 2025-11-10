import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product, ProductVersion } from "../types"
import { getScoreBadgeColor } from "../utils"

interface ProductInfoCardProps {
  product: Product
  selectedVersion: ProductVersion
}

export function ProductInfoCard({ product, selectedVersion }: ProductInfoCardProps) {
  return (
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
            In future, this card would be available at amazon/brand/semaine/shopify/productid for public, so for now
            extract this with the semantic data
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

