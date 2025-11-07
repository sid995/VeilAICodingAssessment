"use client"

// React hooks for API calls with SWR

import useSWR, { type SWRConfiguration } from "swr"
import { apiClient } from "./client"
import type {
  Storefront,
  JobListParams,
  ScrapedStorefront,
  Category,
  CategoryListParams,
  ProductSnippetListParams,
  DetailedProduct,
  DetailedProductListParams,
  PreliminaryScore,
  PreliminaryScoreListParams,
} from "./types"

// ===== Storefronts =====
export function useStorefronts(config?: SWRConfiguration) {
  return useSWR<Storefront[]>("/api/storefronts", () => apiClient.listStorefronts(), config)
}

export function useStorefront(id: string | null, config?: SWRConfiguration) {
  return useSWR<Storefront>(
    id ? `/api/storefronts/${id}` : null,
    () => (id ? apiClient.getStorefront(id) : null),
    config,
  )
}

// ===== Jobs =====
export function useJobs(params?: JobListParams, config?: SWRConfiguration) {
  const key = params ? `/api/jobs?${JSON.stringify(params)}` : "/api/jobs"
  return useSWR(key, () => apiClient.listJobs(params), config)
}

export function useJob(jobId: string | null, config?: SWRConfiguration) {
  return useSWR(jobId ? `/api/jobs/${jobId}` : null, () => (jobId ? apiClient.getJob(jobId) : null), config)
}

// ===== Scraped Data =====
export function useScrapedStorefronts(config?: SWRConfiguration) {
  return useSWR<ScrapedStorefront[]>("/api/data/amazon/storefronts", () => apiClient.listScrapedStorefronts(), config)
}

export function useScrapedStorefront(storefrontId: string | null, config?: SWRConfiguration) {
  return useSWR<ScrapedStorefront>(
    storefrontId ? `/api/data/amazon/storefronts/${storefrontId}` : null,
    () => (storefrontId ? apiClient.getScrapedStorefront(storefrontId) : null),
    config,
  )
}

export function useCategories(params?: CategoryListParams, config?: SWRConfiguration) {
  const key = params ? `/api/data/amazon/categories?${JSON.stringify(params)}` : null
  return useSWR<Category[]>(key, () => apiClient.listCategories(params), config)
}

export function useProductSnippets(params?: ProductSnippetListParams, config?: SWRConfiguration) {
  const key = params
    ? `/api/data/amazon/products/snippets?${JSON.stringify(params)}`
    : "/api/data/amazon/products/snippets"
  return useSWR(key, () => apiClient.listProductSnippets(params), config)
}

export function useDetailedProducts(params?: DetailedProductListParams, config?: SWRConfiguration) {
  const key = params
    ? `/api/data/amazon/products/detailed?${JSON.stringify(params)}`
    : "/api/data/amazon/products/detailed"
  return useSWR(key, () => apiClient.listDetailedProducts(params), config)
}

export function useDetailedProduct(asin: string | null, config?: SWRConfiguration) {
  return useSWR<DetailedProduct>(
    asin ? `/api/data/amazon/products/detailed/${asin}` : null,
    () => (asin ? apiClient.getDetailedProduct(asin) : null),
    config,
  )
}

// ===== Preliminary Scores =====
export function usePreliminaryScore(asin: string | null, config?: SWRConfiguration) {
  return useSWR<PreliminaryScore>(
    asin ? `/api/preliminary-score/${asin}` : null,
    () => (asin ? apiClient.getPreliminaryScore(asin) : null),
    config,
  )
}

export function usePreliminaryScores(params?: PreliminaryScoreListParams, config?: SWRConfiguration) {
  const key = params ? `/api/preliminary-scores?${JSON.stringify(params)}` : "/api/preliminary-scores"
  return useSWR(key, () => apiClient.listPreliminaryScoresPaginated(params), config)
}
