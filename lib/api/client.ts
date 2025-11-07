// Veil AI - API Client

import type {
  User,
  SyncUserRequest,
  Storefront,
  CreateStorefrontRequest,
  CreateAndScrapeResponse,
  Job,
  CreateJobRequest,
  JobListParams,
  JobListResponse,
  JobWithTasks,
  ScrapedStorefront,
  Category,
  CategoryListParams,
  ProductSnippet,
  ProductSnippetListParams,
  ProductSnippetListResponse,
  DetailedProduct,
  DetailedProductListParams,
  DetailedProductListResponse,
  GenerateQueriesRequest,
  GenerateQueriesResponse,
  AnalyzeImageRequest,
  ImageAnalysisResponse,
  PreliminaryScore,
  PreliminaryScoreListParams,
  PreliminaryScoreListResponse,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error" }))
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // ===== Authentication =====
  async healthCheck(): Promise<{ status: string }> {
    return this.request("/api/auth/health")
  }

  async syncUser(data: SyncUserRequest): Promise<User> {
    return this.request("/api/auth/sync-user", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getCurrentUser(): Promise<User> {
    return this.request("/api/auth/me")
  }

  // ===== Storefronts =====
  async listStorefronts(): Promise<Storefront[]> {
    return this.request("/api/storefronts")
  }

  async getStorefront(id: string): Promise<Storefront> {
    return this.request(`/api/storefronts/${id}`)
  }

  async createStorefront(data: CreateStorefrontRequest): Promise<Storefront> {
    return this.request("/api/storefronts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async createAndScrapeStorefront(data: CreateStorefrontRequest): Promise<CreateAndScrapeResponse> {
    return this.request("/api/storefronts/create-and-scrape", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async setPrimaryStorefront(id: string): Promise<Storefront> {
    return this.request(`/api/storefronts/${id}/set-primary`, {
      method: "PATCH",
    })
  }

  async archiveStorefront(id: string): Promise<{ message: string }> {
    return this.request(`/api/storefronts/${id}`, {
      method: "DELETE",
    })
  }

  // ===== Jobs =====
  async createJob(data: CreateJobRequest): Promise<Job> {
    return this.request("/api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async listJobs(params?: JobListParams): Promise<JobListResponse> {
    const queryParams = new URLSearchParams()
    if (params?.storefront_id) queryParams.set("storefront_id", params.storefront_id)
    if (params?.job_type_id) queryParams.set("job_type_id", params.job_type_id)
    if (params?.status) queryParams.set("status", params.status)
    if (params?.page) queryParams.set("page", params.page.toString())
    if (params?.limit) queryParams.set("limit", params.limit.toString())

    const query = queryParams.toString()
    return this.request(`/api/jobs${query ? `?${query}` : ""}`)
  }

  async getJob(jobId: string): Promise<JobWithTasks> {
    return this.request(`/api/jobs/${jobId}`)
  }

  async cancelJob(jobId: string): Promise<Job> {
    return this.request(`/api/jobs/${jobId}/cancel`, {
      method: "POST",
    })
  }

  async pauseJob(jobId: string): Promise<Job> {
    return this.request(`/api/jobs/${jobId}/pause`, {
      method: "POST",
    })
  }

  async resumeJob(jobId: string): Promise<Job> {
    return this.request(`/api/jobs/${jobId}/resume`, {
      method: "POST",
    })
  }

  async retryJob(jobId: string): Promise<Job> {
    return this.request(`/api/jobs/${jobId}/retry`, {
      method: "POST",
    })
  }

  // ===== Scraped Data =====
  async listScrapedStorefronts(): Promise<ScrapedStorefront[]> {
    return this.request("/api/data/amazon/storefronts")
  }

  async getScrapedStorefront(storefrontId: string): Promise<ScrapedStorefront> {
    return this.request(`/api/data/amazon/storefronts/${storefrontId}`)
  }

  async listCategories(params?: CategoryListParams): Promise<Category[]> {
    const queryParams = new URLSearchParams()
    if (params?.storefront_id) queryParams.set("storefront_id", params.storefront_id)
    if (params?.parent_id) queryParams.set("parent_id", params.parent_id)
    if (params?.level !== undefined) queryParams.set("level", params.level.toString())

    const query = queryParams.toString()
    return this.request(`/api/data/amazon/categories${query ? `?${query}` : ""}`)
  }

  async getCategory(categoryId: string): Promise<Category> {
    return this.request(`/api/data/amazon/categories/${categoryId}`)
  }

  async listProductSnippets(params?: ProductSnippetListParams): Promise<ProductSnippetListResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set("page", params.page.toString())
    if (params?.limit) queryParams.set("limit", params.limit.toString())
    if (params?.storefront_id) queryParams.set("storefront_id", params.storefront_id)
    if (params?.category_id) queryParams.set("category_id", params.category_id)

    const query = queryParams.toString()
    return this.request(`/api/data/amazon/products/snippets${query ? `?${query}` : ""}`)
  }

  async getProductSnippet(asin: string): Promise<ProductSnippet> {
    return this.request(`/api/data/amazon/products/snippets/${asin}`)
  }

  async listDetailedProducts(params?: DetailedProductListParams): Promise<DetailedProductListResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set("page", params.page.toString())
    if (params?.limit) queryParams.set("limit", params.limit.toString())
    if (params?.storefront_id) queryParams.set("storefront_id", params.storefront_id)

    const query = queryParams.toString()
    return this.request(`/api/data/amazon/products/detailed${query ? `?${query}` : ""}`)
  }

  async getDetailedProduct(asin: string): Promise<DetailedProduct> {
    return this.request(`/api/data/amazon/products/detailed/${asin}`)
  }

  // ===== AI Features =====
  async generateQueries(data: GenerateQueriesRequest): Promise<GenerateQueriesResponse> {
    return this.request("/api/ai/querying/generate", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getQueryJob(jobId: string): Promise<GenerateQueriesResponse> {
    return this.request(`/api/ai/querying/jobs/${jobId}`)
  }

  async listQueryJobs(): Promise<GenerateQueriesResponse[]> {
    return this.request("/api/ai/querying/jobs")
  }

  async analyzeImage(data: AnalyzeImageRequest): Promise<ImageAnalysisResponse> {
    return this.request("/api/ai/imaging/analyze", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getImageJob(jobId: string): Promise<ImageAnalysisResponse> {
    return this.request(`/api/ai/imaging/jobs/${jobId}`)
  }

  async listImageJobs(): Promise<ImageAnalysisResponse[]> {
    return this.request("/api/ai/imaging/jobs")
  }

  async getCachedImageAnalysis(asin: string): Promise<ImageAnalysisResponse> {
    return this.request(`/api/ai/imaging/product/${asin}`)
  }

  async generatePreliminaryScore(asin: string, storefrontId: string): Promise<PreliminaryScore> {
    return this.request(`/api/preliminary-score/${asin}?storefront_id=${storefrontId}`, {
      method: "POST",
    })
  }

  async getPreliminaryScore(asin: string): Promise<PreliminaryScore> {
    return this.request(`/api/preliminary-score/${asin}`)
  }

  async listPreliminaryScores(params?: PreliminaryScoreListParams): Promise<PreliminaryScore[]> {
    const queryParams = new URLSearchParams()
    if (params?.storefront_id) queryParams.set("storefront_id", params.storefront_id)
    if (params?.limit) queryParams.set("limit", params.limit.toString())
    if (params?.offset) queryParams.set("offset", params.offset.toString())

    const query = queryParams.toString()
    return this.request(`/api/preliminary-score${query ? `?${query}` : ""}`)
  }

  async listPreliminaryScoresPaginated(params?: PreliminaryScoreListParams): Promise<PreliminaryScoreListResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set("page", params.page.toString())
    if (params?.limit) queryParams.set("limit", params.limit.toString())
    if (params?.asin) queryParams.set("asin", params.asin)

    const query = queryParams.toString()
    return this.request(`/api/preliminary-scores${query ? `?${query}` : ""}`)
  }

  async getPreliminaryScoreById(scoreId: string): Promise<PreliminaryScore> {
    return this.request(`/api/preliminary-scores/${scoreId}`)
  }

  // ===== WebSocket =====
  connectToJobWebSocket(jobId: string): WebSocket {
    const wsUrl = this.baseUrl.replace("http", "ws")
    return new WebSocket(`${wsUrl}/api/scraper/ws/jobs/${jobId}`)
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export class for custom instances
export { ApiClient }
