export interface ProductVersion {
  date: string
  geoScore: number
  visibilityChange: number
  snapshot: {
    title: string
    description: string
    bulletPoints: string[]
    images: number
  }
}

export interface Product {
  id: string
  asin: string
  title: string
  image: string
  geoScore: number
  lastRun: string
  status: "tracked" | "untracked" | "pending" | "error"
  tracked: boolean
  visibilityChange: number
  visibilityTrend: number[]
  engines: string[]
  category: string
  brand: string
  recommendationsCount: number
  versions: ProductVersion[]
}

export interface Competitor {
  rank: number
  brand: string
  domain: string
  isYou?: boolean
  visibility: number
  visibilityTrend: number
  sentiment: number
  sentimentTrend: number
  avgPosition: number
}

export interface Query {
  id: string
  query: string
  position: number
  engine: string
  snippetId: string
}

export interface Recommendation {
  id: string
  title: string
  impact: "High" | "Medium" | "Low"
  snippetId: string
}

export interface EngineDistribution {
  name: string
  value: number
  fill: string
}

export interface ScoreData {
  date: string
  score: number
}

export interface VisibilityTrendData {
  date: string
  Vivora: number
  Trideer: number
  "Your Brand": number
  URBNFit: number
  "Live Infinitely": number
}

