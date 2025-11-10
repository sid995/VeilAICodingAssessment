"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  onTrackProducts: () => void
  onRunScan: () => void
  onAssignPromptSet: () => void
  onClear: () => void
}

export const BulkActionsBar = ({
  selectedCount,
  onTrackProducts,
  onRunScan,
  onAssignPromptSet,
  onClear,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null

  return (
    <Card className="p-4 mb-6 bg-[#FCBBA9]/15 border-[#FF7D55]/30 shadow-sm rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#FF7D55]/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#FF7D55]">{selectedCount}</span>
          </div>
          <span className="font-medium text-[#1E1D1B]">
            {selectedCount} product{selectedCount > 1 ? "s" : ""} selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onTrackProducts}
            className="bg-white border-[#E3DED8] hover:bg-[#FF7D55]/10 hover:border-[#FF7D55]/30 hover:text-[#FF7D55] transition-colors"
          >
            Track Products
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRunScan}
            className="bg-white border-[#E3DED8] hover:bg-[#FF7D55]/10 hover:border-[#FF7D55]/30 hover:text-[#FF7D55] transition-colors"
          >
            Run Scan
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAssignPromptSet}
            className="bg-white border-[#E3DED8] hover:bg-[#FF7D55]/10 hover:border-[#FF7D55]/30 hover:text-[#FF7D55] transition-colors"
          >
            Assign Prompt Set
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="hover:bg-[#FF7D55]/10 hover:text-[#FF7D55]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

