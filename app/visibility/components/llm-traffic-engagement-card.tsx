"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Eye, Target, LineChartIcon, BarChart3 } from "lucide-react"

type KpiCardProps = {
  icon: React.ReactNode
  title: string
  value: string | number
  subtext: string
  bgColor: string
  borderColor: string
}

const KpiCard = ({ icon, title, value, subtext, bgColor, borderColor }: KpiCardProps) => (
  <div className={`px-4 py-3 rounded-lg ${bgColor} ${borderColor}`}>
    <div className="flex items-center gap-2 mb-1">{icon}</div>
    <p className="text-2xl font-semibold text-[#1E1D1B]">{value}</p>
    <p className="text-xs text-[#934F3C]/60 mt-1">{subtext}</p>
  </div>
)

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1B19] text-white p-3 rounded-lg shadow-lg border border-[#C4BAAE]/20">
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-sm font-medium">{label}</p>
          <span className="text-[#C4BAAE] text-xs">/200 queries</span>
        </div>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-[#C4BAAE]">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold text-[#FF7D55]">
                {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload, onMouseEnter, onMouseLeave, hoveredLegend }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => {
        const isHovered = hoveredLegend === entry.value
        const isAnyHovered = hoveredLegend !== null
        const shouldGrayOut = isAnyHovered && !isHovered

        return (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-2 cursor-pointer transition-all duration-200"
            onMouseEnter={() => onMouseEnter(entry.value)}
            onMouseLeave={onMouseLeave}
            style={{ opacity: shouldGrayOut ? 0.3 : 1 }}
          >
            <div
              className="w-3 h-3 rounded-sm transition-all duration-200"
              style={{
                backgroundColor: shouldGrayOut ? "#C4BAAE" : entry.color,
              }}
            />
            <span
              className="text-xs transition-colors duration-200"
              style={{
                color: shouldGrayOut ? "#C4BAAE" : isHovered ? "#1E1D1B" : "#934F3C99",
              }}
            >
              {entry.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export const LlmTrafficEngagementCard = ({
  llmMetric,
  setLlmMetric,
  llmChartType,
  setLlmChartType,
  trafficData,
  totalAppearances,
  avgPosition,
  metrics,
  platformFilter,
  engineFilter,
  hoveredLegend,
  setHoveredLegend,
}: any) => {
  const chartSeriesConfig = [
    {
      name: "Amazon - ChatGPT",
      dataKey: llmMetric === "position" ? "chatgptAmazonPos" : "chatgptAmazon",
      color: "#10B981",
      platform: "amazon",
      engine: "chatgpt",
    },
    {
      name: "Amazon - Gemini",
      dataKey: llmMetric === "position" ? "geminiAmazonPos" : "geminiAmazon",
      color: "#3B82F6",
      platform: "amazon",
      engine: "gemini",
    },
    {
      name: "Amazon - Perplexity",
      dataKey: llmMetric === "position" ? "perplexityAmazonPos" : "perplexityAmazon",
      color: "#8B5CF6",
      platform: "amazon",
      engine: "perplexity",
    },
    {
      name: "Shopify - ChatGPT",
      dataKey: llmMetric === "position" ? "chatgptShopifyPos" : "chatgptShopify",
      color: "#F59E0B",
      platform: "shopify",
      engine: "chatgpt",
    },
    {
      name: "Shopify - Gemini",
      dataKey: llmMetric === "position" ? "geminiShopifyPos" : "geminiShopify",
      color: "#EF4444",
      platform: "shopify",
      engine: "gemini",
    },
    {
      name: "Shopify - Perplexity",
      dataKey: llmMetric === "position" ? "perplexityShopifyPos" : "perplexityShopify",
      color: "#EC4899",
      platform: "shopify",
      engine: "perplexity",
    },
  ]

  const visibleSeries = chartSeriesConfig.filter(
    (series) =>
      (platformFilter === "both" || platformFilter === series.platform) &&
      (engineFilter === "all" || engineFilter === series.engine)
  )

  return (
    <Card className="col-span-3 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#FF7D55] via-[#FB7D5C] to-[#FCBBA9]"></div>
      <CardHeader className="bg-[#F7F6F3]/50">
        <div className="my-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF7D55]/15">
              <BarChart3 className="h-4 w-4 text-[#FF7D55]" />
            </div>
            <CardTitle className="text-base">LLM Traffic & Engagement</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={llmMetric}
              onValueChange={(value: "visibility" | "position") => value && setLlmMetric(value)}
              className="rounded-lg border border-[#E3DED8] bg-white"
            >
              <ToggleGroupItem
                value="visibility"
                aria-label="Visibility"
                className="cursor-pointer gap-2 data-[state=on]:border-[#FF7D55]/20 data-[state=on]:bg-[#FF7D55]/10 data-[state=on]:text-[#FF7D55] h-9 px-3"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Visibility</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="position"
                aria-label="Position"
                className="cursor-pointer gap-2 data-[state=on]:border-[#FF7D55]/20 data-[state=on]:bg-[#FF7D55]/10 data-[state=on]:text-[#FF7D55] h-9 px-3"
              >
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Position</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex items-center gap-1 rounded-lg border border-[#E3DED8] bg-white">
              <Button
                variant={llmChartType === "line" ? "secondary" : "ghost"}
                size="sm"
                className={`cursor-pointer h-9 px-3 ${
                  llmChartType === "line" ? "bg-[#FF7D55]/10 text-[#FF7D55] hover:bg-[#FF7D55]/15" : "hover:bg-[#F7F6F3]"
                }`}
                onClick={() => setLlmChartType("line")}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={llmChartType === "bar" ? "secondary" : "ghost"}
                size="sm"
                className={`cursor-pointer h-9 px-3 ${
                  llmChartType === "bar" ? "bg-[#FF7D55]/10 text-[#FF7D55] hover:bg-[#FF7D55]/15" : "hover:bg-[#F7F6F3]"
                }`}
                onClick={() => setLlmChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <KpiCard
            icon={
              <>
                <Eye className="h-3.5 w-3.5 text-[#FF7D55]" />
                <span className="text-xs font-medium uppercase tracking-wide text-[#934F3C]/70">Total Appearances</span>
              </>
            }
            title="Total Appearances"
            value={totalAppearances.toLocaleString()}
            subtext="Across all selected engines"
            bgColor="bg-[#FCBBA9]/15"
            borderColor="border border-[#E3DED8]"
          />
          <KpiCard
            icon={
              <>
                <Target className="h-3.5 w-3.5 text-[#DE7053]" />
                <span className="text-xs font-medium uppercase tracking-wide text-[#934F3C]/70">Avg Position</span>
              </>
            }
            title="Avg Position"
            value={avgPosition.toFixed(1)}
            subtext="In search results"
            bgColor="bg-[#EECBC2]/20"
            borderColor="border border-[#E3DED8]"
          />
          <KpiCard
            icon={
              <>
                <BarChart3 className="h-3.5 w-3.5 text-[#B86048]" />
                <span className="text-xs font-medium uppercase tracking-wide text-[#934F3C]/70">Visibility Rate</span>
              </>
            }
            title="Visibility Rate"
            value={`${metrics.visibility}%`}
            subtext="Current period average"
            bgColor="bg-[#F7F6F3]"
            borderColor="border border-[#E3DED8]"
          />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {llmChartType === "line" ? (
              <LineChart data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{
                    value: llmMetric === "position" ? "Avg Position" : "Visibility",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  reversed={llmMetric === "position"}
                />
                <RechartsTooltip content={<CustomChartTooltip />} />
                <Legend
                  content={
                    <CustomLegend
                      onMouseEnter={setHoveredLegend}
                      onMouseLeave={() => setHoveredLegend(null)}
                      hoveredLegend={hoveredLegend}
                    />
                  }
                />
                {visibleSeries.map((series) => (
                  <Line
                    key={series.name}
                    type="monotone"
                    dataKey={series.dataKey}
                    stroke={series.color}
                    strokeWidth={2}
                    name={series.name}
                    strokeOpacity={hoveredLegend === null || hoveredLegend === series.name ? 1 : 0.2}
                    isAnimationActive={false}
                    style={{ transition: "stroke-opacity 0.3s ease" }}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  label={{
                    value: llmMetric === "position" ? "Avg Position" : "Visibility",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <RechartsTooltip content={<CustomChartTooltip />} />
                <Legend
                  content={
                    <CustomLegend
                      onMouseEnter={setHoveredLegend}
                      onMouseLeave={() => setHoveredLegend(null)}
                      hoveredLegend={hoveredLegend}
                    />
                  }
                />
                {visibleSeries.map((series) => (
                  <Bar
                    key={series.name}
                    dataKey={series.dataKey}
                    fill={series.color}
                    name={series.name}
                    fillOpacity={hoveredLegend === null || hoveredLegend === series.name ? 1 : 0.2}
                    isAnimationActive={false}
                    style={{ transition: "fill-opacity 0.3s ease" }}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
