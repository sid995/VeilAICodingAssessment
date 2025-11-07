"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, MapPin, Globe, X, ArrowLeft } from "lucide-react"
import type React from "react"
import { useTranslation } from "react-i18next"

// Source icon component
function SourceIcon({ source }: { source: string }) {
  const iconMap: Record<string, React.ReactElement> = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    chatgpt: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm3.6 18.304a4.47 4.47 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.843 3.369v-2.332a.08.08 0 0 0-.033.062L9.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
          fill="#10A37F"
        />
      </svg>
    ),
    perplexity: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#20808D" />
        <path d="M12 6v12M6 12h12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gemini: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#4285F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    reddit: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF4500" />
        <path d="M15.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="white" />
        <path d="M15 14.5s-.5 1.5-3 1.5-3-1.5-3-1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  }

  return iconMap[source.toLowerCase()] || null
}

const trackedProducts = [
  { id: "all", name: "All Products", count: 169, domain: "" },
  {
    id: "product-1",
    name: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
    count: 45,
    domain: "gaiam.com",
  },
  {
    id: "product-2",
    name: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
    count: 38,
    domain: "gaiam.com",
  },
  {
    id: "product-3",
    name: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
    count: 42,
    domain: "gaiam.com",
  },
  { id: "product-4", name: "Gaiam Balance Ball Chair - Blue", count: 44, domain: "gaiam.com" },
]

