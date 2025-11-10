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
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-b from-background to-[#F7F6F3]">
      <div className="flex-shrink-0 border-b border-[#E3DED8]/60 bg-background/30 backdrop-blur-sm shadow-sm">
        {/* Product Header */}
        <div className="px-8 pt-6 pb-4 border-b border-[#E3DED8]/40">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {currentProduct?.domain && (
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF7D55]/10 to-[#FB7D5C]/10 ring-1 ring-[#FF7D55]/20 shadow-sm">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${currentProduct.domain}&sz=32`}
                      alt={`${currentProduct.name} logo`}
                      className="w-7 h-7 flex-shrink-0"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-lg font-bold text-[#1E1D1B]">
                      {currentProduct?.name}
                    </h1>
                  </div>
                  {currentProduct?.domain && (
                    <p className="text-xs text-[#934F3C]/60 font-medium">{currentProduct.domain}</p>
                  )}
                </div>
              </div>
            </div>

            <Dialog open={isAddPromptOpen} onOpenChange={setIsAddPromptOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer gap-2 bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30">
                  <Plus className="w-4 h-4" />
                  Add Prompt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#E3DED8]/70 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#1E1D1B]">Add Prompt</DialogTitle>
                  <DialogDescription className="text-[#934F3C]/80">
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
                  <Button variant="outline" onClick={() => setIsAddPromptOpen(false)} className="border-[#E3DED8] hover:bg-[#F7F6F3]">
                    Cancel
                  </Button>
                  <Button onClick={handleAddPrompt} disabled={!newPromptText.trim()} className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30">
                    Add Prompt
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="px-8 py-4 bg-[#F7F6F3]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Total Prompts */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#FF7D55]">{filteredPrompts.length}</span>
                  <span className="text-xs text-[#934F3C]/70 font-medium uppercase tracking-wide">Active Prompts</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-[#E3DED8]" />

              {/* Capacity */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1E1D1B]">169 / 200</span>
                  <span className="text-xs text-[#934F3C]/70">Prompts Used</span>
                </div>
                <div className="w-32 h-1.5 bg-[#E3DED8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] rounded-full transition-all duration-300"
                    style={{ width: `${(169 / 200) * 100}%` }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-[#E3DED8]" />

              {/* Last Updated */}
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#FCBBA9]/20">
                  <svg className="w-4 h-4 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#934F3C]/60 font-medium">Last Queried</span>
                  <span className="text-sm font-semibold text-[#1E1D1B]">28 Jun, 25</span>
                </div>
              </div>
            </div>

            {/* Info Text */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FCBBA9]/10 border border-[#FF7D55]/10">
              <svg className="w-4 h-4 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-[#934F3C]/70">
                Target specific locations, personas & LLMs
              </span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-8 py-5 bg-gradient-to-br from-[#F7F6F3]/50 to-[#FCBBA9]/5 border-b border-[#E3DED8]/40">
          <div className="flex items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                <SelectTrigger className="h-10 min-w-[180px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <SelectValue placeholder="All Products" />
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
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <SelectValue placeholder="All LLMs" />
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
                <SelectTrigger className="h-10 w-[140px] bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20 transition-all">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <SelectValue placeholder="All Languages" />
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
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <SelectValue placeholder="All Types" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="geo">GEO</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {(searchQuery || filterProduct !== "all" || filterLLM !== "all" || filterLanguage !== "all" || filterType !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setFilterProduct("all")
                    setFilterLLM("all")
                    setFilterLanguage("all")
                    setFilterType("all")
                  }}
                  className="h-10 px-3 border-[#E3DED8] hover:bg-[#FCBBA9]/10 hover:border-[#FF7D55]/30 text-[#934F3C] hover:text-[#FF7D55] transition-all"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(filterProduct !== "all" || filterLLM !== "all" || filterLanguage !== "all" || filterType !== "all") && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E3DED8]/30">
              <span className="text-xs font-medium text-[#934F3C]/60">Active Filters:</span>
              <div className="flex flex-wrap gap-2">
                {filterProduct !== "all" && (
                  <Badge className="bg-gradient-to-r from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border-none px-2.5 py-1 gap-1.5">
                    Product: {trackedProducts.find(p => p.id === filterProduct)?.name.substring(0, 20)}...
                    <button onClick={() => setFilterProduct("all")} className="hover:text-[#FF7D55] transition-colors">
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
                    <button onClick={() => setFilterLanguage("all")} className="hover:text-[#FF7D55] transition-colors">
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
          )}
        </div>
      </div>

      {/* Modern Card-Style Table */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="px-8 pt-4 pb-6">
          {filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F7F6F3] to-[#FCBBA9]/20 mb-6">
                <svg className="w-16 h-16 text-[#FF7D55]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E1D1B] mb-2">No prompts found</h3>
              <p className="text-sm text-[#934F3C]/70 text-center max-w-md mb-6">
                Try adjusting your filters or search query to find matching prompts for this product.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setFilterProduct("all")
                  setFilterLLM("all")
                  setFilterLanguage("all")
                  setFilterType("all")
                }}
                className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPrompts.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className="group relative bg-white rounded-xl border border-[#E3DED8]/60 hover:border-[#FF7D55]/30 hover:shadow-lg hover:shadow-[#FF7D55]/5 transition-all duration-300 overflow-hidden"
                >
                  {/* Rank Badge - Top Left Corner */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#FF7D55] to-[#FB7D5C] shadow-lg shadow-[#FF7D55]/20">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-white">{prompt.position}</span>
                    </div>
                  </div>

                  {/* Type Badge - Top Right Corner */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge
                      className={`text-xs font-semibold px-3 py-1 ${prompt.type === "geo"
                        ? "bg-[#70A2CB]/10 text-[#70A2CB] border border-[#70A2CB]/30"
                        : "bg-[#E3DED8]/60 text-[#934F3C] border border-[#E3DED8]"
                        }`}
                    >
                      {prompt.type === "geo" ? "GEO" : "SEO"}
                    </Badge>
                  </div>

                  <div className="p-6 pt-14">
                    {/* Prompt Text */}
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-[#1E1D1B] leading-relaxed mb-2 pr-16 group-hover:text-[#FF7D55] transition-colors">
                        {prompt.text}
                      </h3>
                      {prompt.productSnippet && (
                        <p className="text-xs text-[#934F3C]/60 italic">
                          Snippet: {prompt.productSnippet}
                        </p>
                      )}
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#E3DED8]/40">
                      {/* Source */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-xs font-semibold text-[#934F3C]/70 uppercase tracking-wide">Source</span>
                        </div>
                        <div className="inline-flex p-2 rounded-lg bg-[#F7F6F3] border border-[#E3DED8]/50 group-hover:border-[#FF7D55]/20 transition-colors">
                          <SourceIcon source={prompt.source} />
                        </div>
                      </div>

                      {/* Personas */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-xs font-semibold text-[#934F3C]/70 uppercase tracking-wide">Personas</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {prompt.personas.slice(0, 3).map((persona, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-br from-[#FCBBA9]/70 to-[#F0A490]/50 text-[#934F3C] border border-[#F0A490]/30"
                            >
                              {persona}
                            </span>
                          ))}
                          {prompt.personas.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#E3DED8]/60 text-[#934F3C]">
                              +{prompt.personas.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-semibold text-[#934F3C]/70 uppercase tracking-wide">Location</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-[#1E1D1B]">{prompt.location.city}</p>
                          <p className="text-xs text-[#934F3C]/70">{prompt.location.country}</p>
                          <p className="text-xs text-[#934F3C]/50">{prompt.location.language}</p>
                        </div>
                      </div>

                      {/* LLMs */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span className="text-xs font-semibold text-[#934F3C]/70 uppercase tracking-wide">LLMs</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {prompt.llms.map((llm, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F7F6F3] text-[#1E1D1B] border border-[#E3DED8]/50"
                            >
                              {llm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Bottom Right */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQueryClick(prompt)}
                      className="h-9 px-3 bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 hover:bg-[#FCBBA9]/10 text-[#1E1D1B] hover:text-[#FF7D55] shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-[#934F3C]/70 hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Hover Indicator - Left Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF7D55] to-[#FB7D5C] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isQueryDetailOpen} onOpenChange={setIsQueryDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto border-[#E3DED8] shadow-xl bg-white">
          <DialogHeader className="border-b border-[#E3DED8]/40 pb-5">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <DialogTitle className="text-xl mb-3 font-semibold text-[#1E1D1B] leading-relaxed pr-8">
                  {selectedQuery?.text}
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-xs px-2.5 py-1 ${selectedQuery?.type === "geo"
                      ? "bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] text-white border-none"
                      : "bg-[#E3DED8]/50 text-[#934F3C] border border-[#E3DED8]"
                      }`}
                  >
                    {selectedQuery?.type === "geo" ? "GEO Query" : "SEO Query"}
                  </Badge>
                  <span className="text-sm text-[#934F3C]/70">
                    Position: <span className="font-semibold text-[#FF7D55]">#{selectedQuery?.position}</span>
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Query Settings Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#1E1D1B]">Query Configuration</h3>

              {/* Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-[#1E1D1B]">
                  <MapPin className="w-4 h-4 text-[#FF7D55]" />
                  Location Targeting
                </Label>
                <Input
                  defaultValue={`${selectedQuery?.location.country}, ${selectedQuery?.location.city}, ${selectedQuery?.location.language}`}
                  placeholder="e.g., United States, San Francisco, English"
                  className="border-[#E3DED8] focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20"
                />
                <p className="text-xs text-[#934F3C]/60">Format: Country, City, Language</p>
              </div>

              {/* LLMs Targeted */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm text-[#1E1D1B]">
                  <Globe className="w-4 h-4 text-[#FF7D55]" />
                  LLMs Targeted
                </Label>
                <div className="flex flex-wrap gap-2">
                  {["ChatGPT", "Perplexity", "Gemini"].map((llm) => (
                    <Badge
                      key={llm}
                      className={`cursor-pointer px-3 py-1 text-xs transition-all ${selectedQuery?.llms.includes(llm)
                        ? "bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] text-white border-none"
                        : "bg-white text-[#934F3C] border-[#E3DED8] hover:border-[#FF7D55]/30"
                        }`}
                    >
                      {llm}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Product Snippet */}
              <div className="space-y-2">
                <Label className="text-sm text-[#1E1D1B]">Product Snippet</Label>
                <Input
                  defaultValue={selectedQuery?.productSnippet}
                  placeholder="Enter product snippet..."
                  className="border-[#E3DED8] focus:border-[#FF7D55]/50 focus:ring-[#FF7D55]/20"
                />
              </div>
            </div>

            {/* Answers Section */}
            <div className="space-y-4 pt-4 border-t border-[#E3DED8]/40">
              <h3 className="text-sm font-semibold text-[#1E1D1B]">LLM Responses</h3>

              <div className="space-y-3">
                {mockAnswers.map((answer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-[#E3DED8] hover:border-[#FF7D55]/40 hover:shadow-sm cursor-pointer transition-all duration-200"
                    onClick={() => handleAnswerClick(answer)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs border-[#E3DED8]">
                          {answer.llm}
                        </Badge>
                        <span className="text-xs text-[#934F3C]/60">
                          {answer.date}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-[#FF7D55]/10 text-[#FF7D55] border border-[#FF7D55]/20">
                        Rank #{answer.rank}
                      </Badge>
                    </div>

                    <p className="text-sm text-[#1E1D1B] leading-relaxed">{answer.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-[#E3DED8]/40 pt-5 gap-3">
            <Button
              variant="outline"
              onClick={() => setIsQueryDetailOpen(false)}
              className="border-[#E3DED8] hover:bg-[#F7F6F3] text-[#1E1D1B]"
            >
              Close
            </Button>
            <Button className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-md hover:shadow-lg transition-all">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailedAnswerOpen} onOpenChange={setIsDetailedAnswerOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-[#E3DED8]/70 shadow-2xl">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToResponses}
                className="gap-2 -ml-2 text-[#934F3C] hover:text-[#1E1D1B] hover:bg-[#F7F6F3] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Responses
              </Button>
            </div>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm border-[#E3DED8] shadow-sm">
                  {selectedAnswer?.llm}
                </Badge>
                <span className="text-sm text-[#934F3C]/70 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF7D55]/60"></span>
                  {selectedAnswer?.date}
                </span>
              </div>
              <Badge variant="secondary" className="text-sm bg-gradient-to-br from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border border-[#F0A490]/50 shadow-sm">
                Rank #{selectedAnswer?.rank}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-[#F7F6F3] to-[#FCBBA9]/10 border border-[#E3DED8]/40">
              <h3 className="text-base font-semibold text-[#1E1D1B] flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#FF7D55] to-[#FB7D5C] rounded-full"></span>
                Full Response
              </h3>
              <p className="text-sm text-[#1E1D1B] leading-relaxed">{selectedAnswer?.fullAnswer}</p>
            </div>

            <div className="pt-4 border-t border-[#E3DED8]/40">
              <h3 className="text-sm font-semibold text-[#1E1D1B] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-[#FF7D55] to-[#FB7D5C] rounded-full"></span>
                Targeted Personas
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedAnswer?.personas.map((persona, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-sm bg-gradient-to-br from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border border-[#F0A490]/50 shadow-sm"
                  >
                    {persona}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3DED8]/40">
              <h3 className="text-sm font-semibold text-[#1E1D1B] mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-[#FF7D55] to-[#FB7D5C] rounded-full"></span>
                Query Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F6F3]">
                  <span className="text-[#934F3C] font-medium min-w-[80px]">Query:</span>
                  <span className="text-[#1E1D1B] flex-1">{selectedQuery?.text}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F6F3]">
                  <span className="text-[#934F3C] font-medium min-w-[80px]">Location:</span>
                  <span className="text-[#1E1D1B]">
                    {selectedQuery?.location.city}, {selectedQuery?.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F6F3]">
                  <span className="text-[#934F3C] font-medium min-w-[80px]">Language:</span>
                  <span className="text-[#1E1D1B]">{selectedQuery?.location.language}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleBackToResponses} className="border-[#E3DED8] hover:bg-[#F7F6F3]">
              Back
            </Button>
            <Button className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30">Copy Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PromptsPage

