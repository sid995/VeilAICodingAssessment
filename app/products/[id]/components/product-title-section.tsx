import type { Product, ProductVersion } from "../types"

interface ProductTitleSectionProps {
  product: Product
  selectedVersion: ProductVersion
}

export function ProductTitleSection({ product, selectedVersion }: ProductTitleSectionProps) {
  return (
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
  )
}

