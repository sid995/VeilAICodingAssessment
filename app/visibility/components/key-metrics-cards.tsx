
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingDown, BookOpen, Clock, TrendingUp } from "lucide-react"

export const KeyMetricsCards = ({ metrics, timeRangeLabel, timeUntilNextRun }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Countdown card - warm peach with icon chip and circular progress */}
      <Card className="bg-[#FCBBA9]/20 border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#FF7D55]/15 flex items-center justify-center">
                <Target className="h-4 w-4 text-[#FF7D55]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Next Test</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white border-[#E3DED8] text-[#1E1D1B] text-[10px] px-2">
              Auto
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            {/* Circular progress indicator */}
            <div className="relative h-16 w-16 flex-shrink-0">
              <svg className="transform -rotate-90" viewBox="0 0 64 64">
                {/* Background circle */}
                <circle cx="32" cy="32" r="28" fill="none" stroke="#E3DED8" strokeWidth="6" />
                {/* Progress circle - calculating progress based on time remaining (assuming 7 days cycle) */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="url(#countdown-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${
                    ((timeUntilNextRun.days * 24 * 60 + timeUntilNextRun.hours * 60 + timeUntilNextRun.minutes) /
                      (7 * 24 * 60)) *
                    175.93
                  } 175.93`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="countdown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF7D55" />
                    <stop offset="100%" stopColor="#FCBBA9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#FF7D55]">{timeUntilNextRun.days}d</span>
              </div>
            </div>
            {/* Time display */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xl font-semibold text-[#1E1D1B]">
                <span>{timeUntilNextRun.days}d</span>
                <span className="text-[#C4BAAE] text-base">:</span>
                <span>{timeUntilNextRun.hours}h</span>
                <span className="text-[#C4BAAE] text-base">:</span>
                <span>{timeUntilNextRun.minutes}m</span>
              </div>
              <p className="text-xs text-[#934F3C]/60 mt-1">Content refresh scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility change card - warm coral with icon chip */}
      <Card className="bg-[#EECBC2]/30 border-[#E3DED8] hover:border-[#DE7053]/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#DE7053]/15 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-[#DE7053]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Trend</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#DE7053]/10 border-[#DE7053]/20 text-[#DE7053] text-[10px] px-2">
              {timeRangeLabel}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-[#1E1D1B]">{Math.abs(metrics.visibilityChange)}%</p>
            <span className="text-sm text-[#934F3C]/70">decrease</span>
          </div>
          <p className="text-xs text-[#934F3C]/60 mt-2">Visibility dropped this period</p>
        </CardContent>
      </Card>

      {/* AI Citation Rate card - soft green/teal */}
      <Card className="bg-[#E8F4F0]/40 border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#5D9B89]/15 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-[#5D9B89]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Citation Rate</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#5D9B89]/10 border-[#5D9B89]/20 text-[#5D9B89] text-[10px] px-2">
              +12%
            </Badge>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-2xl font-bold text-[#1E1D1B]">67.3%</p>
            <TrendingUp className="h-4 w-4 text-[#5D9B89]" />
          </div>
          <p className="text-xs text-[#934F3C]/60">of responses include your content</p>
        </CardContent>
      </Card>

      {/* Average Response Time card - soft blue */}
      <Card className="bg-[#E6F0F9]/40 border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#5B8BB8]/15 flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#5B8BB8]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#934F3C]/70 uppercase tracking-wide">Avg Response Time</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#5B8BB8]/10 border-[#5B8BB8]/20 text-[#5B8BB8] text-[10px] px-2">
              -0.3s
            </Badge>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-2xl font-bold text-[#1E1D1B]">2.4s</p>
            <TrendingDown className="h-4 w-4 text-[#5B8BB8]" />
          </div>
          <p className="text-xs text-[#934F3C]/60">AI engines citing your brand</p>
        </CardContent>
      </Card>
    </div>
  )
}
