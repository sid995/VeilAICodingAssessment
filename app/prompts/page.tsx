"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { trackedProducts, mockPrompts, mockAnswers } from "./constants"
import { Prompt, Answer } from "./types"
import {
  ProductHeader,
  MetricsBar,
  FiltersSection,
  PromptCard,
  AddPromptDialog,
  QueryDetailDialog,
  DetailedAnswerDialog,
  EmptyState,
} from "./components"

function PromptsPage() {
  const [selectedProduct, setSelectedProduct] = useState("product-1")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<Prompt | null>(null)
  const [isQueryDetailOpen, setIsQueryDetailOpen] = useState(false)
  const [isDetailedAnswerOpen, setIsDetailedAnswerOpen] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)

  const [filterLLM, setFilterLLM] = useState("all")
  const [filterLanguage, setFilterLanguage] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterProduct, setFilterProduct] = useState("all")

  const [newPromptText, setNewPromptText] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [locations, setLocations] = useState<string[]>([])
  const [personasInput, setPersonasInput] = useState("")
  const [personas, setPersonas] = useState<string[]>([])
  const [selectedEngines, setSelectedEngines] = useState<string[]>([])

  const searchParams = useSearchParams()
  const { t } = useTranslation()

  useEffect(() => {
    // Handle both 'product' and 'productId' query parameters
    const productParam = searchParams.get("product")
    const productIdParam = searchParams.get("productId")

    if (productIdParam) {
      // If productId is provided, find the product by ID and set filters
      const productId = `product-${productIdParam}`
      const matchingProduct = trackedProducts.find((p) => p.id === productId)
      if (matchingProduct) {
        setSelectedProduct(productId)
        setFilterProduct(productId)
      }
    } else if (productParam) {
      // Legacy support: handle 'product' parameter with name matching
      const matchingProduct = trackedProducts.find((p) => p.name !== "All Products" && productParam.startsWith(p.name))
      if (matchingProduct) {
        setSelectedProduct(matchingProduct.id)
        setFilterProduct(matchingProduct.id)
      }
    }
  }, [searchParams])

  const currentProduct = trackedProducts.find((p) => p.id === selectedProduct)
  const filteredPrompts = mockPrompts.filter((p) => {
    const matchesProduct =
      filterProduct === "all" || p.product === trackedProducts.find((prod) => prod.id === filterProduct)?.name
    const matchesSearch = p.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLLM = filterLLM === "all" || p.llms.includes(filterLLM)
    const matchesLanguage = filterLanguage === "all" || p.location.language === filterLanguage
    const matchesType = filterType === "all" || p.type === filterType
    return matchesProduct && matchesSearch && matchesLLM && matchesLanguage && matchesType
  })

  const handleAddPrompt = () => {
    console.log("[v0] Adding prompt:", {
      text: newPromptText,
      locations,
      personas,
      engines: selectedEngines,
    })
    setIsAddPromptOpen(false)
    setNewPromptText("")
    setLocations([])
    setPersonas([])
    setLocationInput("")
    setPersonasInput("")
    setSelectedEngines([])
  }

  const handleQueryClick = (query: Prompt) => {
    setSelectedQuery(query)
    setIsQueryDetailOpen(true)
  }

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer)
    setIsDetailedAnswerOpen(true)
  }

  const handleBackToResponses = () => {
    setIsDetailedAnswerOpen(false)
    setSelectedAnswer(null)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setFilterProduct("all")
    setFilterLLM("all")
    setFilterLanguage("all")
    setFilterType("all")
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-b from-background to-[#F7F6F3]">
      <div className="flex-shrink-0 border-b border-[#E3DED8]/60 bg-background/30 backdrop-blur-sm shadow-sm">
        {/* Product Header with Add Prompt Button */}
        <div className="relative">
          <ProductHeader currentProduct={currentProduct} />
          <div className="absolute top-6 right-8">
            <AddPromptDialog
              isOpen={isAddPromptOpen}
              onOpenChange={setIsAddPromptOpen}
              onAddPrompt={handleAddPrompt}
              newPromptText={newPromptText}
              setNewPromptText={setNewPromptText}
              locationInput={locationInput}
              setLocationInput={setLocationInput}
              locations={locations}
              setLocations={setLocations}
              personasInput={personasInput}
              setPersonasInput={setPersonasInput}
              personas={personas}
              setPersonas={setPersonas}
              selectedEngines={selectedEngines}
              setSelectedEngines={setSelectedEngines}
            />
          </div>
        </div>

        {/* Metrics Bar */}
        <MetricsBar totalPrompts={filteredPrompts.length} />

        {/* Filters Section */}
        <FiltersSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterProduct={filterProduct}
          setFilterProduct={setFilterProduct}
          filterLLM={filterLLM}
          setFilterLLM={setFilterLLM}
          filterLanguage={filterLanguage}
          setFilterLanguage={setFilterLanguage}
          filterType={filterType}
          setFilterType={setFilterType}
          trackedProducts={trackedProducts}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Modern Card-Style Table */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="px-8 pt-4 pb-6">
          {filteredPrompts.length === 0 ? (
            <EmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div className="space-y-3">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} onViewDetails={handleQueryClick} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Query Detail Dialog */}
      <QueryDetailDialog
        isOpen={isQueryDetailOpen}
        onOpenChange={setIsQueryDetailOpen}
        selectedQuery={selectedQuery}
        mockAnswers={mockAnswers}
        onAnswerClick={handleAnswerClick}
      />

      {/* Detailed Answer Dialog */}
      <DetailedAnswerDialog
        isOpen={isDetailedAnswerOpen}
        onOpenChange={setIsDetailedAnswerOpen}
        selectedAnswer={selectedAnswer}
        selectedQuery={selectedQuery}
        onBackToResponses={handleBackToResponses}
      />
    </div>
  )
}

export default PromptsPage
