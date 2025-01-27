'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransactionInfoBar } from "../transaction-info-bar"

type StepOneProps = {
  formData: any
  updateFormData: (data: any) => void
}

const strategicGoals = [
  "Yield Maximization",
  "Portfolio Diversification",
  "Market Expansion",
  "Risk Reduction",
  "Sustainability Enhancement",
  "Value-Add Opportunity"
]

export function StepOne({ formData, updateFormData }: StepOneProps) {
  const [date, setDate] = useState<Date>()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({
      ...formData,
      [field]: value
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      handleInputChange('transactionDate', date.toISOString())
    }
  }

  return (
    <div className="space-y-6">
      <TransactionInfoBar step={1} formData={formData} />

      {/* Main Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label>Transaction Type</Label>
              <RadioGroup
                defaultValue={formData.transactionType}
                onValueChange={(value) => handleInputChange('transactionType', value)}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Acquisition" id="Acquisition" />
                  <Label htmlFor="Acquisition">Acquisition</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Exit" id="Exit" />
                  <Label htmlFor="Exit">Exit</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Template</Label>
              <RadioGroup
                defaultValue={formData.template}
                onValueChange={(value) => handleInputChange('template', value)}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Template</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Start from Scratch</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionName">Transaction Name</Label>
              <Input
                id="transactionName"
                placeholder="e.g., Acquisition of XYZ Building"
                value={formData.transactionName}
                onChange={(e) => handleInputChange('transactionName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g., 500000"
                value={formData.budget}
                onChange={(e) => {
                  const value = e.target.value ? e.target.value : ''
                  handleInputChange('budget', value)
                }}
                className="font-mono"
              />
              <span className="text-sm text-muted-foreground">Enter amount in euros</span>
            </div>

            <div className="space-y-2">
              <Label>Strategic Goal Alignment</Label>
              <Select
                value={formData.strategic_goal_alignment}
                onValueChange={(value) => handleInputChange('strategic_goal_alignment', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select strategic goal" />
                </SelectTrigger>
                <SelectContent>
                  {strategicGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transaction Date</Label>
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 