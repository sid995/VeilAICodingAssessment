import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Mock scores data
  const scores = [
    {
      id: "score_1",
      asin: "B0FD16J243",
      total_score: 62,
      seo_score: 65,
      geo_score: 62,
      conversion_score: 59,
      grade: "C+",
      created_at: "2025-10-17T00:00:00Z",
    },
  ]

  return NextResponse.json({
    items: scores,
    total: scores.length,
    page,
    limit,
    total_pages: Math.ceil(scores.length / limit),
  })
}
