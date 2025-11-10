import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"
import type { EngineDistribution } from "../types"

interface EngineDistributionChartProps {
  engineDistribution: EngineDistribution[]
}

export function EngineDistributionChart({ engineDistribution }: EngineDistributionChartProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Engine Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={engineDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              paddingAngle={2}
            >
              {engineDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="#FFFFFF" strokeWidth={2} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => {
                const entry = engineDistribution.find((e) => e.name === value)
                return <span style={{ color: "#1E1D1B", fontWeight: 500 }}>{value}</span>
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

