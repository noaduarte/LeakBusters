"use client"

import * as React from "react"
import { format } from "date-fns"
import { ca } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type LeakPredictionDatePickerProps = {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function LeakPredictionDatePicker({ date, onDateChange }: LeakPredictionDatePickerProps) {
  const fromDate = new Date('2024-01-01');
  const toDate = new Date('2024-12-31');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ca }) : <span>Selecciona una data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          locale={ca}
          fromDate={fromDate}
          toDate={toDate}
          disabled={{ before: fromDate, after: toDate }}
        />
      </PopoverContent>
    </Popover>
  )
}
