'use client'

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText, Download, Building2, ChevronRight, Home } from "lucide-react"
import Link from "next/link"

// Mock data for a transaction (matching the data collected in steps 1-6)
const mockTransaction = {
  id: 1,
  name: "Berlin Portfolio Acquisition",
  type: "Acquisition",
  status: "In Progress",
  date_initiated: "2024-03-15",
  template: "Standard Acquisition",
  budget: 1250000,
  market_conditions: {
    market_phase: "Growth",
    competition_level: "Medium",
    regulatory_environment: "Stable"
  },
  selected_assets: [
    {
      id: 1,
      name: "Kreuzberg Residential Complex",
      type: "Residential",
      location: "Berlin, Germany",
      portfolio_value: 12500000,
      decarbonization: "High",
      roi: 7.8,
      liquidity_rating: "A",
      source: "Direct",
      matching_score: 89
    },
    {
      id: 2,
      name: "Prenzlauer Berg Apartments",
      type: "Residential",
      location: "Berlin, Germany",
      portfolio_value: 9800000,
      decarbonization: "Medium",
      roi: 8.9,
      liquidity_rating: "B",
      source: "Direct",
      matching_score: 76
    }
  ],
  due_diligence: {
    status: "In Progress",
    completion_rate: 75,
    documents: [
      {
        name: "Financial Statements",
        status: "Verified",
        date: "2024-03-16"
      },
      {
        name: "Property Inspection Reports",
        status: "Pending",
        date: "2024-03-17"
      },
      {
        name: "Environmental Assessment",
        status: "In Review",
        date: "2024-03-18"
      }
    ],
    key_findings: [
      "Strong financial performance",
      "Minor maintenance backlog",
      "High tenant satisfaction"
    ]
  },
  risk_assessment: {
    overall_risk: "Medium",
    financial_risks: [
      "Market volatility",
      "Interest rate changes"
    ],
    operational_risks: [
      "Maintenance requirements",
      "Tenant turnover"
    ],
    strategic_risks: [
      "Regulatory changes",
      "Market competition"
    ],
    total_investment: 22300000,
    expected_roi: 8.4,
    carbon_reduction: 155
  },
  stakeholders: [
    {
      role: "Investment Manager",
      name: "Sarah Schmidt",
      status: "Approved"
    },
    {
      role: "Legal Counsel",
      name: "Michael Weber",
      status: "Pending"
    },
    {
      role: "Technical Advisor",
      name: "Thomas Müller",
      status: "Approved"
    }
  ],
  closing_details: {
    target_date: "2024-05-15",
    payment_method: "Bank Transfer",
    conditions: [
      "Board approval",
      "Regulatory clearance",
      "Due diligence completion"
    ]
  }
}

export default function TransactionDetailsPage() {
  const params = useParams()
  // In a real app, we would fetch transaction data based on params.transactionId

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/transactions" className="hover:text-primary">
          Transactions
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>{mockTransaction.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{mockTransaction.name}</h2>
          <p className="text-muted-foreground">
            Initiated on {new Date(mockTransaction.date_initiated).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Details
          </Button>
        </div>
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">€{(mockTransaction.budget / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              mockTransaction.status === 'Completed' 
                ? 'bg-green-50 text-green-700' 
                : mockTransaction.status === 'In Progress'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-gray-50 text-gray-700'
            }`}>
              {mockTransaction.status}
            </span>
            <p className="text-sm text-muted-foreground mt-1">Status</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockTransaction.selected_assets.length}</div>
            <p className="text-sm text-muted-foreground">Assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockTransaction.due_diligence.completion_rate}%</div>
            <p className="text-sm text-muted-foreground">Due Diligence</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Details */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{mockTransaction.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Template</p>
                <p className="font-medium">{mockTransaction.template}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Phase</p>
                <p className="font-medium">{mockTransaction.market_conditions.market_phase}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Competition Level</p>
                <p className="font-medium">{mockTransaction.market_conditions.competition_level}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Regulatory Environment</p>
                <p className="font-medium">{mockTransaction.market_conditions.regulatory_environment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Closing Date</p>
                <p className="font-medium">{new Date(mockTransaction.closing_details.target_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Match</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransaction.selected_assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <Link 
                      href={`/assets/${asset.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {asset.name}
                    </Link>
                  </TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>€{(asset.portfolio_value / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>{asset.roi}%</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {asset.matching_score}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Due Diligence */}
      <Card>
        <CardHeader>
          <CardTitle>Due Diligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransaction.due_diligence.documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        {doc.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        doc.status === 'Verified' 
                          ? 'bg-green-50 text-green-700' 
                          : doc.status === 'Pending'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <h4 className="font-medium mb-2">Key Findings</h4>
              <ul className="list-disc list-inside space-y-1">
                {mockTransaction.due_diligence.key_findings.map((finding, index) => (
                  <li key={index} className="text-muted-foreground">{finding}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk Level</p>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mt-1 ${
                  mockTransaction.risk_assessment.overall_risk === 'Low' 
                    ? 'bg-green-50 text-green-700' 
                    : mockTransaction.risk_assessment.overall_risk === 'Medium'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {mockTransaction.risk_assessment.overall_risk}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Financial Risks</p>
                <ul className="list-disc list-inside space-y-1">
                  {mockTransaction.risk_assessment.financial_risks.map((risk, index) => (
                    <li key={index} className="text-muted-foreground">{risk}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Operational Risks</p>
                <ul className="list-disc list-inside space-y-1">
                  {mockTransaction.risk_assessment.operational_risks.map((risk, index) => (
                    <li key={index} className="text-muted-foreground">{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold">€{(mockTransaction.risk_assessment.total_investment / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected ROI</p>
                <p className="text-2xl font-bold">{mockTransaction.risk_assessment.expected_roi}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                <p className="text-2xl font-bold">{mockTransaction.risk_assessment.carbon_reduction} tons/year</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stakeholders */}
      <Card>
        <CardHeader>
          <CardTitle>Stakeholders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransaction.stakeholders.map((stakeholder, index) => (
                <TableRow key={index}>
                  <TableCell>{stakeholder.role}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">{stakeholder.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      stakeholder.status === 'Approved' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {stakeholder.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Closing Details */}
      <Card>
        <CardHeader>
          <CardTitle>Closing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{mockTransaction.closing_details.payment_method}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target Closing Date</p>
                <p className="font-medium">{new Date(mockTransaction.closing_details.target_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Closing Conditions</p>
              <ul className="list-disc list-inside space-y-1">
                {mockTransaction.closing_details.conditions.map((condition, index) => (
                  <li key={index} className="text-muted-foreground">{condition}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 