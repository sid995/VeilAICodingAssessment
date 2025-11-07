"use client"

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"

interface AnnotatedBarChartProps {
  data: { name: string; value: number }[]
  peakIndex?: number
  peakLabel?: string
  color?: string
  height?: number
}

export function AnnotatedBarChart({
  data,
  peakIndex = 0,
  peakLabel = "PEAK",
  color = "#3B82F6",
  height = 200,
}: AnnotatedBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="relative">
      {/* Peak annotation */}
      {peakIndex !== undefined && (
        <div
          className="absolute top-0 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded z-10"
          style={{
            left: `${((peakIndex + 0.5) / data.length) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {peakLabel}
        </div>
      )}

      <div className="h-full pt-8">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <defs>
              <pattern
                id={`diagonalHatch-${color}`}
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="1" opacity="0.2" />
              </pattern>
              <pattern
                id="diagonalHatchPeak"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="6" stroke="#14B8A6" strokeWidth="1" opacity="0.2" />
              </pattern>
            </defs>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fillOpacity={0}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === peakIndex ? "url(#diagonalHatchPeak)" : `url(#diagonalHatch-${color})`}
                  stroke={index === peakIndex ? "#14B8A6" : color}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
