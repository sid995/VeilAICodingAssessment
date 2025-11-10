import { Product } from "../types"

interface ProductHeaderProps {
  currentProduct: Product | undefined
}

export function ProductHeader({ currentProduct }: ProductHeaderProps) {
  return (
    <div className="px-8 pt-6 pb-4 border-b border-[#E3DED8]/40">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {currentProduct?.domain && (
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF7D55]/10 to-[#FB7D5C]/10 ring-1 ring-[#FF7D55]/20 shadow-sm">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${currentProduct.domain}&sz=32`}
                  alt={`${currentProduct.name} logo`}
                  className="w-7 h-7 flex-shrink-0"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-lg font-bold text-[#1E1D1B]">{currentProduct?.name}</h1>
              </div>
              {currentProduct?.domain && (
                <p className="text-xs text-[#934F3C]/60 font-medium">{currentProduct.domain}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

