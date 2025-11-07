"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { X, Search, Sparkles, Settings, MoreVertical, ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CreateListDialog } from "@/components/create-list-dialog"
import { DeleteListDialog } from "@/components/delete-list-dialog"

interface KeywordList {
  id: string
  name: string
  keywords: number
  creator: string
  creatorInitials: string
  lastUpdated: string
  description?: string
}

const initialLists: KeywordList[] = [
  {
    id: "1",
    name: "Julia's List",
    keywords: 1,
    creator: "Julia Hudson",
    creatorInitials: "JH",
    lastUpdated: "Sep 30, 2025",
    description: "Personal keyword tracking",
  },
  {
    id: "2",
    name: "Product Launch 2025",
    keywords: 12,
    creator: "Julia Hudson",
    creatorInitials: "JH",
    lastUpdated: "Oct 15, 2025",
    description: "Keywords for Q4 product launch",
  },
  {
    id: "3",
    name: "Competitor Analysis",
    keywords: 8,
    creator: "Julia Hudson",
    creatorInitials: "JH",
    lastUpdated: "Oct 10, 2025",
    description: "Tracking competitor keywords",
  },
]

type SortField = "name" | "keywords" | "creator" | "lastUpdated"
type SortDirection = "asc" | "desc"

export default function PromptVolumesPage() {
  const [lists, setLists] = useState<KeywordList[]>(initialLists)
  const [searchQuery, setSearchQuery] = useState("")
  const [listSearchQuery, setListSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("lastUpdated")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [showBanner, setShowBanner] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState<KeywordList | null>(null)

  const handleCreateList = (name: string, description: string) => {
    const newList: KeywordList = {
      id: Date.now().toString(),
      name,
      keywords: 0,
      creator: "Julia Hudson",
      creatorInitials: "JH",
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      description,
    }
    setLists([newList, ...lists])
  }

  const handleDeleteList = (list: KeywordList) => {
    setListToDelete(list)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (listToDelete) {
      setLists(lists.filter((list) => list.id !== listToDelete.id))
      setListToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedLists = useMemo(() => {
    let filtered = lists

    // Filter by search query
    if (listSearchQuery) {
      filtered = filtered.filter((list) => list.name.toLowerCase().includes(listSearchQuery.toLowerCase()))
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number = ""
      let bValue: string | number = ""

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "keywords":
          aValue = a.keywords
          bValue = b.keywords
          break
        case "creator":
          aValue = a.creator.toLowerCase()
          bValue = b.creator.toLowerCase()
          break
        case "lastUpdated":
          aValue = new Date(a.lastUpdated).getTime()
          bValue = new Date(b.lastUpdated).getTime()
          break
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return sorted
  }, [lists, listSearchQuery, sortField, sortDirection])

  const SortIcon = ({ field }: { field: SortField }) => {
    const isActive = sortField === field
    return (
      <div className="flex flex-col">
        <ChevronUp
          className={`w-3 h-3 -mb-1 ${isActive && sortDirection === "asc" ? "text-foreground" : "text-muted-foreground/50"}`}
        />
        <ChevronDown
          className={`w-3 h-3 ${isActive && sortDirection === "desc" ? "text-foreground" : "text-muted-foreground/50"}`}
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
          {/* Header with search count */}
          <div className="flex justify-end px-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full border-2 border-red-500" />0 searches left
            </div>
          </div>

          {/* Hero Section */}
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl font-semibold mb-8 text-balance">Explore what people are promoting in AI</h1>

            {/* Search Box */}
            <Card className="p-6 shadow-lg">
              <div className="relative mb-4">
                <Input
                  placeholder="Enter a keyword..."
                  className="h-12 text-base pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Bulk analysis</span>
                  <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                    Analyze
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Lists Section */}
          <div className="max-w-6xl mx-auto px-6 pb-12">
            {/* Tabs */}
            <div className="flex items-center gap-6 mb-6 border-b border-border">
              <button className="text-sm font-medium pb-3 border-b-2 border-foreground">My Lists</button>
              <button className="text-sm text-muted-foreground hover:text-foreground pb-3">Relevant Keywords</button>
            </div>

            {/* Info Banner */}
            {showBanner && (
              <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-foreground pr-4">
                    Prompt Volumes now supports creating and managing multiple watchlists. Your existing bookmarks can
                    be found in the topmost list in the below table.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex-shrink-0"
                    onClick={() => setShowBanner(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Search and Create */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">Create lists to manage keywords for your projects.</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search Lists"
                    className="pl-9 w-[250px] h-9"
                    value={listSearchQuery}
                    onChange={(e) => setListSearchQuery(e.target.value)}
                  />
                </div>
                <CreateListDialog onCreateList={handleCreateList} />
              </div>
            </div>

            {/* Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        <button
                          className="flex items-center gap-2 hover:text-foreground"
                          onClick={() => handleSort("name")}
                        >
                          List Name
                          <SortIcon field="name" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        <button
                          className="flex items-center gap-2 hover:text-foreground"
                          onClick={() => handleSort("keywords")}
                        >
                          Keywords
                          <SortIcon field="keywords" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        <button
                          className="flex items-center gap-2 hover:text-foreground"
                          onClick={() => handleSort("creator")}
                        >
                          Creator
                          <SortIcon field="creator" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        <button
                          className="flex items-center gap-2 hover:text-foreground"
                          onClick={() => handleSort("lastUpdated")}
                        >
                          Last updated
                          <SortIcon field="lastUpdated" />
                        </button>
                      </th>
                      <th className="px-6 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedLists.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          {listSearchQuery
                            ? "No lists found matching your search."
                            : "No lists yet. Create your first list to get started."}
                        </td>
                      </tr>
                    ) : (
                      filteredAndSortedLists.map((list) => (
                        <tr key={list.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium">{list.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm">{list.keywords}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-foreground text-background">
                                  {list.creatorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{list.creator}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm">{list.lastUpdated}</span>
                          </td>
                          <td className="px-6 py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit List</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteList(list)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <DeleteListDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        listName={listToDelete?.name || ""}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
