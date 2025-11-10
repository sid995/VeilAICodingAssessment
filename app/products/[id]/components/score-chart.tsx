import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { ScoreData } from "../types"

interface ScoreChartProps {
  scoreData: ScoreData[]
}

export function ScoreChart({ scoreData }: ScoreChartProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Score Over Date (Versions)</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3DED8" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              label={{ value: "date (versions)", position: "insideBottom", offset: -5, fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: "score", angle: -90, position: "insideLeft", fontSize: 12 }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#FF7D55" strokeWidth={2} dot={{ fill: "#FF7D55" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

