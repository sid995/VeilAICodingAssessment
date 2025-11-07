import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const jobId = params.id

  // Mock job detail data
  const jobDetails = {
    id: jobId,
    name: "Deep Scoring",
    status: "completed",
    progress: 100,
    totalTasks: 6,
    completedTasks: 6,
    startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ["scoring_deep"],
    tasks: [
      { name: "Initialize scoring", status: "completed", completedAt: new Date().toISOString() },
      { name: "Analyze SEO factors", status: "completed", completedAt: new Date().toISOString() },
      { name: "Calculate GEO score", status: "completed", completedAt: new Date().toISOString() },
      { name: "Evaluate conversion", status: "completed", completedAt: new Date().toISOString() },
      { name: "Generate report", status: "completed", completedAt: new Date().toISOString() },
      { name: "Finalize results", status: "completed", completedAt: new Date().toISOString() },
    ],
    logs: [
      { timestamp: new Date().toISOString(), level: "info", message: "Job started" },
      { timestamp: new Date().toISOString(), level: "info", message: "Processing product data" },
      { timestamp: new Date().toISOString(), level: "success", message: "Job completed successfully" },
    ],
  }

  return NextResponse.json(jobDetails)
}
