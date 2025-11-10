import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProductVersion } from "../types"

interface ProductHeaderProps {
  versions: ProductVersion[]
  selectedVersionIndex: number
  onVersionChange: (index: number) => void
  onBack: () => void
}

export function ProductHeader({ versions, selectedVersionIndex, onVersionChange, onBack }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Button>
      {versions.length > 1 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#934F3C]/70">Product Version:</span>
          <Select
            value={selectedVersionIndex.toString()}
            onValueChange={(value) => onVersionChange(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {versions.map((version, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {new Date(version.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

