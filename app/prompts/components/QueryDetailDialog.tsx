import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe } from "lucide-react"
import { Prompt, Answer } from "../types"

interface QueryDetailDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedQuery: Prompt | null
  mockAnswers: Answer[]
  onAnswerClick: (answer: Answer) => void
}

export function QueryDetailDialog({
  isOpen,
  onOpenChange,
  selectedQuery,
  mockAnswers,
  onAnswerClick,
}: QueryDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto border-[#E3DED8] shadow-xl bg-white">
        <DialogHeader className="border-b border-[#E3DED8]/40 pb-5">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-3 font-semibold text-[#1E1D1B] leading-relaxed pr-8">
                {selectedQuery?.text}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge
                  className={`text-xs px-2.5 py-1 ${
                    selectedQuery?.type === "geo"
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
                    className={`cursor-pointer px-3 py-1 text-xs transition-all ${
                      selectedQuery?.llms.includes(llm)
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
                  onClick={() => onAnswerClick(answer)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs border-[#E3DED8]">
                        {answer.llm}
                      </Badge>
                      <span className="text-xs text-[#934F3C]/60">{answer.date}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#FF7D55]/10 text-[#FF7D55] border border-[#FF7D55]/20"
                    >
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
            onClick={() => onOpenChange(false)}
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
  )
}

