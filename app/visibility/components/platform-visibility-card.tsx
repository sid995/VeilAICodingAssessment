
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const PlatformVisibilityCard = ({ platformVisibilityData }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Platform wise brand visibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platformVisibilityData.map((platform: any) => (
            <div key={platform.platform} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={platform.icon || "/placeholder.svg"}
                    alt={platform.platform}
                    className="h-5 w-5 rounded"
                  />
                  <span className="text-sm font-medium">{platform.platform}</span>
                </div>
                <span className="text-sm font-semibold">{platform.visibility}%</span>
              </div>
              <div className="w-full bg-[#E3DED8] rounded-full h-2">
                <div
                  className="bg-[#FF7D55] h-2 rounded-full transition-all"
                  style={{ width: `${platform.visibility}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
