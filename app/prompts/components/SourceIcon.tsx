import type React from "react"

interface SourceIconProps {
  source: string
}

export function SourceIcon({ source }: SourceIconProps) {
  const iconMap: Record<string, React.ReactElement> = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    chatgpt: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm3.6 18.304a4.47 4.47 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.843 3.369v-2.332a.08.08 0 0 0-.033.062L9.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
          fill="#10A37F"
        />
      </svg>
    ),
    perplexity: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#20808D" />
        <path d="M12 6v12M6 12h12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gemini: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#4285F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    reddit: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF4500" />
        <path d="M15.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="white" />
        <path d="M15 14.5s-.5 1.5-3 1.5-3-1.5-3-1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  }

  return iconMap[source.toLowerCase()] || null
}

