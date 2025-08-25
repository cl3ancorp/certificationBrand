
"use client";
// import { data } from "./data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ComboboxProps {
  frameworks: { value: string; label: string }[]
  children: React.ReactNode
  className?: string
  onValueChange?: (value: string) => void
  value?: string
}

export default function Combobox({ 
  frameworks, 
  children, 
  className, 
  onValueChange,
  value: controlledValue,
  ...props 
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState("")
  
  const value = controlledValue || internalValue
  
  const handleValueChange = (newValue: string) => {
    const finalValue = newValue === value ? "" : newValue
    setInternalValue(finalValue)
    onValueChange?.(finalValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          {...props}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : children}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${children}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleValueChange}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
