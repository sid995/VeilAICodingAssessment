import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Mock products data
  const products = [
    {
      asin: "B0FD16J243",
      marketplace: "COM",
      title: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
      brand: "Gaiam",
      price: 79.99,
      currency: "USD",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-17%20at%204.01.35%E2%80%AFPM-2ytcIpX7QFH9PfkXywCyvmmtwajvFQ.png",
      ],
      rating: 3.7,
      total_reviews: 83,
      storefront_id: "store_1",
      scraped_at: "2025-10-17T00:00:00Z",
    },
    // Add more mock products as needed
  ]

  return NextResponse.json({
    items: products,
    total: products.length,
    page,
    limit,
    total_pages: Math.ceil(products.length / limit),
  })
}
