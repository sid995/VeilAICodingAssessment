
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const CitedContentCards = ({
  topCitedDomainsData,
  topCitedPagesData,
  citationPage,
  setCitationPage,
}: any) => {
  return (
    <div className="grid grid-cols-2 gap-6 relative">
      {/* Left arrow navigation */}
      <button
        onClick={() => setCitationPage((prev: number) => Math.max(0, prev - 1))}
        disabled={citationPage === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-[#E3DED8] rounded-full p-3 shadow-lg hover:bg-[#F7F6F3] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5 text-[#1E1D1B]" />
      </button>

      {/* Top cited domains */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Top cited domains</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                See which domains dominate AI citations and their answers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-sm font-medium text-muted-foreground">Citing domain</TableHead>
                <TableHead className="text-sm font-medium text-muted-foreground text-right">Answers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCitedDomainsData.map((domain: any) => (
                <TableRow key={domain.domain} className="border-b">
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain.domain}&sz=32`}
                        alt={domain.domain}
                        className="h-4 w-4"
                        onError={(e: any) => {
                          e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                        }}
                      />
                      <span>{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold text-[#FF7D55]">{domain.answers}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Your top cited pages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Your top cited pages</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                See which of your website pages are most cited in AI answers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-sm font-medium text-muted-foreground">Your Page URL</TableHead>
                <TableHead className="text-sm font-medium text-muted-foreground text-right">Answers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCitedPagesData.map((page: any, index: number) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="text-sm">
                    <div>
                      <div className="font-medium mb-1">{page.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{page.url}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold text-[#FF7D55]">{page.answers}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Right arrow navigation */}
      <button
        onClick={() => setCitationPage((prev: number) => prev + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white border border-[#E3DED8] rounded-full p-3 shadow-lg hover:bg-[#F7F6F3] transition-all"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5 text-[#1E1D1B]" />
      </button>
    </div>
  )
}
