export interface Location {
  country: string
  city: string
  language: string
}

export interface Prompt {
  id: number
  text: string
  source: string
  personas: string[]
  position: number
  topic: string
  type: "geo" | "seo"
  location: Location
  llms: string[]
  productSnippet: string
  product: string
}

export interface Answer {
  date: string
  llm: string
  answer: string
  fullAnswer: string
  rank: number
  personas: string[]
}

export interface Product {
  id: string
  name: string
  count: number
  domain: string
}

