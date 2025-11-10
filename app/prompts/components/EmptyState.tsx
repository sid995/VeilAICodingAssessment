import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F7F6F3] to-[#FCBBA9]/20 mb-6">
        <svg className="w-16 h-16 text-[#FF7D55]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#1E1D1B] mb-2">No prompts found</h3>
      <p className="text-sm text-[#934F3C]/70 text-center max-w-md mb-6">
        Try adjusting your filters or search query to find matching prompts for this product.
      </p>
      <Button
        onClick={onClearFilters}
        className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white"
      >
        Clear All Filters
      </Button>
    </div>
  )
}

