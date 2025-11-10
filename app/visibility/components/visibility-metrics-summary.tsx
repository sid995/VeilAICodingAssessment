
"use client"

import { TrendingDown, TrendingUp, Eye, Target, Layers } from "lucide-react"

export const VisibilityMetricsSummary = ({ metrics }: any) => {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Live Tracking - Enhanced with glowing animation */}
      <div className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-[#FF7D55] bg-gradient-to-r from-[#FF7D55]/10 via-[#FF7D55]/5 to-transparent shadow-lg shadow-[#FF7D55]/20 animate-pulse">
        {/* Animated pulse ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-4 w-4 rounded-full bg-[#FF7D55] opacity-75 animate-ping"></div>
          <div className="relative h-2.5 w-2.5 rounded-full bg-[#FF7D55] shadow-lg shadow-[#FF7D55]/50"></div>
        </div>
        <span className="text-sm font-bold text-[#FF7D55] tracking-wide uppercase">Live Tracking</span>
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E3DED8] bg-white">
        <Eye className="h-3.5 w-3.5 text-[#934F3C]/70" />
        <span className="text-sm text-[#934F3C]/70">Visibility:</span>
        <span className="text-sm font-semibold text-[#1E1D1B]">{metrics.visibility}%</span>
        {metrics.visibilityChange !== 0 && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              metrics.visibilityChange > 0 ? "text-[#FF7D55]" : "text-[#DE7053]"
            }`}
          >
            {metrics.visibilityChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(metrics.visibilityChange)}%
          </span>
        )}
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E3DED8] bg-white">
        <Target className="h-3.5 w-3.5 text-[#934F3C]/70" />
        <span className="text-sm text-[#934F3C]/70">Queries:</span>
        <span className="text-sm font-semibold text-[#1E1D1B]">
          {metrics.promptsRun.toLocaleString()}/{metrics.totalQueries.toLocaleString()}
        </span>
        {metrics.promptsRunChange !== 0 && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              metrics.promptsRunChange > 0 ? "text-[#FF7D55]" : "text-[#DE7053]"
            }`}
          >
            {metrics.promptsRunChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(metrics.promptsRunChange)}
          </span>
        )}
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E3DED8] bg-white">
        <Layers className="h-3.5 w-3.5 text-[#934F3C]/70" />
        <span className="text-sm text-[#934F3C]/70">Share of Voice:</span>
        <span className="text-sm font-semibold text-[#1E1D1B]">{metrics.competitorShare}%</span>
        {metrics.shareChange !== 0 && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              metrics.shareChange > 0 ? "text-[#FF7D55]" : "text-[#DE7053]"
            }`}
          >
            {metrics.shareChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(metrics.shareChange)}%
          </span>
        )}
      </div>
    </div>
  )
}
