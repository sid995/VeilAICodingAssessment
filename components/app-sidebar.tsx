"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { VeilLogo } from "./veil-logo"
import { useLanguage } from "@/hooks/use-language"
import { LayoutGrid, Lightbulb, HelpCircle, User, CreditCard, Search, Package, ChevronLeft } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"

const navigationItems = [
  { name: "Visibility", href: "/visibility", icon: LayoutGrid },
  {
    name: "Products",
    href: "/products?tracked=true",
    icon: Package,
  },
]

const actionItems = [
  { name: "Prompts", href: "/prompts", icon: Search },
  { name: "Recommendations", href: "/recommendations", icon: Lightbulb },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "border-r border-border bg-sidebar flex flex-col h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-56",
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        {!isCollapsed && <VeilLogo />}
        {isCollapsed && (
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold">V</span>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-3">
          <div className="relative">
            <Input placeholder={t("search")} className="pl-8 h-9 bg-background" />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">⌘K</span>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="mb-6">
          {!isCollapsed && (
            <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("analytics")}
            </h3>
          )}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href.split("?")[0] + "/")

              return (
                <div key={item.href}>
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center p-2 rounded-md text-sm transition-colors",
                              isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{t(item.name.toLowerCase())}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {t(item.name.toLowerCase())}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div>
          {!isCollapsed && (
            <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("action")}
            </h3>
          )}
          <div className="space-y-1">
            {actionItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <div key={item.href}>
                  {isCollapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center p-2 rounded-md text-sm transition-colors",
                              isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{t(item.name.toLowerCase())}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {t(item.name.toLowerCase())}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-1">
        {isCollapsed ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/pricing"
                    className={cn(
                      "flex items-center justify-center p-2 rounded-md text-sm transition-colors",
                      pathname === "/pricing"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <CreditCard className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t("pricing")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://calendly.com/julia-veilai/30min?month=2025-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{t("support")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/profile"
                    className="flex items-center justify-center p-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Julia Hudson</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <>
            <Link
              href="/pricing"
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                pathname === "/pricing"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <CreditCard className="w-4 h-4" />
              {t("pricing")}
            </Link>
            <a
              href="https://calendly.com/julia-veilai/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {t("support")}
            </a>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <User className="w-4 h-4" />
              Julia Hudson
            </Link>
          </>
        )}
      </div>

      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("w-full transition-all", isCollapsed ? "justify-center" : "justify-start")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed ? "rotate-180" : "")} />
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </aside>
  )
}
