// Veil AI - TypeScript Types for Backend API

// ===== Core Types =====
export type Marketplace =
  | "COM"
  | "UK"
  | "CA"
  | "DE"
  | "FR"
  | "IT"
  | "ES"
  | "JP"
  | "IN"
  | "AU"
  | "BR"
  | "MX"
  | "NL"
  | "SE"
  | "PL"
  | "TR"
  | "SG"
  | "AE"
  | "SA"

export type JobStatus = "PENDING" | "RUNNING" | "PAUSED" | "COMPLETED" | "FAILED" | "CANCELLED"

export type TaskStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "PENDING_RETRY"

export type JobType =
  | "extraction_top_products"
  | "extraction_full_crawl"
  | "querying_generate_queries"
  | "scoring_preliminary"

export type ScoreGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D+" | "D" | "F"

// ===== Authentication =====
export interface User {
  id: string
  email: string
  name: string | null
  picture: string | null
  created_at: string
}

export interface SyncUserRequest {
  id: string
  email: string
  name: string | null
  picture: string | null
}

// ===== Storefronts =====
export interface Storefront {
  id: string
  user_id: string
  store_name: string
  storefront_url: string
  marketplace: Marketplace
  status: string
  is_primary: boolean
  scraped_storefront_id: string | null
  created_at: string
  updated_at: string
}

export interface CreateStorefrontRequest {
  store_name: string
  storefront_url: string
}

export interface CreateAndScrapeResponse {
  job_id: string
  user_storefront_id: string
  marketplace: Marketplace
  status: "PENDING"
  message: string
}

// ===== Jobs =====
export interface JobConfig {
  // For extraction_top_products
  max_products?: number
  parallel_workers?: number
  timeout_seconds?: number
  max_retries?: number
  // For extraction_full_crawl
  max_category_depth?: number
  products_per_category?: number
  discover_variants?: boolean
  freshness_days?: number
  // For querying
  asin?: string
  total_queries?: number
  // For scoring
  freshness_hours?: number
}

export interface Job {
  id: string
  job_type_id: JobType
  job_type_display_name: string
  user_id: string
  storefront_id: string
  config: JobConfig
  status: JobStatus
  total_tasks: number
  completed_tasks: number
  failed_tasks: number
  progress_percentage: number
  progress_metrics: Record<string, any>
  error_message: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
  updated_at: string
}

export interface CreateJobRequest {
  job_type_id: JobType
  storefront_id: string
  config: JobConfig
}

export interface JobListParams {
  storefront_id?: string
  job_type_id?: JobType
  status?: JobStatus
  page?: number
  limit?: number
}

export interface JobListResponse {
  jobs: Job[]
  total: number
  page: number
  limit: number
}

export interface Task {
  id: string
  task_type_id: string
  task_type_display_name: string
  status: TaskStatus
  priority: number
  attempt_count: number
  error_message: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
}

export interface JobWithTasks extends Job {
  tasks: Task[]
}

// ===== Scraped Data =====
export interface ScrapedStorefront {
  id: string
  storefront_id: string
  marketplace: Marketplace
  store_name: string
  store_url: string
  description: string | null
  logo_url: string | null
  banner_url: string | null
  rating: number | null
  total_reviews: number | null
  categories: Record<string, any>
  featured_products: Record<string, any>
  scraped_at: string
}

export interface Category {
  id: string
  category_id: string
  storefront_id: string
  category_name: string
  category_url: string
  parent_id: string | null
  depth_level: number
  product_count: number | null
  subcategory_ids: string[]
  is_navigation_page: boolean
  scraped_at: string
}

export interface CategoryListParams {
  storefront_id?: string
  parent_id?: string
  level?: number
}

export interface ProductSnippet {
  asin: string
  marketplace: Marketplace
  title: string
  price: number | null
  currency: string | null
  rating: number | null
  review_count: number | null
  image_url: string | null
  product_url: string
  storefront_id: string | null
  category_id: string | null
  scraped_at: string
}

export interface ProductSnippetListParams {
  page?: number
  limit?: number
  storefront_id?: string
  category_id?: string
}

export interface ProductSnippetListResponse {
  items: ProductSnippet[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface DetailedProduct {
  asin: string
  marketplace: Marketplace
  title: string
  brand: string | null
  price: number | null
  currency: string | null
  bullet_points: string[]
  description: string | null
  specifications: Record<string, any>
  images: string[]
  videos: string[]
  variant_asins: string[]
  category_path: string[]
  availability: string | null
  seller_info: Record<string, any>
  dimensions: Record<string, any>
  weight: number | null
  family_id: string | null
  storefront_id: string | null
  scraped_at: string
}

export interface DetailedProductListParams {
  page?: number
  limit?: number
  storefront_id?: string
}

export interface DetailedProductListResponse {
  items: DetailedProduct[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// ===== AI Features =====
export interface GenerateQueriesRequest {
  asin: string
  total_queries?: number
}

export interface Query {
  query: string
  who_role: string
  who_geo: string
  who_price_quality: string
  what_keywords: string
  what_tone: string
  when_temporal: string
  where_platform: string
}

export interface GenerateQueriesResponse {
  job_id: string
  product_asin: string
  total_generated: number
  queries: Query[]
}

export interface AnalyzeImageRequest {
  asin: string
  force_reanalysis?: boolean
}

export interface ColorSwatch {
  hex: string
  share: number
}

export interface ImageAnalysisResponse {
  job_id: string
  product_asin: string
  image_url: string
  palettes: {
    overall: ColorSwatch[]
    design_only: ColorSwatch[]
    skin_only: ColorSwatch[]
  }
  palette_families: string[]
  human: {
    present: boolean
    pixel_share: number
    skin_swatches: ColorSwatch[]
  }
  visual_motifs: string[]
  motifs_by_category: {
    objects: string[]
    actions: string[]
    settings: string[]
    aesthetic: string[]
  }
}

export interface PreliminaryScore {
  id: string
  asin: string
  total_score: number
  seo_score: number
  geo_score: number
  conversion_score: number
  grade: ScoreGrade
  item_scores: Record<string, any>
  recommendations: Record<string, any>
  missing_fields: Record<string, any>
  created_at: string
}

export interface PreliminaryScoreListParams {
  storefront_id?: string
  limit?: number
  offset?: number
  page?: number
  asin?: string
}

export interface PreliminaryScoreListResponse {
  items: PreliminaryScore[]
  total: number
  page: number
  limit: number
  total_pages: number
}

// ===== WebSocket =====
export interface WebSocketEvent {
  event: "connected" | "progress" | "state_changed" | "heartbeat"
  job_id: string
  storefront_id: string | null
  timestamp: string
  progress?: {
    percentage: number
    products_discovered: number
    products_completed: number
    categories_discovered: number
    tasks_completed: number
    tasks_total: number
  }
  data?: {
    status: JobStatus
    old_status: JobStatus
  }
}

export interface WebSocketCommand {
  command: "pause" | "cancel" | "get_status"
}

// ===== Error Response =====
export interface ErrorResponse {
  detail: string
}
