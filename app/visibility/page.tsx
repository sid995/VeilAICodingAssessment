"use client"

import { useState, useEffect, useMemo } from "react"
import { useLanguage } from "@/hooks/use-language"
import {
  competitorData,
  competitorDetails,
  mockProducts,
  platformVisibilityData,
  rankDistributionData,
  topCitedDomainsData,
  topCitedPagesData,
  trafficData,
  visibilityTrendsData,
} from "./data"
import { LlmTrafficEngagementCard } from "./components/llm-traffic-engagement-card"
import { VisibilityHeader } from "./components/visibility-header"
import { CompetitorAnalysisCard } from "./components/competitor-analysis-card"
import { PlatformVisibilityCard } from "./components/platform-visibility-card"
import { CitedContentCards } from "./components/cited-content-cards"
import { CompetitorLensSheet } from "./components/competitor-lens-sheet"
import { KeyMetricsCards } from "./components/key-metrics-cards"
import { OverviewHeader } from "./components/overview-header"

export default function VisibilityPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [engineFilter, setEngineFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState<"both" | "amazon" | "shopify">("both")
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["1", "2", "3"])
  const [competitorLensOpen, setCompetitorLensOpen] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [productPopoverOpen, setProductPopoverOpen] = useState(false)

  const [llmChartType, setLlmChartType] = useState<"line" | "bar">("line")
  const [llmMetric, setLlmMetric] = useState<"visibility" | "position">("visibility") // Removed "sentiment" option
  const [timeUntilNextRun, setTimeUntilNextRun] = useState({ days: 2, hours: 14, minutes: 32 }) // Added initial countdown values
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null)

  const [citationPage, setCitationPage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilNextRun((prev) => {
        let { days, hours, minutes } = prev

        if (minutes > 0) {
          minutes--
        } else if (hours > 0) {
          hours--
          minutes = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
        }

        return { days, hours, minutes }
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getFilteredMetrics = () => {
    let baseMetrics = {
      visibility: 4.3,
      visibilityChange: -3.1,
      promptsRun: 1247,
      totalQueries: 1500,
      promptsRunChange: 156,
      competitorShare: 26,
      shareChange: -1.5,
    }

    if (platformFilter === "amazon") {
      baseMetrics = {
        visibility: 4.7,
        visibilityChange: -3.4,
        promptsRun: 723,
        totalQueries: 900,
        promptsRunChange: 89,
        competitorShare: 28,
        shareChange: -2,
      }
    } else if (platformFilter === "shopify") {
      baseMetrics = {
        visibility: 3.9,
        visibilityChange: -2.8,
        promptsRun: 524,
        totalQueries: 600,
        promptsRunChange: 67,
        competitorShare: 24,
        shareChange: -1,
      }
    }

    const top3ProductIds = mockProducts.filter((p) => p.isTop3).map((p) => p.id)
    const isTop3Selected = selectedProducts.length === 3 && selectedProducts.every((id) => top3ProductIds.includes(id))

    if (isTop3Selected) {
      return {
        ...baseMetrics,
        visibility: baseMetrics.visibility + 0.5,
        promptsRun: Math.round(baseMetrics.promptsRun * 0.7),
        totalQueries: Math.round(baseMetrics.totalQueries * 0.7),
        competitorShare: baseMetrics.competitorShare - 3,
      }
    } else if (selectedProducts.length > 0) {
      return {
        ...baseMetrics,
        visibility: baseMetrics.visibility - 0.3,
        promptsRun: Math.round(baseMetrics.promptsRun * 1.2),
        totalQueries: Math.round(baseMetrics.totalQueries * 1.2),
        competitorShare: baseMetrics.competitorShare + 2,
      }
    }

    return baseMetrics
  }

  const metrics = getFilteredMetrics()

  const { totalAppearances, avgPosition } = useMemo(() => {
    let appearances = 0
    const positions: number[] = []

    trafficData.forEach((d) => {
      const isAmazonVisible = platformFilter === "both" || platformFilter === "amazon"
      const isShopifyVisible = platformFilter === "both" || platformFilter === "shopify"
      const isChatgptVisible = engineFilter === "all" || engineFilter === "chatgpt"
      const isGeminiVisible = engineFilter === "all" || engineFilter === "gemini"
      const isPerplexityVisible = engineFilter === "all" || engineFilter === "perplexity"

      if (isAmazonVisible) {
        if (isChatgptVisible) {
          appearances += d.chatgptAmazon || 0
          positions.push(d.chatgptAmazonPos || 0)
        }
        if (isGeminiVisible) {
          appearances += d.geminiAmazon || 0
          positions.push(d.geminiAmazonPos || 0)
        }
        if (isPerplexityVisible) {
          appearances += d.perplexityAmazon || 0
          positions.push(d.perplexityAmazonPos || 0)
        }
      }

      if (isShopifyVisible) {
        if (isChatgptVisible) {
          appearances += d.chatgptShopify || 0
          positions.push(d.chatgptShopifyPos || 0)
        }
        if (isGeminiVisible) {
          appearances += d.geminiShopify || 0
          positions.push(d.geminiShopifyPos || 0)
        }
        if (isPerplexityVisible) {
          appearances += d.perplexityShopify || 0
          positions.push(d.perplexityShopifyPos || 0)
        }
      }
    })

    const average = positions.length > 0 ? positions.reduce((a, b) => a + b, 0) / positions.length : 0
    return { totalAppearances: appearances, avgPosition: average }
  }, [trafficData, platformFilter, engineFilter])

  // Removed getDataKeys function as it's no longer needed

  const timeRangeLabelMap: Record<string, string> = {
    week: "Last week",
    "2weeks": "Last 2 weeks",
    month: "Last month",
    "3months": "Last 3 months",
    "6months": "Last 6 months",
  }
  const timeRangeLabel = timeRangeLabelMap[timeRange] ?? "Custom range"
  const productLabel =
    selectedProducts.length === 0
      ? "No products selected"
      : `${selectedProducts.length} ${selectedProducts.length === 1 ? "product" : "products"}`
  const platformLabel =
    platformFilter === "both" ? "Amazon + Shopify" : platformFilter === "amazon" ? "Amazon only" : "Shopify only"

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <VisibilityHeader
          productLabel={productLabel}
          timeRangeLabel={timeRangeLabel}
          platformLabel={platformLabel}
          productPopoverOpen={productPopoverOpen}
          setProductPopoverOpen={setProductPopoverOpen}
          selectedProducts={selectedProducts}
          mockProducts={mockProducts}
          toggleProduct={toggleProduct}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          engineFilter={engineFilter}
          setEngineFilter={setEngineFilter}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
        />

        <OverviewHeader metrics={metrics} />

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <KeyMetricsCards
            metrics={metrics}
            totalAppearances={totalAppearances}
            avgPosition={avgPosition}
            timeRange={timeRange}
            timeRangeLabel={timeRangeLabel}
            timeUntilNextRun={timeUntilNextRun}
            setTimeRange={setTimeRange}
            engineFilter={engineFilter}
            setEngineFilter={setEngineFilter}
            platformFilter={platformFilter}
            setPlatformFilter={setPlatformFilter}
          />

          {/* LLM Traffic & Engagement - takes 2/3 width with accent top bar */}
          <LlmTrafficEngagementCard
            llmMetric={llmMetric}
            setLlmMetric={setLlmMetric}
            llmChartType={llmChartType}
            setLlmChartType={setLlmChartType}
            trafficData={trafficData}
            totalAppearances={totalAppearances}
            avgPosition={avgPosition}
            metrics={metrics}
            platformFilter={platformFilter}
            engineFilter={engineFilter}
            hoveredLegend={hoveredLegend}
            setHoveredLegend={setHoveredLegend}
          />

          <CompetitorAnalysisCard
            competitorData={competitorData}
            visibilityTrendsData={visibilityTrendsData}
            setSelectedCompetitor={setSelectedCompetitor}
            setCompetitorLensOpen={setCompetitorLensOpen}
          />

          <PlatformVisibilityCard platformVisibilityData={platformVisibilityData} />

          <CitedContentCards
            topCitedDomainsData={topCitedDomainsData}
            topCitedPagesData={topCitedPagesData}
            citationPage={citationPage}
            setCitationPage={setCitationPage}
          />
        </div>
      </div>

      {/* Competitor Lens Sheet */}
      <CompetitorLensSheet
        competitorLensOpen={competitorLensOpen}
        setCompetitorLensOpen={setCompetitorLensOpen}
        selectedCompetitor={selectedCompetitor}
        competitorDetails={competitorDetails}
      />
    </div>
  )
}