const mockPrompts = [
  {
    id: 1,
    text: "product management platforms with agile product lifecycle management features",
    source: "chatgpt",
    personas: ["Student", "Professional"],
    position: 9.5,
    topic: "product-mgmt",
    type: "geo" as const,
    location: { country: "United States", city: "San Francisco", language: "English" },
    llms: ["ChatGPT", "Perplexity"],
    productSnippet: "Product Management Platform - Enterprise",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 2,
    text: "What are some of the key things product teams look for in a management tool?",
    source: "google",
    personas: ["Professional"],
    position: 9,
    topic: "product-mgmt",
    type: "seo" as const,
    location: { country: "United States", city: "New York", language: "English" },
    llms: ["Google"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 3,
    text: "what is the cost of restoration project management software",
    source: "chatgpt",
    personas: ["Parent", "Outdoor"],
    position: 8.5,
    topic: "product-mgmt",
    type: "geo" as const,
    location: { country: "Canada", city: "Toronto", language: "English" },
    llms: ["ChatGPT"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 4,
    text: "scheduling software vs dedicated product management platforms",
    source: "google",
    personas: ["Professional", "Student"],
    position: 8.2,
    topic: "product-mgmt",
    type: "seo" as const,
    location: { country: "United Kingdom", city: "London", language: "English" },
    llms: ["Google"],
    productSnippet: "",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 5,
    text: "Research tools for product management team collaboration",
    source: "perplexity",
    personas: ["Professional"],
    position: 8.14,
    topic: "product-mgmt",
    type: "geo" as const,
    location: { country: "Australia", city: "Sydney", language: "English" },
    llms: ["Perplexity"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - Blue",
  },
  {
    id: 6,
    text: "what project management software does health care use",
    source: "chatgpt",
    personas: ["Professional", "Parent"],
    position: 7.4,
    topic: "product-mgmt",
    type: "geo" as const,
    location: { country: "Germany", city: "Berlin", language: "German" },
    llms: ["ChatGPT"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 7,
    text: "What are the best product management tools available?",
    source: "reddit",
    personas: ["Student", "Outdoor"],
    position: 7.25,
    topic: "product-mgmt",
    type: "seo" as const,
    location: { country: "France", city: "Paris", language: "French" },
    llms: ["Reddit"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 8,
    text: "what are the tools helpful in product launches",
    source: "google",
    personas: ["Professional"],
    position: 7.2,
    topic: "product-mgmt",
    type: "geo" as const,
    location: { country: "Japan", city: "Tokyo", language: "Japanese" },
    llms: ["Google"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 9,
    text: "best ergonomic office chairs for back pain relief",
    source: "chatgpt",
    personas: ["Professional", "Parent"],
    position: 6.8,
    topic: "ergonomics",
    type: "geo" as const,
    location: { country: "United States", city: "Los Angeles", language: "English" },
    llms: ["ChatGPT", "Gemini"],
    productSnippet: "Ergonomic Balance Ball Chair",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 10,
    text: "how to improve posture while working from home",
    source: "perplexity",
    personas: ["Professional", "Student"],
    position: 6.5,
    topic: "ergonomics",
    type: "seo" as const,
    location: { country: "United States", city: "Chicago", language: "English" },
    llms: ["Perplexity"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 11,
    text: "balance ball chair benefits for core strength",
    source: "gemini",
    personas: ["Outdoor", "Professional"],
    position: 6.2,
    topic: "fitness",
    type: "geo" as const,
    location: { country: "United States", city: "Austin", language: "English" },
    llms: ["Gemini"],
    productSnippet: "Balance Ball Chair for Core Training",
    product: "Gaiam Balance Ball Chair - Blue",
  },
  {
    id: 12,
    text: "active sitting solutions for office workers",
    source: "chatgpt",
    personas: ["Professional"],
    position: 5.9,
    topic: "ergonomics",
    type: "geo" as const,
    location: { country: "Canada", city: "Vancouver", language: "English" },
    llms: ["ChatGPT"],
    productSnippet: "",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 13,
    text: "wobble cushion exercises for stability training",
    source: "perplexity",
    personas: ["Outdoor", "Student"],
    position: 5.7,
    topic: "fitness",
    type: "seo" as const,
    location: { country: "United Kingdom", city: "Manchester", language: "English" },
    llms: ["Perplexity", "Gemini"],
    productSnippet: "Stability Training Cushion",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 14,
    text: "alternatives to traditional office chairs",
    source: "google",
    personas: ["Professional", "Parent"],
    position: 5.5,
    topic: "ergonomics",
    type: "geo" as const,
    location: { country: "Australia", city: "Melbourne", language: "English" },
    llms: ["Google"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 15,
    text: "how to reduce lower back pain at desk job",
    source: "chatgpt",
    personas: ["Professional"],
    position: 5.3,
    topic: "health",
    type: "seo" as const,
    location: { country: "United States", city: "Seattle", language: "English" },
    llms: ["ChatGPT", "Perplexity"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 16,
    text: "balance training equipment for home office",
    source: "gemini",
    personas: ["Outdoor", "Professional"],
    position: 5.1,
    topic: "fitness",
    type: "geo" as const,
    location: { country: "Germany", city: "Munich", language: "German" },
    llms: ["Gemini"],
    productSnippet: "Home Office Balance Equipment",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 17,
    text: "ergonomic seating options for small spaces",
    source: "perplexity",
    personas: ["Student", "Professional"],
    position: 4.9,
    topic: "ergonomics",
    type: "geo" as const,
    location: { country: "United States", city: "Boston", language: "English" },
    llms: ["Perplexity"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 18,
    text: "stability ball chair reviews and comparisons",
    source: "reddit",
    personas: ["Professional", "Parent"],
    position: 4.7,
    topic: "reviews",
    type: "seo" as const,
    location: { country: "Canada", city: "Montreal", language: "English" },
    llms: ["Reddit"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 19,
    text: "core strengthening while sitting at desk",
    source: "chatgpt",
    personas: ["Professional", "Outdoor"],
    position: 4.5,
    topic: "fitness",
    type: "geo" as const,
    location: { country: "Spain", city: "Madrid", language: "Spanish" },
    llms: ["ChatGPT"],
    productSnippet: "Desk Core Training Solution",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 20,
    text: "best balance cushions for office chairs",
    source: "google",
    personas: ["Professional"],
    position: 4.3,
    topic: "ergonomics",
    type: "seo" as const,
    location: { country: "Italy", city: "Rome", language: "Italian" },
    llms: ["Google"],
    productSnippet: "",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 21,
    text: "improve focus and concentration with active sitting",
    source: "perplexity",
    personas: ["Student", "Professional"],
    position: 4.1,
    topic: "productivity",
    type: "geo" as const,
    location: { country: "Netherlands", city: "Amsterdam", language: "Dutch" },
    llms: ["Perplexity", "Gemini"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
  {
    id: 22,
    text: "yoga ball chair for office use",
    source: "chatgpt",
    personas: ["Professional", "Parent"],
    position: 3.9,
    topic: "ergonomics",
    type: "geo" as const,
    location: { country: "United States", city: "Denver", language: "English" },
    llms: ["ChatGPT"],
    productSnippet: "Yoga Ball Office Chair",
    product: "Gaiam Balance Ball Chair - Blue",
  },
  {
    id: 23,
    text: "prevent slouching with ergonomic seating",
    source: "gemini",
    personas: ["Professional"],
    position: 3.7,
    topic: "health",
    type: "seo" as const,
    location: { country: "Sweden", city: "Stockholm", language: "Swedish" },
    llms: ["Gemini"],
    productSnippet: "",
    product: "Gaiam Balance Ball Chair - No-Roll Ergonomic Office Chair & Yoga Ball Chair for Home Office Desk",
  },
  {
    id: 24,
    text: "balance disc exercises for beginners",
    source: "perplexity",
    personas: ["Outdoor", "Student"],
    position: 3.5,
    topic: "fitness",
    type: "geo" as const,
    location: { country: "Brazil", city: "São Paulo", language: "Portuguese" },
    llms: ["Perplexity"],
    productSnippet: "Beginner Balance Training",
    product: "Gaiam Balance Disc Wobble Cushion Stability Core Trainer for Home or Office Desk Chair &...",
  },
  {
    id: 25,
    text: "affordable ergonomic chair alternatives",
    source: "reddit",
    personas: ["Student", "Professional"],
    position: 3.3,
    topic: "budget",
    type: "seo" as const,
    location: { country: "India", city: "Mumbai", language: "English" },
    llms: ["Reddit"],
    productSnippet: "",
    product: "Gaiam Classic Balance Ball Chair – Ergonomic Stability Chair for Desk & Office | Yoga Ball S...",
  },
]

const mockAnswers = [
  {
    date: "2025-01-15",
    llm: "ChatGPT",
    answer:
      "For small businesses seeking the best product management platforms, I recommend Asana, Monday.com, and Jira...",
    fullAnswer:
      "For small businesses seeking the best product management platforms, I recommend Asana, Monday.com, and Jira as top choices. Asana excels in task management and team collaboration with its intuitive interface and flexible project views. Monday.com offers excellent customization options and visual workflows that make it easy to track progress across multiple projects. Jira is particularly strong for software development teams with its robust issue tracking and agile project management features. Each platform offers different pricing tiers to accommodate growing businesses, with Asana starting at $10.99/user/month, Monday.com at $8/user/month, and Jira at $7.75/user/month. All three integrate well with popular tools like Slack, Google Drive, and Microsoft Teams, making them versatile choices for modern product teams.",
    rank: 1,
    personas: ["Small Business Owner", "Product Manager"],
  },
  {
    date: "2025-01-14",
    llm: "Perplexity",
    answer: "The top product management platforms for agile teams include Aha!, ProductPlan, and Roadmunk...",
    fullAnswer:
      "The top product management platforms for agile teams include Aha!, ProductPlan, and Roadmunk, each offering unique strengths for strategic planning and roadmapping. Aha! is a comprehensive solution that combines roadmapping, idea management, and strategic planning in one platform, making it ideal for enterprise teams that need to align product strategy with company goals. ProductPlan focuses on visual roadmapping with drag-and-drop functionality and real-time collaboration features, perfect for teams that stakeholder communication. Roadmunk specializes in creating beautiful, presentation-ready roadmaps with multiple view options including timeline, swimlane, and portfolio views. These platforms typically range from $59-$149 per user per month, with enterprise pricing available for larger organizations. They all support agile methodologies and integrate with development tools like Jira, Azure DevOps, and GitHub.",
    rank: 3,
    personas: ["Agile Team Lead", "Scrum Master"],
  },
  {
    date: "2025-01-13",
    llm: "ChatGPT",
    answer: "Based on recent reviews, the best product management tools are Productboard, Pendo, and Amplitude...",
    fullAnswer:
      "Based on recent reviews, the best product management tools are Productboard, Pendo, and Amplitude, each serving different aspects of the product lifecycle. Productboard stands out for its customer feedback aggregation and prioritization framework, helping teams make data-driven decisions about what to build next. It includes features like user research repositories, feature scoring, and roadmap sharing capabilities. Pendo combines product analytics with in-app guidance and feedback collection, making it excellent for SaaS companies looking to improve user adoption and retention. Amplitude focuses on behavioral analytics and experimentation, providing deep insights into how users interact with your product through event tracking and cohort analysis. Pricing varies significantly: Productboard starts at $20/user/month, Pendo offers custom enterprise pricing, and Amplitude has a free tier with paid plans starting at $49/month. These tools are particularly valuable for product-led growth companies.",
    rank: 2,
    personas: ["Product Manager", "Data Analyst"],
  },
]

function PromptsPage() {
  const [selectedProduct, setSelectedProduct] = useState("product-1")
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<(typeof mockPrompts)[0] | null>(null)
  const [isQueryDetailOpen, setIsQueryDetailOpen] = useState(false)
  const [expandedAnswers, setExpandedAnswers] = useState<number[]>([])

  const [isDetailedAnswerOpen, setIsDetailedAnswerOpen] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<(typeof mockAnswers)[0] | null>(null)

  const [filterLLM, setFilterLLM] = useState("all")
  const [filterLanguage, setFilterLanguage] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterProduct, setFilterProduct] = useState("all")

  const searchParams = useSearchParams()
  const { t } = useTranslation()

  useEffect(() => {
    const productParam = searchParams.get("product")
    if (productParam) {
      // Find the matching product by checking if the param starts with the product name
      const matchingProduct = trackedProducts.find((p) => p.name !== "All Products" && productParam.startsWith(p.name))
      if (matchingProduct) {
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

  const handleSelectAll = () => {
    if (selectedPrompts.length === filteredPrompts.length && filteredPrompts.length > 0) {
      setSelectedPrompts([])
    } else {
      setSelectedPrompts(filteredPrompts.map((p) => p.id))
    }
  }

  const handleSelectPrompt = (id: number) => {
    setSelectedPrompts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

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

  const handleQueryClick = (query: (typeof mockPrompts)[0]) => {
    setSelectedQuery(query)
    setIsQueryDetailOpen(true)
  }

  const handleAnswerClick = (answer: (typeof mockAnswers)[0]) => {
    setSelectedAnswer(answer)
    setIsDetailedAnswerOpen(true)
  }

  const handleBackToResponses = () => {
    setIsDetailedAnswerOpen(false)
    setSelectedAnswer(null)
  }

  const [newPromptText, setNewPromptText] = useState("")
  const [locationInput, setLocationInput] = useState("")
  const [locations, setLocations] = useState<string[]>([])
  const [personasInput, setPersonasInput] = useState("")
  const [personas, setPersonas] = useState<string[]>([])
  const [selectedEngines, setSelectedEngines] = useState<string[]>([])

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && locationInput.trim()) {
      e.preventDefault()
      if (!locations.includes(locationInput.trim())) {
        setLocations([...locations, locationInput.trim()])
      }
      setLocationInput("")
    }
  }

  const handlePersonasKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && personasInput.trim()) {
      e.preventDefault()
      if (!personas.includes(personasInput.trim())) {
        setPersonas([...personas, personasInput.trim()])
      }
      setPersonasInput("")
    }
  }

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location))
  }

  const removePersona = (persona: string) => {
    setPersonas(personas.filter((p) => p !== persona))
  }

  const toggleAnswerExpansion = (index: number) => {
    setExpandedAnswers((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {currentProduct?.domain && (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${currentProduct.domain}&sz=32`}
                  alt={`${currentProduct.name} logo`}
                  className="w-6 h-6 flex-shrink-0"
                />
              )}
              <h1 className="text-xl font-semibold text-foreground">
                {filteredPrompts.length} prompts for "{currentProduct?.name}"
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your prompts to optimize for specific locations, personas, and LLMs
            </p>
            <p className="text-sm text-muted-foreground">Last queried 28 Jun, 25</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">169 / 200 Prompts Added</span>
            <Dialog open={isAddPromptOpen} onOpenChange={setIsAddPromptOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Prompt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Prompt</DialogTitle>
                  <DialogDescription>
                    Configure targeting for your prompt across locations, personas, and engines.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt-text">Prompt</Label>
                    <Textarea
                      id="prompt-text"
                      placeholder="Enter your prompt text..."
                      value={newPromptText}
                      onChange={(e) => setNewPromptText(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Engines</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["ChatGPT", "Perplexity", "Gemini"].map((engine) => (
                        <div key={engine} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`engine-${engine}`}
                            checked={selectedEngines.includes(engine)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedEngines([...selectedEngines, engine])
                              } else {
                                setSelectedEngines(selectedEngines.filter((e) => e !== engine))
                              }
                            }}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`engine-${engine}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {engine}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personas-input">Personas</Label>
                    <Input
                      id="personas-input"
                      placeholder="Type and press Enter or comma to add personas..."
                      value={personasInput}
                      onChange={(e) => setPersonasInput(e.target.value)}
                      onKeyDown={handlePersonasKeyDown}
                    />
                    {personas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {personas.map((persona) => (
                          <Badge
                            key={persona}
                            variant="secondary"
                            className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 gap-1 pr-1"
                          >
                            {persona}
                            <button
                              onClick={() => removePersona(persona)}
                              className="ml-1 hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">Press Enter or comma to add each persona</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location-input">Location</Label>
                    <Input
                      id="location-input"
                      placeholder="Type and press Enter or comma to add locations..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      onKeyDown={handleLocationKeyDown}
                    />
                    {locations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {locations.map((location) => (
                          <Badge
                            key={location}
                            variant="secondary"
                            className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 gap-1 pr-1"
                          >
                            {location}
                            <button
                              onClick={() => removeLocation(location)}
                              className="ml-1 hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Press Enter or comma to add each location (e.g., "United States", "San Francisco", "English")
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPromptOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPrompt} disabled={!newPromptText.trim()}>
                    Add Prompt
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg border border-border">
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />

          <Select value={filterProduct} onValueChange={setFilterProduct}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by product" />
            </SelectTrigger>
            <SelectContent>
              {trackedProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name === "All Products" ? "All Products" : product.name.substring(0, 30) + "..."}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterLLM} onValueChange={setFilterLLM}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All LLMs" />
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
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Languages" />
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
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="geo">GEO</SelectItem>
              <SelectItem value="seo">SEO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[45%]">Prompts</TableHead>
                <TableHead className="w-[8%]">Source</TableHead>
                <TableHead className="w-[15%]">Persona</TableHead>
                <TableHead className="w-[15%]">Location</TableHead>
                <TableHead className="w-[12%] text-right">Average Position</TableHead>
                <TableHead className="w-[5%] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrompts.map((prompt) => (
                <TableRow
                  key={prompt.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleQueryClick(prompt)}
                >
                  <TableCell className="font-medium text-sm">{prompt.text}</TableCell>
                  <TableCell>
                    <SourceIcon source={prompt.source} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {prompt.personas.map((persona, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                        >
                          {persona}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs font-medium">
                        {prompt.location.city}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-medium">
                        {prompt.location.country}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{prompt.position}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isQueryDetailOpen} onOpenChange={setIsQueryDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-xl mb-2">{selectedQuery?.text}</DialogTitle>
                <Badge variant={selectedQuery?.type === "geo" ? "default" : "secondary"} className="text-xs">
                  {selectedQuery?.type === "geo" ? "GEO Query" : "SEO Query"}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Query Settings</h3>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  defaultValue={`${selectedQuery?.location.country}, ${selectedQuery?.location.city}, ${selectedQuery?.location.language}`}
                  placeholder="e.g., United States, San Francisco, English"
                />
                <p className="text-xs text-muted-foreground">Enter location details (country, city, language)</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  LLMs Targeted
                </Label>
                <div className="flex flex-wrap gap-2">
                  {["ChatGPT", "Perplexity", "Gemini"].map((llm) => (
                    <Badge
                      key={llm}
                      variant={selectedQuery?.llms.includes(llm) ? "default" : "outline"}
                      className="cursor-pointer"
                    >
                      {llm}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Product Snippet</Label>
                <Input defaultValue={selectedQuery?.productSnippet} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Answers for this Query</h3>
              <div className="border border-border rounded-lg divide-y divide-border">
                {mockAnswers.map((answer, idx) => (
                  <div
                    key={idx}
                    className="p-4 space-y-2 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => handleAnswerClick(answer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {answer.llm}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{answer.date}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Rank #{answer.rank}
                      </Badge>
                    </div>

                    <p className="text-sm text-foreground">{answer.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQueryDetailOpen(false)}>
              Close
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailedAnswerOpen} onOpenChange={setIsDetailedAnswerOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToResponses}
                className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Responses
              </Button>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm">
                  {selectedAnswer?.llm}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedAnswer?.date}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                Rank #{selectedAnswer?.rank}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Full Response</h3>
              <p className="text-sm text-foreground leading-relaxed">{selectedAnswer?.fullAnswer}</p>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Targeted Personas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAnswer?.personas.map((persona, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-sm bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                  >
                    {persona}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Query Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Query:</span>
                  <span className="text-foreground">{selectedQuery?.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">
                    {selectedQuery?.location.city}, {selectedQuery?.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="text-foreground">{selectedQuery?.location.language}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleBackToResponses}>
              Back
            </Button>
            <Button>Copy Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PromptsPage
