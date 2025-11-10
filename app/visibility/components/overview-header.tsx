
"use client"

import { TrendingDown, TrendingUp } from "lucide-react"

export const OverviewHeader = ({ metrics }: any) => {
  return (
    <div className="border-b bg-[#F7F6F3] px-6 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Overview</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span>Visibility dropped {Math.abs(metrics.visibilityChange)}% this period</span>
            <TrendingDown className="h-3.5 w-3.5 text-[#DE7053]" />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Visibility:</span>
            <span className="font-semibold">{metrics.visibility}%</span>
            {metrics.visibilityChange < 0 ? (
              <TrendingDown className="h-3.5 w-3.5 text-[#DE7053]" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5 text-[#FF7D55]" />
            )}
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Queries:</span>
            <span className="font-semibold">
              {metrics.promptsRun.toLocaleString()}/{metrics.totalQueries.toLocaleString()}
            </span>
          </div>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Share of Voice:</span>
            <span className="font-semibold">{metrics.competitorShare}%</span>
            {metrics.shareChange < 0 ? (
              <TrendingDown className="h-3.5 w-3.5 text-[#DE7053]" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5 text-[#FF7D55]" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
