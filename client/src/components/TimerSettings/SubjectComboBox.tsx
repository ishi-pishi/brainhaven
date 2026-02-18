import { useEffect, useState, useRef } from "react"
import { Check, Plus } from "lucide-react"
import { getSubjectNames, deleteSubjectByName } from "@/logic/storage/storage"
import { CreateSubjectPopup } from "./CreateSubjectPopup"

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"

export function SubjectComboBox() {
  const [subjects, setSubjects] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)
  const [showCreatePopup, setShowCreatePopup] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const names = await getSubjectNames()
        setSubjects(names)
      } catch (err) {
        console.error("Failed to fetch subjects:", err)
      }
    }

    fetchSubjects()
  }, [])

  const filteredSubjects = subjects.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[320px] justify-between"
            onClick={() => inputRef.current?.focus()}
          >
            {selected ?? "Select a subject"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] p-0">
          <Command className="rounded-lg border overflow-hidden">
            <CommandInput
              placeholder="Search or create subject…"
              value={search}
              onValueChange={setSearch}
              className="transition-all duration-200"
              ref={inputRef}
            />
            <CommandList>
              {filteredSubjects.length > 0 ? (
                <CommandGroup>
                  {filteredSubjects.map((subject) => (
                    <CommandItem
                      key={subject}
                      onSelect={() => {
                        setSelected(subject)
                        setOpen(false)
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Check
                            className={`mr-2 h-4 w-4 ${selected === subject ? "opacity-100" : "opacity-0"
                              }`}
                          />
                          {subject}
                        </div>

                        <button
                          onClick={async (e) => {
                            e.stopPropagation()
                            await deleteSubjectByName(subject)
                            setSubjects((prev) => prev.filter((s) => s !== subject))
                            if (selected === subject) setSelected(null)
                          }}
                          aria-label={`Delete ${subject}`}
                          className="ml-2 h-6 w-6 flex items-center justify-centehover:bg-red-200 text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          <span className="leading-none">Delete</span>
                        </button>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No subjects found</CommandEmpty>
              )}

              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  setTimeout(() => {
                    setShowCreatePopup(true)
                  }, 0)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create "New Subject"
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <CreateSubjectPopup
        open={showCreatePopup}
        onOpenChange={setShowCreatePopup}
        onCreate={(name) => {
          setSubjects((prev) => [...prev, name])
          setSelected(name)
          setShowCreatePopup(false)
        }}
      />
    </>
  )
}
