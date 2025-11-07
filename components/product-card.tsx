"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"

interface Product {
  id: string
  asin: string
  title: string
  image: string
  geoScore: number
  lastRun: string
  status: "preliminary" | "querying" | "scoring" | "completed"
}

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { t } = useLanguage()

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      onClick={onViewDetails}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div />
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
            {t(product.status.charAt(0).toUpperCase() + product.status.slice(1))}
          </Badge>
        </div>

        <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="mb-3">
          <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs mb-2">
            {t("geoScore")}
            <span className="ml-1 font-medium">{product.geoScore}</span>
          </Badge>
          <div className="text-3xl font-semibold text-teal-600 mb-1">{product.geoScore}</div>
          <div className="text-xs text-muted-foreground">
            {t("lastRun")}: {product.lastRun}
          </div>
        </div>

        <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.title}</h3>

        <div className="text-xs text-muted-foreground mb-4">
          <span className="font-medium">{t("asin")}:</span> {product.asin}
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 ml-2 text-xs"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  )
}
