"use client"

import { useEffect, useState } from "react"

interface RadialProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabels?: { label: string; value: string }[]
}

export function RadialProgress({
  value,
  max = 100,
  size = 240,
  strokeWidth = 2,
  label,
  sublabels = [],
}: RadialProgressProps) {
  const [progress, setProgress] = useState(0)
  const percentage = (value / max) * 100
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const tickCount = 180
  const tickLength = 12
  const tickStartRadius = radius - tickLength

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Tick marks */}
        {Array.from({ length: tickCount }).map((_, i) => {
          const angle = (i / tickCount) * 360
          const isActive = angle <= (progress / 100) * 360
          const x1 = center + tickStartRadius * Math.cos((angle * Math.PI) / 180)
          const y1 = center + tickStartRadius * Math.sin((angle * Math.PI) / 180)
          const x2 = center + radius * Math.cos((angle * Math.PI) / 180)
          const y2 = center + radius * Math.sin((angle * Math.PI) / 180)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isActive ? "#14B8A6" : "#E5E7EB"}
              strokeWidth={3}
              strokeLinecap="round"
              className="transition-colors duration-1000"
              style={{ transitionDelay: `${i * 10}ms` }}
            />
          )
        })}

        {/* Center text */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl font-light fill-foreground transform rotate-90 tracking-tight"
          style={{ transformOrigin: "center", fontVariantNumeric: "tabular-nums" }}
        >
          {Math.round(value)}
          <tspan className="text-xl font-light opacity-70">%</tspan>
        </text>
      </svg>

      {/* Labels below */}
      {sublabels.length > 0 && (
        <div className="flex gap-8 mt-4">
          {sublabels.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</div>
              <div className="text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
