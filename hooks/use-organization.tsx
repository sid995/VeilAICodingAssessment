"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Storefront = "all" | "shopify" | "amazon"

interface Organization {
  id: string
  name: string
  storefronts: Array<{
    type: "shopify" | "amazon"
    name: string
    url: string
  }>
}

interface OrganizationContextType {
  currentOrganization: Organization
  setCurrentOrganization: (org: Organization) => void
  selectedStorefront: Storefront
  setSelectedStorefront: (storefront: Storefront) => void
  organizations: Organization[]
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

// Mock organizations data
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Semaine",
    storefronts: [
      { type: "shopify", name: "Semaine Shopify", url: "https://semaine.com" },
      { type: "amazon", name: "Semaine Amazon", url: "https://amazon.com/semaine" },
    ],
  },
  {
    id: "2",
    name: "Handless Handles",
    storefronts: [
      { type: "shopify", name: "Handless Handles Shopify", url: "https://handlesshandles.com" },
      { type: "amazon", name: "Handless Handles Amazon", url: "https://amazon.com/handless" },
    ],
  },
  {
    id: "3",
    name: "Chanel",
    storefronts: [
      { type: "shopify", name: "Chanel Shopify", url: "https://chanel.com" },
      { type: "amazon", name: "Chanel Amazon", url: "https://amazon.com/chanel" },
    ],
  },
]

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Organization>(mockOrganizations[0])
  const [selectedStorefront, setSelectedStorefront] = useState<Storefront>("all")

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        setCurrentOrganization,
        selectedStorefront,
        setSelectedStorefront,
        organizations: mockOrganizations,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}
