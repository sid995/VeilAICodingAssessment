import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { Answer, Prompt } from "../types"

interface DetailedAnswerDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedAnswer: Answer | null
  selectedQuery: Prompt | null
  onBackToResponses: () => void
}

export function DetailedAnswerDialog({
  isOpen,
  onOpenChange,
  selectedAnswer,
  selectedQuery,
  onBackToResponses,
}: DetailedAnswerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-[#E3DED8]/70 shadow-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToResponses}
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
            <Badge
              variant="secondary"
              className="text-sm bg-gradient-to-br from-[#FCBBA9]/60 to-[#F0A490]/40 text-[#934F3C] border border-[#F0A490]/50 shadow-sm"
            >
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
          <Button
            variant="outline"
            onClick={onBackToResponses}
            className="border-[#E3DED8] hover:bg-[#F7F6F3]"
          >
            Back
          </Button>
          <Button className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30">
            Copy Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

