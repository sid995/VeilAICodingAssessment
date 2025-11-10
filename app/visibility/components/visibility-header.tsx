"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye, Globe, Layers } from "lucide-react"

export const VisibilityHeader = ({
  productLabel,
  timeRangeLabel,
  platformLabel,
  productPopoverOpen,
  setProductPopoverOpen,
  selectedProducts,
  mockProducts,
  toggleProduct,
  timeRange,
  setTimeRange,
  engineFilter,
  setEngineFilter,
  platformFilter,
  setPlatformFilter,
}: any) => {
  return (
    <div className="border-b bg-[#F7F6F3] px-6 py-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF7D55]/15 text-[#FF7D55]">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#1E1D1B]">Visibility</h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-[#934F3C]/70">
            Monitor how your brand surfaces inside AI answers across engines and storefronts. Adjust filters to explore the
            products and platforms that matter most.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              Semaine workspace
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {productLabel}
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {timeRangeLabel}
            </Badge>
            <Badge variant="secondary" className="bg-white text-xs font-medium text-[#1E1D1B] border border-[#E3DED8] shadow-sm">
              {platformLabel}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Popover open={productPopoverOpen} onOpenChange={setProductPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-white text-[#1E1D1B] hover:bg-[#FF7D55]/10">
                {selectedProducts.length === 0
                  ? "Select Products"
                  : selectedProducts.length === mockProducts.length
                  ? "All Products"
                  : `${selectedProducts.length} product${selectedProducts.length > 1 ? "s" : ""}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-3" align="start">
              <div className="space-y-2">
                <div className="text-sm font-medium text-[#1E1D1B]">Select Products</div>
                {mockProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-[#F7F6F3]">
                    <Checkbox
                      id={`product-${product.id}`}
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                    <label htmlFor={`product-${product.id}`} className="text-sm flex-1 cursor-pointer leading-tight">
                      {product.name}
                      {product.isTop3 && (
                        <Badge
                          variant="secondary"
                          className="ml-1.5 text-[10px] px-1 py-0 bg-[#F7F6F3] text-[#1E1D1B] border border-[#E3DED8]"
                        >
                          Top 3
                        </Badge>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-9 w-[140px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="2weeks">Last 2 weeks</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
            </SelectContent>
          </Select>

          <TooltipProvider>
            <ToggleGroup
              type="single"
              value={engineFilter}
              onValueChange={(value) => value && setEngineFilter(value)}
              className="border rounded-md"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="all" aria-label="All Engines" className="h-9 px-3">
                    <Globe className="h-4 w-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>All Engines</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="chatgpt" aria-label="ChatGPT" className="h-9 px-3">
                    <img
                      src="/chatgpt-logo.svg"
                      alt="ChatGPT"
                      className="h-4 w-4 object-contain"
                      onError={(e: any) => {
                        e.currentTarget.src = "/chatgpt-logo-inspired.png"
                      }}
                    />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ChatGPT</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="gemini" aria-label="Gemini" className="h-9 px-3">
                    <img
                      src="/gemini-logo.jpeg"
                      alt="Gemini"
                      className="h-4 w-4 object-contain rounded"
                      onError={(e: any) => {
                        e.currentTarget.src = "/google-gemini-logo.png"
                      }}
                    />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gemini</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="perplexity" aria-label="Perplexity" className="h-9 px-3">
                    <img
                      src="/perplexity-logo.png"
                      alt="Perplexity"
                      className="h-4 w-4 object-contain"
                      onError={(e: any) => {
                        e.currentTarget.src = "/perplexity-ai-logo.png"
                      }}
                    />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Perplexity</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </TooltipProvider>

          <TooltipProvider>
            <ToggleGroup
              type="single"
              value={platformFilter}
              onValueChange={(value) => value && setPlatformFilter(value as any)}
              className="border rounded-md"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="both" aria-label="Both Platforms" className="h-9 px-3">
                    <Layers className="h-4 w-4" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Both Platforms</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="amazon" aria-label="Amazon" className="h-9 px-3">
                    <img src="/amazon-a-logo.png" alt="Amazon" className="h-4 w-4 object-contain" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Amazon</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="shopify" aria-label="Shopify" className="h-9 px-3">
                    <img src="/shopify-bag-logo.jpg" alt="Shopify" className="h-4 w-4 object-contain" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shopify</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
