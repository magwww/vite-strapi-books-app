"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

type BookFormValues = {
  title: string;
  categorySlug: string;
};

type ComboboxProps = {
  field: ControllerRenderProps<BookFormValues>;
  options: { label: string; value: string }[];
  placeholder?: string;
};

export function Combobox({
  field,
  options,
  placeholder = "Select...",
}: ComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value
            ? options.find((opt) => opt.value === field.value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => field.onChange(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
