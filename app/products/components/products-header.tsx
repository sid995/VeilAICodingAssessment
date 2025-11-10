"use client"

import { Search, Filter, Plus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductsHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterStatus: "all" | "tracked" | "untracked"
  setFilterStatus: (status: "all" | "tracked" | "untracked") => void
  sortBy: string
  setSortBy: (sort: string) => void
  isTrackedView: boolean
  trackedCount: number
  totalCount: number
}

export const ProductsHeader = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  isTrackedView,
  trackedCount,
  totalCount,
}: ProductsHeaderProps) => {
  const filterLabel =
    filterStatus === "all"
      ? "All Products"
      : filterStatus === "tracked"
        ? "Tracked Only"
        : "Untracked Only"

  const sortLabel =
    sortBy === "visibility"
      ? "Highest Visibility"
      : sortBy === "improving"
        ? "Fastest Improving"
        : sortBy === "recent"
          ? "Most Recently Scanned"
          : "Most Recommendations"

  return (
    <div className="border-b bg-[#F7F6F3] px-6 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF7D55]/15 text-[#FF7D55]">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#1E1D1B]">
                  {isTrackedView ? "Tracked Products" : "Product Optimization Hub"}
                </h1>
              </div>
            </div>
            <Button className="gap-2 bg-[#FF7D55] hover:bg-[#FF7D55]/90 text-white cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <p className="max-w-2xl text-sm text-[#934F3C]/70">
            Track and optimize your product visibility across AI platforms. Monitor GEO scores,
            track performance trends, and receive actionable recommendations to improve discoverability.
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              Semaine workspace
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {trackedCount} / {totalCount} tracked
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {filterLabel}
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {sortLabel}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ASIN, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-[#E3DED8] focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="tracked">Tracked Only</SelectItem>
              <SelectItem value="untracked">Untracked Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 transition-colors">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="visibility">Highest Visibility</SelectItem>
              <SelectItem value="improving">Fastest Improving</SelectItem>
              <SelectItem value="recent">Most Recently Scanned</SelectItem>
              <SelectItem value="recommendations">Most Recommendations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

