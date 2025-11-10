"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import type { Competitor, ProductVersion, VisibilityTrendData } from "../types"

interface ProductAnalysisCardProps {
  selectedVersion: ProductVersion
  competitorData: Competitor[]
  visibilityTrendsData: VisibilityTrendData[]
  competitorColors: Record<string, string>
}

const CustomTooltip = ({ active, payload, label, competitorData }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1B19] text-white p-4 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const competitor = competitorData.find((c: Competitor) => c.brand === entry.name)
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              {competitor?.domain && (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=16`}
                  alt={`${entry.name} logo`}
                  className="w-4 h-4"
                />
              )}
              <span className="text-[#C4BAAE]">{entry.name}</span>
              <span className="text-[#FF7D55] font-semibold ml-auto">{entry.value}</span>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export function ProductAnalysisCard({
  selectedVersion,
  competitorData,
  visibilityTrendsData,
  competitorColors,
}: ProductAnalysisCardProps) {
  const [competitorTab, setCompetitorTab] = useState<"comparison" | "trends">("comparison")

  return (
    <Card className="gap-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Product Analysis</CardTitle>
      </CardHeader>
      <CardContent className="py-0 h-full">
        <div className="flex flex-col flex-1 justify-between h-full">
          <div>
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setCompetitorTab("comparison")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  competitorTab === "comparison"
                    ? "border-[#FF7D55] text-[#FF7D55]"
                    : "border-transparent text-[#934F3C]/70 hover:text-[#1E1D1B]",
                )}
              >
                Competitor Comparison
              </button>
              <button
                onClick={() => setCompetitorTab("trends")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  competitorTab === "trends"
                    ? "border-[#FF7D55] text-[#FF7D55]"
                    : "border-transparent text-[#934F3C]/70 hover:text-[#1E1D1B]",
                )}
              >
                Visibility Trends
              </button>
            </div>

            {competitorTab === "comparison" && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Avg Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorData.map((competitor) => (
                      <TableRow key={competitor.rank} className={competitor.isYou ? "bg-[#FCBBA9]/20" : ""}>
                        <TableCell className="font-medium">{competitor.rank}</TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://www.google.com/s2/favicons?domain=${competitor.domain}&sz=32`}
                              alt={`${competitor.brand} logo`}
                              className="w-5 h-5"
                            />
                            <span>{competitor.brand}</span>
                            {competitor.isYou && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">{competitor.visibility}%</span>
                            <div className="flex items-center gap-1">
                              {competitor.visibilityTrend > 0 ? (
                                <>
                                  <span className="text-[#FF7D55] text-xs">↗</span>
                                  <span className="text-[#FF7D55] text-xs">{competitor.visibilityTrend}</span>
                                </>
                              ) : competitor.visibilityTrend < 0 ? (
                                <>
                                  <span className="text-[#DE7053] text-xs">↘</span>
                                  <span className="text-[#DE7053] text-xs">{Math.abs(competitor.visibilityTrend)}</span>
                                </>
                              ) : (
                                <span className="text-[#934F3C]/50 text-xs">—</span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{competitor.avgPosition}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {competitorTab === "trends" && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visibilityTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={{ stroke: "#E3DED8" }} tickLine={false} />
                    <YAxis
                      domain={[0, 80]}
                      ticks={[0, 15, 30, 45, 60]}
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#E3DED8" }}
                      tickLine={false}
                      label={{
                        value: "Citations",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip content={<CustomTooltip competitorData={competitorData} />} />
                    <Line
                      type="monotone"
                      dataKey="Vivora"
                      stroke={competitorColors.Vivora}
                      strokeWidth={2}
                      dot={{ fill: competitorColors.Vivora, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Trideer"
                      stroke={competitorColors.Trideer}
                      strokeWidth={2}
                      dot={{ fill: competitorColors.Trideer, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Your Brand"
                      stroke={competitorColors["Your Brand"]}
                      strokeWidth={2}
                      dot={{ fill: competitorColors["Your Brand"], r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="URBNFit"
                      stroke={competitorColors.URBNFit}
                      strokeWidth={2}
                      dot={{ fill: competitorColors.URBNFit, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Live Infinitely"
                      stroke={competitorColors["Live Infinitely"]}
                      strokeWidth={2}
                      dot={{ fill: competitorColors["Live Infinitely"], r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-[#934F3C]/70 text-center">
                  Shows the number of times each competitor was cited in AI answers over time
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-[#E3DED8]">
            <div className="p-3 bg-[#F7F6F3] rounded-lg">
              <div className="text-[#934F3C]/70 mb-1 text-xs">Visibility Change</div>
              <div
                className={`text-xl font-semibold ${selectedVersion.visibilityChange >= 0 ? "text-[#FF7D55]" : "text-[#DE7053]"}`}
              >
                {selectedVersion.visibilityChange > 0 ? "+" : ""}
                {selectedVersion.visibilityChange}%
              </div>
            </div>
            <div className="p-3 bg-[#F7F6F3] rounded-lg">
              <div className="text-[#934F3C]/70 mb-1 text-xs">Queries</div>
              <div className="text-xl font-semibold text-[#1E1D1B]">
                {Math.round(selectedVersion.geoScore * 10)}/{Math.round(selectedVersion.geoScore * 15)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

