"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../../lib/utils";
import { formatISO } from "date-fns";
import { formatDate } from "date-fns/format";

interface DatePickerProps {
  value?: Date | string | undefined;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Sélectionner une date",
  disabled = false,
  className,
  name,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
          name={name}
        >
          {value ? formatDate(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            const isoDate = date
              ? formatISO(date, { representation: "date" })
              : undefined;
            if (!onChange) return;
            onChange(isoDate);
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
