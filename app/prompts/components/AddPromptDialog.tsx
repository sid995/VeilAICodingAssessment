import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import type React from "react"

interface AddPromptDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddPrompt: () => void
  newPromptText: string
  setNewPromptText: (text: string) => void
  locationInput: string
  setLocationInput: (input: string) => void
  locations: string[]
  setLocations: (locations: string[]) => void
  personasInput: string
  setPersonasInput: (input: string) => void
  personas: string[]
  setPersonas: (personas: string[]) => void
  selectedEngines: string[]
  setSelectedEngines: (engines: string[]) => void
}

export function AddPromptDialog({
  isOpen,
  onOpenChange,
  onAddPrompt,
  newPromptText,
  setNewPromptText,
  locationInput,
  setLocationInput,
  locations,
  setLocations,
  personasInput,
  setPersonasInput,
  personas,
  setPersonas,
  selectedEngines,
  setSelectedEngines,
}: AddPromptDialogProps) {
  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && locationInput.trim()) {
      e.preventDefault()
      if (!locations.includes(locationInput.trim())) {
        setLocations([...locations, locationInput.trim()])
      }
      setLocationInput("")
    }
  }

  const handlePersonasKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && personasInput.trim()) {
      e.preventDefault()
      if (!personas.includes(personasInput.trim())) {
        setPersonas([...personas, personasInput.trim()])
      }
      setPersonasInput("")
    }
  }

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location))
  }

  const removePersona = (persona: string) => {
    setPersonas(personas.filter((p) => p !== persona))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer gap-2 bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30">
          <Plus className="w-4 h-4" />
          Add Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-[#E3DED8]/70 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1E1D1B]">Add Prompt</DialogTitle>
          <DialogDescription className="text-[#934F3C]/80">
            Configure targeting for your prompt across locations, personas, and engines.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="prompt-text">Prompt</Label>
            <Textarea
              id="prompt-text"
              placeholder="Enter your prompt text..."
              value={newPromptText}
              onChange={(e) => setNewPromptText(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Engines</Label>
            <div className="grid grid-cols-2 gap-2">
              {["ChatGPT", "Perplexity", "Gemini"].map((engine) => (
                <div key={engine} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`engine-${engine}`}
                    checked={selectedEngines.includes(engine)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEngines([...selectedEngines, engine])
                      } else {
                        setSelectedEngines(selectedEngines.filter((e) => e !== engine))
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`engine-${engine}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {engine}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personas-input">Personas</Label>
            <Input
              id="personas-input"
              placeholder="Type and press Enter or comma to add personas..."
              value={personasInput}
              onChange={(e) => setPersonasInput(e.target.value)}
              onKeyDown={handlePersonasKeyDown}
            />
            {personas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {personas.map((persona) => (
                  <Badge
                    key={persona}
                    variant="secondary"
                    className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 gap-1 pr-1"
                  >
                    {persona}
                    <button
                      onClick={() => removePersona(persona)}
                      className="ml-1 hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Press Enter or comma to add each persona</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location-input">Location</Label>
            <Input
              id="location-input"
              placeholder="Type and press Enter or comma to add locations..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={handleLocationKeyDown}
            />
            {locations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {locations.map((location) => (
                  <Badge
                    key={location}
                    variant="secondary"
                    className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 gap-1 pr-1"
                  >
                    {location}
                    <button
                      onClick={() => removeLocation(location)}
                      className="ml-1 hover:bg-teal-200 dark:hover:bg-teal-800 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Press Enter or comma to add each location (e.g., "United States", "San Francisco", "English")
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#E3DED8] hover:bg-[#F7F6F3]"
          >
            Cancel
          </Button>
          <Button
            onClick={onAddPrompt}
            disabled={!newPromptText.trim()}
            className="bg-gradient-to-r from-[#FF7D55] to-[#FB7D5C] hover:from-[#DE7053] hover:to-[#B86048] text-white shadow-lg shadow-[#FF7D55]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#FF7D55]/30"
          >
            Add Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

