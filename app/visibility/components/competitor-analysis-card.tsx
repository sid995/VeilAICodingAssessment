
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1B19] text-white p-3 rounded-lg shadow-lg border border-[#C4BAAE]/20">
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-sm font-medium">{label}</p>
        </div>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.stroke }} />
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

export const CompetitorAnalysisCard = ({
  competitorData,
  visibilityTrendsData,
  setSelectedCompetitor,
  setCompetitorLensOpen,
}: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="comparison">Competitor Comparison</TabsTrigger>
            <TabsTrigger value="trends">Visibility Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-sm font-medium text-muted-foreground w-12">#</TableHead>
                  <TableHead className="text-sm font-medium text-muted-foreground">Brand</TableHead>
                  <TableHead className="text-sm font-medium text-muted-foreground text-right">Visibility</TableHead>
                  <TableHead className="text-sm font-medium text-muted-foreground text-right">Avg Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorData.map((comp: any) => (
                  <TableRow
                    key={comp.rank}
                    className={`border-b cursor-pointer hover:bg-[#F7F6F3] ${
                      comp.name === "Your Brand" ? "bg-[#FCBBA9]/20" : ""
                    }`}
                    onClick={() => {
                      setSelectedCompetitor(comp.name)
                      setCompetitorLensOpen(true)
                    }}
                  >
                    <TableCell className="text-sm text-muted-foreground">{comp.rank}</TableCell>
                    <TableCell className="text-sm font-medium">
                      {comp.name}
                      {comp.name === "Your Brand" && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-[#FF7D55] text-white">
                          You
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-semibold">{comp.visibility}%</span>
                        <span
                          className={`text-xs flex items-center gap-1 ${
                            comp.visibilityChange > 0 ? "text-[#FF7D55]" : "text-[#DE7053]"
                          }`}
                        >
                          {comp.visibilityChange > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(comp.visibilityChange)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-semibold">{comp.position}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visibilityTrendsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Citations",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <RechartsTooltip content={<CustomChartTooltip />} />
                  <Line type="monotone" dataKey="Asana" stroke="#FF7D55" strokeWidth={2} name="Asana" />
                  <Line type="monotone" dataKey="Atlassian" stroke="#FB7D5C" strokeWidth={2} name="Atlassian" />
                  <Line type="monotone" dataKey="ClickUp" stroke="#DE7053" strokeWidth={2} name="ClickUp You" />
                  <Line type="monotone" dataKey="Monday" stroke="#B86048" strokeWidth={2} name="Monday.com" />
                  <Line type="monotone" dataKey="Trello" stroke="#F0A490" strokeWidth={2} name="Trello" />
                  <Line type="monotone" dataKey="Wrike" stroke="#EECBC2" strokeWidth={2} name="Wrike" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Shows the number of times each competitor was cited in AI answers over time
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
