"use client"

import { Info } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "@/hooks/use-language"

const competitors = [
  { rank: 1, name: "Ipsos", logo: "🔷", score: "23.2%", change: "-0.1%", isNegative: true },
  { rank: 2, name: "Kantar", logo: "⬛", score: "17.3%", change: "+0.3%", isNegative: false },
  { rank: 3, name: "Optimizely", logo: "🎨", score: "14.4%", change: "+2%", isNegative: false },
  { rank: 4, name: "VWO", logo: "🔶", score: "13.6%", change: "-0.3%", isNegative: true },
]

export function CompetitorTable() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{t("visibilityScoreRank")}</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-3xl font-semibold">#0 –</div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground pb-2">
            <span>{t("asset")}</span>
            <span>{t("visibilityScore")}</span>
          </div>

          {competitors.map((competitor) => (
            <div
              key={competitor.rank}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-6">{competitor.rank}.</span>
                <span className="text-lg">{competitor.logo}</span>
                <span className="text-sm font-medium">{competitor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{competitor.score}</span>
                <span className={`text-sm ${competitor.isNegative ? "text-red-500" : "text-green-500"}`}>
                  {competitor.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full text-sm">
          {t("expand")}
        </Button>
      </div>
    </div>
  )
}
