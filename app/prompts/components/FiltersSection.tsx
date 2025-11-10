import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Product } from "../types"

interface FiltersSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterProduct: string
  setFilterProduct: (product: string) => void
  filterLLM: string
  setFilterLLM: (llm: string) => void
  filterLanguage: string
  setFilterLanguage: (language: string) => void
  filterType: string
  setFilterType: (type: string) => void
  trackedProducts: Product[]
  onClearFilters: () => void
}

export function FiltersSection({
  searchQuery,
  setSearchQuery,
  filterProduct,
  setFilterProduct,
  filterLLM,
  setFilterLLM,
  filterLanguage,
  setFilterLanguage,
  filterType,
  setFilterType,
  trackedProducts,
  onClearFilters,
}: FiltersSectionProps) {
  return (
    <div className="px-8 py-5 bg-gradient-to-br from-[#F7F6F3]/50 to-[#FCBBA9]/5 border-b border-[#E3DED8]/40">
      <div className="flex items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Input
            placeholder="Search prompts by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#E3DED8] focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all h-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#934F3C]/50 hover:text-[#FF7D55] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#934F3C]/70 uppercase tracking-wider mr-2">Filters:</span>

          <Select value={filterProduct} onValueChange={setFilterProduct}>
            <SelectTrigger className="h-10 min-w-[180px] max-w-[220px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <svg className="w-3.5 h-3.5 text-[#FF7D55] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <SelectValue placeholder="All Products" className="truncate" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {trackedProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name === "All Products" ? "All Products" : product.name.substring(0, 35) + "..."}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterLLM} onValueChange={setFilterLLM}>
            <SelectTrigger className="h-10 w-[140px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <svg className="w-3.5 h-3.5 text-[#FF7D55] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <SelectValue placeholder="All LLMs" className="truncate" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All LLMs</SelectItem>
              <SelectItem value="ChatGPT">ChatGPT</SelectItem>
              <SelectItem value="Perplexity">Perplexity</SelectItem>
              <SelectItem value="Gemini">Gemini</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Reddit">Reddit</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterLanguage} onValueChange={setFilterLanguage}>
            <SelectTrigger className="h-10 w-[155px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <svg className="w-3.5 h-3.5 text-[#FF7D55] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <SelectValue placeholder="All Languages" className="truncate" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Dutch">Dutch</SelectItem>
              <SelectItem value="Swedish">Swedish</SelectItem>
              <SelectItem value="Portuguese">Portuguese</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-10 w-[130px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
              <div className="flex items-center gap-2 overflow-hidden">
                <svg className="w-3.5 h-3.5 text-[#FF7D55] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <SelectValue placeholder="All Types" className="truncate" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="geo">GEO</SelectItem>
              <SelectItem value="seo">SEO</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filterProduct !== "all" || filterLLM !== "all" || filterLanguage !== "all" || filterType !== "all") && (
        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-[#E3DED8]/30">
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="text-xs font-medium text-[#934F3C]/60 flex-shrink-0">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
            {filterProduct !== "all" && (
              <Badge className="bg-gradient-to-r from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border-none px-2.5 py-1 gap-1.5">
                Product: {trackedProducts.find((p) => p.id === filterProduct)?.name.substring(0, 20)}...
                <button
                  onClick={() => setFilterProduct("all")}
                  className="hover:text-[#FF7D55] transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            )}
            {filterLLM !== "all" && (
              <Badge className="bg-gradient-to-r from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border-none px-2.5 py-1 gap-1.5">
                LLM: {filterLLM}
                <button onClick={() => setFilterLLM("all")} className="hover:text-[#FF7D55] transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            )}
            {filterLanguage !== "all" && (
              <Badge className="bg-gradient-to-r from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border-none px-2.5 py-1 gap-1.5">
                Language: {filterLanguage}
                <button
                  onClick={() => setFilterLanguage("all")}
                  className="hover:text-[#FF7D55] transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            )}
            {filterType !== "all" && (
              <Badge className="bg-gradient-to-r from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border-none px-2.5 py-1 gap-1.5">
                Type: {filterType.toUpperCase()}
                <button onClick={() => setFilterType("all")} className="hover:text-[#FF7D55] transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            )}
            </div>
          </div>

          {/* Clear All Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex-shrink-0 h-8 px-3 border-[#E3DED8] hover:bg-[#FCBBA9]/10 hover:border-[#FF7D55]/30 text-[#934F3C] hover:text-[#FF7D55] transition-all"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

