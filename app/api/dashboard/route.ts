import { NextResponse } from "next/server"

export async function GET() {
  // Mock dashboard stats
  const stats = {
    totalProducts: 7,
    queried: 1,
    scored: 0,
    avgScore: 0,
    inCatalog: 7,
    withQueries: 14,
    analyzed: 0,
  }

  return NextResponse.json(stats)
}
