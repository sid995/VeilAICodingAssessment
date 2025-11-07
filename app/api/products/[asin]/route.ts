import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { asin: string } }) {
  const { asin } = params

  // Mock product detail
  const product = {
    asin,
    marketplace: "COM",
    title: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    brand: "Gaiam",
    price: 79.99,
    currency: "USD",
    bullet_points: [
      "Balance Ball Chair - Our high-quality non-rolling balance chair",
      "Promotes Healthy Posture - The ergonomic design",
      "Improves Focus & Energy - Great for increasing productivity",
    ],
    description: "Complete product description here",
    specifications: {
      manufacturer: "Fit For Life",
      brand: "Gaiam",
      item_weight: "10 pounds",
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
    ],
    videos: [],
    variant_asins: ["B0FD16J243"],
    category_path: ["Sports & Outdoors", "Exercise & Fitness", "Balance Trainers"],
    availability: "In Stock",
    rating: 3.7,
    total_reviews: 83,
    storefront_id: "store_1",
    scraped_at: "2025-10-17T00:00:00Z",
  }

  return NextResponse.json(product)
}
