
"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Target, BarChart3, MessageSquare, Award, Search, Zap, Hash, TrendingUp, Eye } from "lucide-react"

export const CompetitorLensSheet = ({
  competitorLensOpen,
  setCompetitorLensOpen,
  selectedCompetitor,
  competitorDetails,
}: any) => {
  return (
    <Sheet open={competitorLensOpen} onOpenChange={setCompetitorLensOpen}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="p-6 border-b border-[#E3DED8]/50 bg-gradient-to-r from-[#FF7D55]/5 to-[#DE7053]/5">
            <SheetHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#FF7D55]/15 flex items-center justify-center">
                  <Target className="h-5 w-5 text-[#FF7D55]" />
                </div>
                <div>
                  <SheetTitle className="text-lg font-semibold text-[#1E1D1B]">Competitor Lens</SheetTitle>
                  <p className="text-sm font-medium text-[#934F3C]/70">{selectedCompetitor}</p>
                </div>
              </div>
              <SheetDescription className="text-sm text-[#934F3C]/60">
                Analyze why this competitor is ranking higher in AI responses
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-8">
              {/* Performance Overview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#FF7D55]/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-[#FF7D55]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Performance Overview</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-[#E3DED8]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#934F3C]/70">Visibility</span>
                      <Eye className="h-3 w-3 text-[#FF7D55]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1E1D1B]">
                      {competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance?.visibility ||
                        0}
                      %
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#E3DED8]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#934F3C]/70">Avg Position</span>
                      <Target className="h-3 w-3 text-[#DE7053]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1E1D1B]">
                      {competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance?.position || 0}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#E3DED8]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#934F3C]/70">Sentiment</span>
                      <Zap className="h-3 w-3 text-[#B86048]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1E1D1B]">
                      {competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance?.sentiment ||
                        0}
                      %
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#E3DED8]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#934F3C]/70">Share of Voice</span>
                      <Hash className="h-3 w-3 text-[#F0A490]" />
                    </div>
                    <div className="text-lg font-semibold text-[#1E1D1B]">
                      {competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance
                        ?.shareOfVoice || 0}
                      %
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Answer Excerpt Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#EECBC2]/30 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-[#DE7053]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Top Answer Excerpt</h4>
                </div>
                <div className="bg-gradient-to-br from-[#F7F6F3] to-[#EECBC2]/20 p-5 rounded-xl text-sm border border-[#E3DED8]/60 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#FF7D55] mt-2 flex-shrink-0"></div>
                    <p className="leading-relaxed text-[#1E1D1B]">
                      "{selectedCompetitor} offers{" "}
                      <mark className="bg-[#FCBBA9] text-[#1E1D1B] px-1 py-0.5 rounded">
                        comprehensive CRM features
                      </mark>{" "}
                      with{" "}
                      <mark className="bg-[#FCBBA9] text-[#1E1D1B] px-1 py-0.5 rounded">competitive pricing</mark>{" "}
                      starting at $45/month. Their platform includes{" "}
                      <mark className="bg-[#FCBBA9] text-[#1E1D1B] px-1 py-0.5 rounded">
                        email integration, sales automation
                      </mark>
                      , and{" "}
                      <mark className="bg-[#FCBBA9] text-[#1E1D1B] px-1 py-0.5 rounded">24/7 customer support</mark>."
                    </p>
                  </div>
                </div>
              </div>

              {/* Winning Claims Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#F7F6F3] flex items-center justify-center">
                    <Award className="h-4 w-4 text-[#B86048]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Winning Claims</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3DED8]/50 hover:border-[#FF7D55]/30 transition-colors">
                    <Badge
                      variant="secondary"
                      className="mt-0.5 bg-[#FF7D55] text-white font-semibold min-w-[24px] h-6 flex items-center justify-center"
                    >
                      1
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-[#1E1D1B] leading-relaxed">Specific pricing information ($45/month)</p>
                      <p className="text-xs text-[#934F3C]/60 mt-1">Clear pricing transparency builds trust</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3DED8]/50 hover:border-[#FF7D55]/30 transition-colors">
                    <Badge
                      variant="secondary"
                      className="mt-0.5 bg-[#FF7D55] text-white font-semibold min-w-[24px] h-6 flex items-center justify-center"
                    >
                      2
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-[#1E1D1B] leading-relaxed">
                        Clear feature list (email integration, sales automation)
                      </p>
                      <p className="text-xs text-[#934F3C]/60 mt-1">
                        Detailed feature descriptions help users understand value
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E3DED8]/50 hover:border-[#FF7D55]/30 transition-colors">
                    <Badge
                      variant="secondary"
                      className="mt-0.5 bg-[#FF7D55] text-white font-semibold min-w-[24px] h-6 flex items-center justify-center"
                    >
                      3
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-[#1E1D1B] leading-relaxed">
                        Support availability (24/7 customer support)
                      </p>
                      <p className="text-xs text-[#934F3C]/60 mt-1">Always-available support reduces user concerns</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Ranking Queries */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#F7F6F3] flex items-center justify-center">
                    <Search className="h-4 w-4 text-[#934F3C]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Top Ranking Queries</h4>
                </div>
                <div className="space-y-2">
                  {competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.topQueries.map(
                    (query: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg border border-[#E3DED8]/50 hover:border-[#FF7D55]/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-[#1E1D1B] leading-tight">{query.query}</p>
                          <div className="flex items-center gap-2 ml-2">
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 bg-[#FF7D55]/10 text-[#FF7D55] border-[#FF7D55]/20"
                            >
                              Rank #{query.rank}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#934F3C]/70">
                          <span className="px-2 py-0.5 bg-[#EECBC2]/30 rounded text-[#DE7053] font-medium">
                            {query.intent}
                          </span>
                          <span>•</span>
                          <span>Engines: {query.engines.join(", ")}</span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Competitive Comparison */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#B86048]/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-[#B86048]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Competitive Comparison</h4>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E3DED8]/50">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xs font-medium text-[#934F3C]/70 mb-1">Metric</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-[#934F3C]/70 mb-1">{selectedCompetitor}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-[#934F3C]/70 mb-1">Your Brand</div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-3">
                    {[
                      {
                        metric: "Visibility",
                        competitor:
                          competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance
                            ?.visibility || 0,
                        yourBrand: competitorDetails["Your Brand"]?.performance?.visibility || 0,
                        unit: "%",
                      },
                      {
                        metric: "Avg Position",
                        competitor:
                          competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance
                            ?.position || 0,
                        yourBrand: competitorDetails["Your Brand"]?.performance?.position || 0,
                        unit: "",
                      },
                      {
                        metric: "Sentiment",
                        competitor:
                          competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance
                            ?.sentiment || 0,
                        yourBrand: competitorDetails["Your Brand"]?.performance?.sentiment || 0,
                        unit: "%",
                      },
                      {
                        metric: "Share of Voice",
                        competitor:
                          competitorDetails[selectedCompetitor as keyof typeof competitorDetails]?.performance
                            ?.shareOfVoice || 0,
                        yourBrand: competitorDetails["Your Brand"]?.performance?.shareOfVoice || 0,
                        unit: "%",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 gap-4 py-2 border-b border-[#E3DED8]/30 last:border-b-0"
                      >
                        <div className="text-sm font-medium text-[#1E1D1B]">{item.metric}</div>
                        <div
                          className={`text-sm font-semibold text-center ${
                            item.competitor > item.yourBrand ? "text-[#FF7D55]" : "text-[#934F3C]/70"
                          }`}
                        >
                          {item.competitor}
                          {item.unit}
                        </div>
                        <div
                          className={`text-sm font-semibold text-center ${
                            item.yourBrand > item.competitor ? "text-[#FF7D55]" : "text-[#934F3C]/70"
                          }`}
                        >
                          {item.yourBrand}
                          {item.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#DE7053]/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-[#DE7053]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#1E1D1B]">Key Insights</h4>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#FF7D55]/5 to-[#DE7053]/5 border border-[#E3DED8]/30">
                  <p className="text-sm text-[#1E1D1B] leading-relaxed">
                    <strong className="text-[#DE7053]">Strategy:</strong> Focus on highlighting specific pricing,
                    comprehensive feature lists, and reliable support availability in your AI responses to improve
                    ranking performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
