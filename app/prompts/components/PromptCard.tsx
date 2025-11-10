import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { Prompt } from "../types"
import { SourceIcon } from "./SourceIcon"

interface PromptCardProps {
  prompt: Prompt
  onViewDetails: (prompt: Prompt) => void
}

export function PromptCard({ prompt, onViewDetails }: PromptCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-[#E3DED8]/60 hover:border-[#FF7D55]/30 hover:shadow-lg hover:shadow-[#FF7D55]/5 transition-all duration-300 overflow-hidden">
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
          className={`text-xs font-semibold px-3 py-1 ${
            prompt.type === "geo"
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
            <p className="text-xs text-[#934F3C]/60 italic">Snippet: {prompt.productSnippet}</p>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#E3DED8]/40">
          {/* Source */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-[#934F3C]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
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
          onClick={() => onViewDetails(prompt)}
          className="h-9 px-3 bg-white border-[#E3DED8] hover:border-[#FF7D55]/30 hover:bg-[#FCBBA9]/10 text-[#1E1D1B] hover:text-[#FF7D55] shadow-sm"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
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
  )
}

