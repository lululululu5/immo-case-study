'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
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
import { format } from "date-fns"
import { CircleDot, Download, FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Asset = {
  id: number
  name: string
  currentEmissions: number
  potentialReduction: number
  investmentRequired: number
  riskLevel: 'High' | 'Medium' | 'Low'
  roi: number
  decarbonizationPotential: 'High' | 'Medium' | 'Low'
}

type Stakeholder = {
  id: string
  name: string
  role: string
  status: 'Pending' | 'Approved' | 'Rejected'
  email: string
}

type StepFiveProps = {
  formData: any
  updateFormData: (data: any) => void
}

// Mock data for the assets (reused from step-four)
const mockAssets: Asset[] = [
  {
    id: 1,
    name: "Kreuzberg Residential Complex",
    currentEmissions: 150,
    potentialReduction: 75,
    investmentRequired: 500000,
    riskLevel: 'Medium',
    roi: 7.8,
    decarbonizationPotential: 'High'
  },
  {
    id: 2,
    name: "Prenzlauer Berg Apartments",
    currentEmissions: 200,
    potentialReduction: 80,
    investmentRequired: 750000,
    riskLevel: 'Low',
    roi: 8.9,
    decarbonizationPotential: 'Medium'
  }
]

// Mock data for stakeholders
const mockStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Investment Director',
    status: 'Approved',
    email: 'sarah.johnson@example.com'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Risk Manager',
    status: 'Pending',
    email: 'michael.chen@example.com'
  },
  {
    id: '3',
    name: 'Anna Schmidt',
    role: 'Sustainability Officer',
    status: 'Pending',
    email: 'anna.schmidt@example.com'
  }
]

export function StepFive({ formData, updateFormData }: StepFiveProps) {
  const [assets] = useState<Asset[]>(mockAssets)
  const [stakeholders] = useState<Stakeholder[]>(mockStakeholders)
  const [closingDate, setClosingDate] = useState<Date>()
  const [selectedApprover, setSelectedApprover] = useState<string>("")

  const totalInvestment = assets.reduce((sum, asset) => sum + asset.investmentRequired, 0)
  const averageROI = assets.reduce((sum, asset) => sum + asset.roi, 0) / assets.length

  const getStatusIcon = (status: Stakeholder['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getRiskIcon = (riskLevel: Asset['riskLevel']) => {
    const baseClasses = "h-4 w-4"
    switch (riskLevel) {
      case 'High':
        return <CircleDot className={`${baseClasses} text-red-500`} />
      case 'Medium':
        return <CircleDot className={`${baseClasses} text-yellow-500`} />
      case 'Low':
        return <CircleDot className={`${baseClasses} text-green-500`} />
    }
  }

  const handleDownloadReport = () => {
    // Mock function for downloading report
    console.log('Downloading investment report...')
  }

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Transaction Summary</h3>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              <FileText className="h-4 w-4 mr-2" />
              Download Investment Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <Label>Total Investment</Label>
              <p className="text-2xl font-bold mt-2">
                €{(totalInvestment / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Label>Average ROI</Label>
              <p className="text-2xl font-bold mt-2">
                {averageROI.toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Label>Closing Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-2",
                      !closingDate && "text-muted-foreground"
                    )}
                  >
                    {closingDate ? format(closingDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={closingDate}
                    onSelect={setClosingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Decarbonization Potential</TableHead>
                <TableHead>Investment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    {getRiskIcon(asset.riskLevel)}
                    <span>{asset.riskLevel}</span>
                  </TableCell>
                  <TableCell>{asset.roi}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      asset.decarbonizationPotential === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.decarbonizationPotential === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {asset.decarbonizationPotential}
                    </span>
                  </TableCell>
                  <TableCell>€{asset.investmentRequired.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Approval Workflow */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Approval Workflow</h3>
          
          <div className="space-y-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label className="mb-2 block">Add Approver</Label>
                <Select value={selectedApprover} onValueChange={setSelectedApprover}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stakeholder" />
                  </SelectTrigger>
                  <SelectContent>
                    {stakeholders.map(stakeholder => (
                      <SelectItem key={stakeholder.id} value={stakeholder.id}>
                        {stakeholder.name} - {stakeholder.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="mb-2">Add to Workflow</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stakeholders.map((stakeholder) => (
                  <TableRow key={stakeholder.id}>
                    <TableCell>{stakeholder.name}</TableCell>
                    <TableCell>{stakeholder.role}</TableCell>
                    <TableCell>{stakeholder.email}</TableCell>
                    <TableCell className="flex items-center space-x-2">
                      {getStatusIcon(stakeholder.status)}
                      <span>{stakeholder.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button size="lg" className="w-full md:w-auto">
          Submit for Approval
        </Button>
      </div>
    </div>
  )
} 