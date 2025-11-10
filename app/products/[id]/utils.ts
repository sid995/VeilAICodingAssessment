import type { Product, ProductVersion } from "./types"

export const getScoreBadgeColor = (score: number): string => {
  if (score >= 70) return "bg-[#EECBC2] text-[#B86048]"
  if (score >= 50) return "bg-[#FCBBA9]/30 text-[#934F3C]"
  return "bg-[#DE7053]/20 text-[#934F3C]"
}

export const getDefaultVersion = (product: Product): ProductVersion => ({
  date: product.lastRun,
  geoScore: product.geoScore,
  visibilityChange: product.visibilityChange,
  snapshot: {
    title: product.title,
    description: `${product.brand} ${product.category} product`,
    bulletPoints: ["Product information not yet available"],
    images: 1,
  },
})

