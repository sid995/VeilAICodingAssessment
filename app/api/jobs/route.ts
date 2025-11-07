import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  // Mock jobs data
  const jobs = [
    {
      id: "job_1",
      name: "Deep Scoring",
      status: "completed",
      progress: 100,
      totalTasks: 6,
      completedTasks: 6,
      startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      tags: ["scoring_deep"],
    },
    {
      id: "job_2",
      name: "Generate Search Queries",
      status: "completed",
      progress: 100,
      totalTasks: 3,
      completedTasks: 3,
      startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      tags: ["querying_generate_queries"],
    },
    {
      id: "job_3",
      name: "Preliminary Scoring",
      status: "in_progress",
      progress: 65,
      totalTasks: 4,
      completedTasks: 2,
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      tags: ["scoring_preliminary"],
    },
    {
      id: "job_4",
      name: "Product Analysis",
      status: "pending",
      progress: 0,
      totalTasks: 5,
      completedTasks: 0,
      startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      tags: ["analysis_product"],
    },
    {
      id: "job_5",
      name: "Query Coverage Analysis",
      status: "failed",
      progress: 45,
      totalTasks: 8,
      completedTasks: 3,
      startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      tags: ["querying_coverage"],
    },
  ]

  let filteredJobs = jobs

  if (status && status !== "all") {
    filteredJobs = filteredJobs.filter((job) => job.status === status)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.name.toLowerCase().includes(searchLower) ||
        job.id.toLowerCase().includes(searchLower) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  return NextResponse.json({ jobs: filteredJobs, total: filteredJobs.length })
}
