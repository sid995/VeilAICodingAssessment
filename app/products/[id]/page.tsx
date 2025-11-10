"use client"

import { useParams, useRouter } from "next/navigation"
import { mockProducts } from "./data"
import { ProductNotFound } from "./components/product-not-found"
import { UntrackedProductView } from "./components/untracked-product-view"
import { TrackedProductView } from "./components/tracked-product-view"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string

  const product = mockProducts.find((p) => p.id === productId)

  const handleTrackProduct = () => {
    alert(`Product "${product?.title}" will be tracked. Redirecting to products page...`)
    router.push("/products")
  }

  if (!product) {
    return <ProductNotFound onBack={() => router.back()} />
  }

  if (!product.tracked) {
    return (
      <UntrackedProductView product={product} onBack={() => router.back()} onTrackProduct={handleTrackProduct} />
    )
  }

  return <TrackedProductView product={product} onBack={() => router.back()} />
}
