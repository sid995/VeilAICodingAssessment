# Veil AI - API Integration Guide

This document explains how the frontend connects to the backend API.

## Setup

1. Copy `.env.local.example` to `.env.local`
2. Update `NEXT_PUBLIC_API_URL` to point to your backend (default: `http://localhost:8000`)
3. Configure authentication variables if using NextAuth

## Architecture

### API Client (`lib/api/client.ts`)

The `ApiClient` class provides methods for all backend endpoints:

\`\`\`typescript
import { apiClient } from '@/lib/api'

// Set authentication token
apiClient.setToken('your-jwt-token')

// Make API calls
const storefronts = await apiClient.listStorefronts()
const job = await apiClient.createJob({ ... })
\`\`\`

### React Hooks (`lib/api/hooks.ts`)

SWR-based hooks for data fetching with automatic caching and revalidation:

\`\`\`typescript
import { useStorefronts, useJobs, useDetailedProducts } from '@/lib/api'

function MyComponent() {
  const { data: storefronts, error, isLoading } = useStorefronts()
  const { data: jobs } = useJobs({ page: 1, limit: 10 })
  
  // ...
}
\`\`\`

### TypeScript Types (`lib/api/types.ts`)

All backend models are typed for type safety:

\`\`\`typescript
import type { Storefront, Job, DetailedProduct } from '@/lib/api'
\`\`\`

## Screen-by-Screen Integration

### Dashboard (`app/dashboard/page.tsx`)
- `useStorefronts()` - List user's storefronts
- `useJobs({ page: 1, limit: 10 })` - Recent jobs
- `usePreliminaryScores({ limit: 10 })` - Top scores

### Products (`app/products/page.tsx`)
- `useDetailedProducts({ page: 1, limit: 50 })` - Product list
- `usePreliminaryScore(asin)` - Product scores

### Analytics (`app/analytics/page.tsx`)
- `useJobs()` - Job history
- `usePreliminaryScores()` - Score analytics

### Action Center (`app/action-center/page.tsx`)
- `useStorefronts()` - Storefront selection
- `apiClient.createAndScrapeStorefront()` - Start scraping
- `apiClient.createJob()` - Create jobs

## WebSocket Integration

For real-time job monitoring:

\`\`\`typescript
import { apiClient } from '@/lib/api'

const ws = apiClient.connectToJobWebSocket(jobId)

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Job progress:', data.progress)
}

ws.send(JSON.stringify({ command: 'get_status' }))
\`\`\`

## Error Handling

All API calls throw errors with descriptive messages:

\`\`\`typescript
try {
  await apiClient.createStorefront({ ... })
} catch (error) {
  console.error('API Error:', error.message)
  // Show error to user
}
\`\`\`

## Authentication

Set the JWT token after user login:

\`\`\`typescript
import { apiClient } from '@/lib/api'

// After successful authentication
apiClient.setToken(session.accessToken)
\`\`\`

## Best Practices

1. **Use hooks for data fetching** - Automatic caching and revalidation
2. **Use apiClient for mutations** - Creating, updating, deleting
3. **Handle loading states** - Check `isLoading` from hooks
4. **Handle errors** - Display user-friendly error messages
5. **Revalidate after mutations** - Use `mutate()` from SWR to refresh data

## Example: Complete Flow

\`\`\`typescript
'use client'

import { useState } from 'react'
import { useStorefronts, apiClient } from '@/lib/api'
import { mutate } from 'swr'

export default function StorefrontManager() {
  const { data: storefronts, isLoading, error } = useStorefronts()
  const [creating, setCreating] = useState(false)

  const handleCreate = async (data: { store_name: string, storefront_url: string }) => {
    setCreating(true)
    try {
      await apiClient.createAndScrapeStorefront(data)
      // Revalidate storefronts list
      mutate('/api/storefronts')
      alert('Storefront created and scraping started!')
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setCreating(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {storefronts?.map(storefront => (
        <div key={storefront.id}>{storefront.store_name}</div>
      ))}
      <button onClick={() => handleCreate({ ... })} disabled={creating}>
        {creating ? 'Creating...' : 'Create Storefront'}
      </button>
    </div>
  )
}
