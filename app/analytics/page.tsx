"use client"

import { Card } from "@/components/ui/card"
import { LucidePieChart, ChevronDown, ChevronUp, Info } from "lucide-react"
import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLanguage } from "@/hooks/use-language"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

const geoScoreTrendData = [
  { name: "Oct 17", value: 12 },
  { name: "Oct 18", value: 18 },
  { name: "Oct 19", value: 25 },
  { name: "Oct 20", value: 22 },
  { name: "Oct 21", value: 28 },
  { name: "Oct 22", value: 35 },
  { name: "Oct 23", value: 42 },
  { name: "Oct 24", value: 38 },
]

const platformData = [
  { name: "Amazon Serp", value: 100, color: "#E879B9" },
  { name: "Gemini", value: 0, color: "#FB923C" },
  { name: "Chatgpt", value: 0, color: "#60A5FA" },
  { name: "Perplexity", value: 0, color: "#4ADE80" },
]

const highPerformingQueries = [
  "What is Generative Engine Optimization (GEO)?",
  "Can you explain what generative engine optimization is?",
  "What are the best names for a generative engine optimization tool?",
  "What features should I include in a product for generative engine optimization?",
  "How do you perform generative engine optimization?",
]

const poorPerformingQueries = [
  "What is a good performance engine?",
  "What is a generative engine?",
  "What are the methods of Generative Engine Optimization?",
  "What is the relevance of generative engine optimization compared to answer engine optimization?",
  "Can you provide a detailed optimization package?",
]

export default function AnalyticsPage() {
  const { t, language } = useLanguage()
  const [showHighPerforming, setShowHighPerforming] = useState(true)
  const [showPoorPerforming, setShowPoorPerforming] = useState(true)

  useEffect(() => {
    // This ensures the component updates when language changes
  }, [language])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            {t("analytics")} {t("dashboard")}
          </h1>
          <p className="text-muted-foreground">Comprehensive view of your AI search optimization performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* AI Visibility Score */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm text-muted-foreground">{t("currentAIVisibility")}</div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:bg-accent rounded-full p-1 transition-colors">
                    <Info className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start" side="top">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">{t("howWeCalculate")}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t("scoreExplanation")}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t("scoreImportance")}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="text-3xl font-semibold mb-1">0.3</div>
            <div className="text-xs text-muted-foreground">Visibility metric</div>
          </Card>

          {/* AI Model Mentions */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="text-sm text-muted-foreground mb-2">{t("aiModelMentions")}</div>
            <div className="text-3xl font-semibold mb-1">15</div>
            <div className="text-xs text-muted-foreground">Total mentions</div>
          </Card>

          {/* AI Inclusion Rate */}
          <Card className="p-6 bg-purple-50 border-purple-200">
            <div className="text-sm text-muted-foreground mb-2">{t("currentAIInclusion")}</div>
            <div className="text-3xl font-semibold mb-1">13.2%</div>
            <div className="text-xs text-muted-foreground">Inclusion percentage</div>
          </Card>
        </div>

        {/* Query Performance Section */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">{t("queryPerformance")}</h2>

          {/* High Performing Queries */}
          <Card className="border-2">
            <button
              onClick={() => setShowHighPerforming(!showHighPerforming)}
              className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <h3 className="text-lg font-semibold">{t("highPerforming")}</h3>
                <span className="text-sm text-muted-foreground">
                  ({highPerformingQueries.length} {t("queries")})
                </span>
              </div>
              {showHighPerforming ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {showHighPerforming && (
              <div className="px-6 pb-6 space-y-2">
                {highPerformingQueries.map((query, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
                  >
                    <p className="text-sm">{query}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Poor Performing Queries */}
          <Card className="border-2">
            <button
              onClick={() => setShowPoorPerforming(!showPoorPerforming)}
              className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <h3 className="text-lg font-semibold">{t("poorPerforming")}</h3>
                <span className="text-sm text-muted-foreground">
                  ({poorPerformingQueries.length} {t("queries")})
                </span>
              </div>
              {showPoorPerforming ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {showPoorPerforming && (
              <div className="px-6 pb-6 space-y-2">
                {poorPerformingQueries.map((query, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-colors"
                  >
                    <p className="text-sm">{query}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-2">
            <div className="flex items-center gap-2 mb-6">
              <LucidePieChart className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold">GEO Score Trend</h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={geoScoreTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ fill: "#14b8a6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-2">
            <div className="flex items-center gap-2 mb-6">
              <LucidePieChart className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">{t("platformPresence")}</h3>
            </div>

            <div className="flex items-center justify-between gap-8">
              {/* Donut Chart */}
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={200} height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={platformData}
                      cx={100}
                      cy={100}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>

                {/* Center Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white rounded-lg p-3 shadow-sm border">
                  <div className="text-xs text-muted-foreground mb-1">:</div>
                  <div className="text-sm font-bold">100% {t("ofMentions")}</div>
                  <div className="text-xs text-muted-foreground">15 of 17 {t("ofQueries")}</div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                      <span className="text-sm">{platform.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{platform.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
