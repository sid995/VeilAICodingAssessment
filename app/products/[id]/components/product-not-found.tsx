import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductNotFoundProps {
  onBack: () => void
}

export function ProductNotFound({ onBack }: ProductNotFoundProps) {
  return (
    <div className="h-full bg-background overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
          <p className="text-[#934F3C]/70">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    </div>
  )
}

