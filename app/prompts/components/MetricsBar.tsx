interface MetricsBarProps {
  totalPrompts: number
}

export function MetricsBar({ totalPrompts }: MetricsBarProps) {
  return (
    <div className="px-8 py-4 bg-[#F7F6F3]/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Total Prompts */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#FF7D55]">{totalPrompts}</span>
              <span className="text-xs text-[#934F3C]/70 font-medium uppercase tracking-wide">
                Active Prompts
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-[#E3DED8]" />

          {/* Capacity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#1E1D1B]">169 / 200</span>
              <span className="text-xs text-[#934F3C]/70">Prompts Used</span>
            </div>
            <div className="w-32 h-1.5 bg-[#E3DED8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] rounded-full transition-all duration-300"
                style={{ width: `${(169 / 200) * 100}%` }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-[#E3DED8]" />

          {/* Last Updated */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#FCBBA9]/20">
              <svg className="w-4 h-4 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#934F3C]/60 font-medium">Last Queried</span>
              <span className="text-sm font-semibold text-[#1E1D1B]">28 Jun, 25</span>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FCBBA9]/10 border border-[#FF7D55]/10">
          <svg className="w-4 h-4 text-[#FF7D55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-[#934F3C]/70">Target specific locations, personas & LLMs</span>
        </div>
      </div>
    </div>
  )
}

