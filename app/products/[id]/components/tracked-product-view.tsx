"use client"

import { useState } from "react"
import type { Product } from "../types"
import { getDefaultVersion } from "../utils"
import {
  competitorData,
  visibilityTrendsData,
  competitorColors,
  engineDistributionData,
  scoreOverTimeData,
  mockQueries,
  mockRecommendations,
} from "../data"
import { ProductHeader } from "./product-header"
import { ProductTitleSection } from "./product-title-section"
import { ProductInfoCard } from "./product-info-card"
import { ProductAnalysisCard } from "./product-analysis-card"
import { EngineDistributionChart } from "./engine-distribution-chart"
import { ScoreChart } from "./score-chart"
import { QueriesTable } from "./queries-table"
import { RecommendationsTable } from "./recommendations-table"

interface TrackedProductViewProps {
  product: Product
  onBack: () => void
}

export function TrackedProductView({ product, onBack }: TrackedProductViewProps) {
  const versions = product.versions.length > 0 ? product.versions : [getDefaultVersion(product)]
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0)
  const selectedVersion = versions[selectedVersionIndex]

  return (
    <div className="h-full bg-background overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-4 p-4 pb-8">
        <ProductHeader
          versions={versions}
          selectedVersionIndex={selectedVersionIndex}
          onVersionChange={setSelectedVersionIndex}
          onBack={onBack}
        />

        <ProductTitleSection product={product} selectedVersion={selectedVersion} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProductInfoCard product={product} selectedVersion={selectedVersion} />
          <ProductAnalysisCard
            selectedVersion={selectedVersion}
            competitorData={competitorData}
            visibilityTrendsData={visibilityTrendsData}
            competitorColors={competitorColors}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EngineDistributionChart engineDistribution={engineDistributionData} />
          <ScoreChart scoreData={scoreOverTimeData} />
        </div>

        {product.tracked && (
          <>
            <QueriesTable queries={mockQueries} productTitle={product.title} />
            <RecommendationsTable
              recommendations={mockRecommendations}
              productTitle={product.title}
              recommendationsCount={product.recommendationsCount}
            />
          </>
        )}
      </div>
    </div>
  )
}

