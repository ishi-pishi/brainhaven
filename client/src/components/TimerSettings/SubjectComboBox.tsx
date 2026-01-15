import { Check, Plus } from "lucide-react"

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command"

export function SubjectComboBox() {
  return (
    <div className="w-[320px]">
      <Command className="rounded-lg border transition-all duration-200 focus-within:w-[320px] w-45 overflow-hidden">
        <CommandInput placeholder="Search or create subject…" className="transition-all duration-200" />
        <CommandList>
          <CommandEmpty>
            <CommandItem>
              <Plus className="mr-2 h-4 w-4" />
              Create "New Subject"
            </CommandItem>
          </CommandEmpty>
          <CommandGroup>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Work
            </CommandItem>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              School
            </CommandItem>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Art
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
