"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"

export default function PricingPage() {
  const { t, language } = useLanguage()

  useEffect(() => {
    console.log("[v0] Pricing page mounted")
  }, [])

  useEffect(() => {
    // This ensures the component updates when language changes
  }, [language])

  const plans = [
    {
      name: t("starterPlanName"),
      price: t("starterPlanPrice"),
      period: t("starterPlanPeriod"),
      description: t("starterPlanDesc"),
      features: [
        { text: t("starterFeature1"), included: true },
        { text: t("starterFeature2"), included: true },
        { text: t("starterFeature3"), included: true },
        { text: t("starterFeature4"), included: true },
        { text: t("starterFeature5"), included: true },
        { text: t("starterFeature6"), included: false },
        { text: t("starterFeature7"), included: false },
      ],
      cta: t("getStarted"),
      href: "/action-center",
      popular: false,
    },
    {
      name: t("proPlanName"),
      price: t("proPlanPrice"),
      period: t("proPlanPeriod"),
      description: t("proPlanDesc"),
      features: [
        { text: t("proFeature1"), included: true },
        { text: t("proFeature2"), included: true },
        { text: t("proFeature3"), included: true },
        { text: t("proFeature4"), included: true },
        { text: t("proFeature5"), included: true },
        { text: t("proFeature6"), included: true },
        { text: t("proFeature7"), included: false },
        { text: t("proFeature8"), included: false },
      ],
      cta: t("getStarted"),
      href: "/action-center",
      popular: true,
    },
    {
      name: t("enterprisePlanName"),
      price: t("enterprisePlanPrice"),
      period: t("enterprisePlanPeriod"),
      description: t("enterprisePlanDesc"),
      features: [
        { text: t("enterpriseFeature1"), included: true },
        { text: t("enterpriseFeature2"), included: true },
        { text: t("enterpriseFeature3"), included: true },
        { text: t("enterpriseFeature4"), included: true },
        { text: t("enterpriseFeature5"), included: true },
        { text: t("enterpriseFeature6"), included: true },
        { text: t("enterpriseFeature7"), included: true },
      ],
      cta: t("contactSales"),
      href: "https://calendly.com/julia-veilai/30min?month=2025-10",
      external: true,
      popular: false,
    },
  ]

  useEffect(() => {
    console.log(
      "[v0] Pricing plans:",
      plans.map((p) => ({ name: p.name, cta: p.cta, href: p.href })),
    )
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("pricingTitle")}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            {t("pricingSubtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                plan.popular ? "border-teal-500 shadow-lg shadow-teal-500/20 scale-105" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <CardHeader className="space-y-4 pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base leading-relaxed">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-8">
                {plan.external ? (
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-teal-500 hover:bg-teal-600 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-200"
                    }`}
                    size="lg"
                    onClick={() => console.log(`[v0] Clicking ${plan.cta} button for ${plan.name}`)}
                  >
                    <a href={plan.href} target="_blank" rel="noopener noreferrer">
                      {plan.cta}
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-teal-500 hover:bg-teal-600 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-200"
                    }`}
                    size="lg"
                    onClick={() => console.log(`[v0] Clicking ${plan.cta} button for ${plan.name}`)}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
