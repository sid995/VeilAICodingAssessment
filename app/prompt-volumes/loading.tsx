import { AppSidebar } from "@/components/app-sidebar"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
          {/* Header */}
          <div className="flex justify-end px-6 pt-4">
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Hero Section */}
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <Skeleton className="h-10 w-96 mx-auto mb-8" />

            <Card className="p-6 shadow-lg">
              <Skeleton className="h-12 w-full mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
                <Skeleton className="h-9 w-32" />
              </div>
            </Card>
          </div>

          {/* Lists Section */}
          <div className="max-w-6xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-6 mb-6 border-b border-border">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-5 w-64" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-[250px]" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-5 w-24" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-5 w-20" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-5 w-20" />
                      </th>
                      <th className="px-6 py-3 text-left">
                        <Skeleton className="h-5 w-24" />
                      </th>
                      <th className="px-6 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="px-6 py-4">
                          <Skeleton className="h-5 w-32" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-5 w-8" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-5 w-24" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-8 w-8" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
