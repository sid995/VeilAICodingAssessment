import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { asin: string } }) {
  const { asin } = params

  // Mock score detail
  const score = {
    id: "score_1",
    asin,
    total_score: 62,
    seo_score: 65,
    geo_score: 62,
    conversion_score: 59,
    grade: "C+",
    item_scores: {
      title_quality: 70,
      image_quality: 80,
      description_completeness: 50,
    },
    recommendations: {
      improve_title: "Add more relevant keywords",
      add_images: "Include lifestyle images",
    },
    missing_fields: {
      enhanced_content: true,
      video: true,
    },
    created_at: "2025-10-17T00:00:00Z",
  }

  return NextResponse.json(score)
}

export async function POST(request: Request, { params }: { params: { asin: string } }) {
  const { asin } = params
  const { searchParams } = new URL(request.url)
  const storefrontId = searchParams.get("storefront_id")

  // Mock score generation
  const newScore = {
    id: `score_${Date.now()}`,
    asin,
    total_score: Math.floor(Math.random() * 40) + 60,
    seo_score: Math.floor(Math.random() * 40) + 60,
    geo_score: Math.floor(Math.random() * 40) + 60,
    conversion_score: Math.floor(Math.random() * 40) + 60,
    grade: "B",
    created_at: new Date().toISOString(),
  }

  return NextResponse.json(newScore)
}
