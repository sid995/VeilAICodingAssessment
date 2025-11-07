"use client"

import { useState } from "react"
import { ChevronDown, RefreshCw, Plus, Building2, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/hooks/use-language"
import { useOrganization } from "@/hooks/use-organization"

export function TopBar() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { currentOrganization, setCurrentOrganization, selectedStorefront, setSelectedStorefront, organizations } =
    useOrganization()

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  const getStorefrontLabel = () => {
    if (selectedStorefront === "all") return t("allStorefronts")
    if (selectedStorefront === "shopify") return "Shopify"
    if (selectedStorefront === "amazon") return "Amazon"
    return t("allStorefronts")
  }

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      {/* Left Section - Organization & Storefront Selectors */}
      <div className="flex items-center gap-2">
        {/* Organization Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 h-10 bg-transparent">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              {currentOrganization.name}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">
              {t("switchOrganization")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setCurrentOrganization(org)}
                className={`flex flex-col items-start py-3 ${org.id === currentOrganization.id ? "bg-accent" : ""}`}
              >
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-muted-foreground">
                  {org.storefronts.length} {t("storefronts")}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 py-3">
              <div className="flex items-center justify-center w-full">
                <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("addNewOrganization")}
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Storefront Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 h-10 bg-transparent">
              <Store className="w-4 h-4 text-muted-foreground" />
              {getStorefrontLabel()}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">
              {t("filterByStorefront")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setSelectedStorefront("all")}
              className={selectedStorefront === "all" ? "bg-accent" : ""}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                {t("allStorefronts")}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedStorefront("shopify")}
              className={selectedStorefront === "shopify" ? "bg-accent" : ""}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Shopify
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedStorefront("amazon")}
              className={selectedStorefront === "amazon" ? "bg-accent" : ""}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Amazon
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-transparent"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Right Section - Language, User */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 px-3 gap-2">
              {language === "en" && (
                <>
                  <span>🇺🇸</span>
                  <span className="text-sm font-medium">EN</span>
                </>
              )}
              {language === "zh" && (
                <>
                  <span>🇨🇳</span>
                  <span className="text-sm font-medium">中文</span>
                </>
              )}
              {language === "es" && (
                <>
                  <span>🇪🇸</span>
                  <span className="text-sm font-medium">ES</span>
                </>
              )}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
              <span className="mr-2">🇺🇸</span> English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("zh")} className={language === "zh" ? "bg-accent" : ""}>
              <span className="mr-2">🇨🇳</span> 中文
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-accent" : ""}>
              <span className="mr-2">🇪🇸</span> Español
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3 h-10 px-2">
              <Avatar className="w-8 h-8 bg-teal-500">
                <AvatarFallback className="bg-teal-500 text-white text-sm font-medium">CZ</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <div className="text-sm font-medium">Christine Zhang</div>
                <div className="text-xs text-muted-foreground">christine_zhang@college.harvard.edu</div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("profileSettings")}</DropdownMenuItem>
            <DropdownMenuItem>{t("billing")}</DropdownMenuItem>
            <DropdownMenuItem>{t("team")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">{t("logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
