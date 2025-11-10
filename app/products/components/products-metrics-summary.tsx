"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown, Activity, Package } from "lucide-react"

interface ProductsMetricsSummaryProps {
  trackedCount: number
  totalCount: number
  avgGeoScore: number
  avgVisibilityChange: number
  lastScanDate: string
}

export const ProductsMetricsSummary = ({
  trackedCount,
  totalCount,
  avgGeoScore,
  avgVisibilityChange,
  lastScanDate,
}: ProductsMetricsSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return { bg: "bg-[#E8F4F0]/40", icon: "bg-[#5D9B89]/15", text: "text-[#5D9B89]" }
    if (score >= 50) return { bg: "bg-[#FEF3E2]/40", icon: "bg-[#D4A574]/15", text: "text-[#D4A574]" }
    return { bg: "bg-[#EECBC2]/30", icon: "bg-[#DE7053]/15", text: "text-[#DE7053]" }
  }

  const scoreColors = getScoreColor(avgGeoScore)

  return (
    <div className="px-6 py-4 border-b border-[#E3DED8]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tracked Products Card */}
        <Card className="bg-[#E6F0F9]/40 border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#5B8BB8]/15 flex items-center justify-center">
                  <Package className="h-4 w-4 text-[#5B8BB8]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Products</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-[#5B8BB8]/10 border-[#5B8BB8]/20 text-[#5B8BB8] text-[10px] px-2">
                Active
              </Badge>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-2xl font-bold text-[#5B8BB8]">{trackedCount}</p>
              <span className="text-sm text-[#934F3C]/60">/ {totalCount}</span>
            </div>
            <p className="text-xs text-[#934F3C]/60">products tracked & monitored</p>
          </CardContent>
        </Card>

        {/* Average GEO Score Card */}
        <Card className={`${scoreColors.bg} border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors`}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-lg ${scoreColors.icon} flex items-center justify-center`}>
                  <Target className={`h-4 w-4 ${scoreColors.text}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Avg GEO Score</p>
                </div>
              </div>
              <Badge variant="secondary" className={`${scoreColors.icon} border-${scoreColors.text.replace('text-', '')}/20 ${scoreColors.text} text-[10px] px-2`}>
                {avgGeoScore >= 70 ? "Excellent" : avgGeoScore >= 50 ? "Good" : "Needs Work"}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className={`text-2xl font-bold ${scoreColors.text}`}>{avgGeoScore}</p>
              <span className="text-sm text-[#934F3C]/60">/ 100</span>
            </div>
            <p className="text-xs text-[#934F3C]/60">across all tracked products</p>
          </CardContent>
        </Card>

        {/* Visibility Change Card */}
        <Card className={`${avgVisibilityChange >= 0 ? 'bg-[#E8F4F0]/40' : 'bg-[#EECBC2]/30'} border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors`}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-lg ${avgVisibilityChange >= 0 ? 'bg-[#5D9B89]/15' : 'bg-[#DE7053]/15'} flex items-center justify-center`}>
                  {avgVisibilityChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-[#5D9B89]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#DE7053]" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Visibility Trend</p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`${avgVisibilityChange >= 0 ? 'bg-[#5D9B89]/10 border-[#5D9B89]/20 text-[#5D9B89]' : 'bg-[#DE7053]/10 border-[#DE7053]/20 text-[#DE7053]'} text-[10px] px-2`}
              >
                Week/Week
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${avgVisibilityChange >= 0 ? 'text-[#5D9B89]' : 'text-[#DE7053]'}`}>
                {avgVisibilityChange >= 0 ? '+' : ''}{avgVisibilityChange.toFixed(1)}%
              </p>
            </div>
            <p className="text-xs text-[#934F3C]/60 mt-1">
              {avgVisibilityChange >= 0 ? 'average improvement' : 'average decrease'}
            </p>
          </CardContent>
        </Card>

        {/* Last Scan Card */}
        <Card className="bg-[#FCBBA9]/20 border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#FF7D55]/15 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-[#FF7D55]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Last Scan</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white border-[#E3DED8] text-[#1E1D1B] text-[10px] px-2">
                Recent
              </Badge>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-xl font-semibold text-[#FF7D55]">{lastScanDate}</p>
            </div>
            <p className="text-xs text-[#934F3C]/60">most recent product scan</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

