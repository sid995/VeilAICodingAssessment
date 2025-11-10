import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Query } from "../types"

interface QueriesTableProps {
  queries: Query[]
  productTitle: string
}

export function QueriesTable({ queries, productTitle }: QueriesTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Top Queries</CardTitle>
          <span className="text-sm text-[#934F3C]/70">Query title - ChatGPT position</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Query</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queries.map((query) => (
              <TableRow key={query.id}>
                <TableCell className="font-medium">{query.query}</TableCell>
                <TableCell>
                  <Badge variant="secondary">#{query.position}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/prompts?product=${encodeURIComponent(productTitle)}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View Details
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

