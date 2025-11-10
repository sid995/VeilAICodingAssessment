import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Recommendation } from "../types"

interface RecommendationsTableProps {
  recommendations: Recommendation[]
  productTitle: string
  recommendationsCount: number
}

export function RecommendationsTable({ recommendations, productTitle, recommendationsCount }: RecommendationsTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recommendations</CardTitle>
          <Link href={`/recommendations?product=${encodeURIComponent(productTitle)}`}>
            <Button variant="outline" size="sm">
              View All ({recommendationsCount})
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recommendation</TableHead>
              <TableHead className="w-24">Impact</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((rec) => (
              <TableRow key={rec.id} className="hover:bg-[#F7F6F3]/50 cursor-pointer">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-[#FF7D55] rounded-full flex-shrink-0" />
                    <span className="text-sm">{rec.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      rec.impact === "High" && "bg-[#FCBBA9]/30 text-[#B86048]",
                      rec.impact === "Medium" && "bg-[#F0A490]/30 text-[#934F3C]",
                      rec.impact === "Low" && "bg-[#E3DED8] text-[#934F3C]",
                    )}
                  >
                    {rec.impact}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/recommendations?product=${encodeURIComponent(productTitle)}`}>
                    <Button variant="ghost" size="sm" className="gap-2 h-8">
                      Details
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

