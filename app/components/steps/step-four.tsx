'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis
} from 'recharts'
import { CircleDot, Download, AlertCircle, Info } from "lucide-react"
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TransactionInfoBar } from "../transaction-info-bar"

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

type SimulationInputs = {
  initialInvestment: number
  energySavings: number
  carbonReduction: number
}

type StepFourProps = {
  formData: any
  updateFormData: (data: any) => void
}

// Mock data for the assets
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

// Generate scatter plot data for investment vs reduction
const generateScatterData = (assets: Asset[]) => {
  return assets.map(asset => ({
    name: asset.name,
    investment: asset.investmentRequired / 1000, // Convert to thousands
    reduction: asset.potentialReduction,
    roi: asset.roi,
    risk: asset.riskLevel
  }))
}

export function StepFour({ formData, updateFormData }: StepFourProps) {
  const [assets] = useState<Asset[]>(mockAssets)
  const [simulationInputs, setSimulationInputs] = useState<SimulationInputs>({
    initialInvestment: 500000,
    energySavings: 30,
    carbonReduction: 50
  })

  const scatterData = generateScatterData(assets)
  
  const portfolioSummary = {
    totalInvestment: assets.reduce((sum, asset) => sum + asset.investmentRequired, 0),
    totalReduction: assets.reduce((sum, asset) => sum + asset.potentialReduction, 0),
    averageROI: assets.reduce((sum, asset) => sum + asset.roi, 0) / assets.length,
    highRiskCount: assets.filter(asset => asset.riskLevel === 'High').length
  }

  const calculateProjectedROI = () => {
    const annualSavings = (simulationInputs.energySavings / 100) * simulationInputs.initialInvestment
    return ((annualSavings / simulationInputs.initialInvestment) * 100).toFixed(1)
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

  return (
    <div className="space-y-6">
      <TransactionInfoBar step={4} formData={formData} />
      
      {/* Portfolio Summary Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Portfolio Summary</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <Label>Total Investment</Label>
                <TooltipProvider>
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Total investment required across all assets
                    </TooltipContent>
                  </TooltipUI>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold mt-2">
                €{(portfolioSummary.totalInvestment / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <Label>Carbon Reduction</Label>
                <TooltipProvider>
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Total potential carbon reduction per year
                    </TooltipContent>
                  </TooltipUI>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold mt-2">
                {portfolioSummary.totalReduction} tons/year
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <Label>Average ROI</Label>
                <TooltipProvider>
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Average return on investment across portfolio
                    </TooltipContent>
                  </TooltipUI>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold mt-2">
                {portfolioSummary.averageROI.toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <Label>High Risk Assets</Label>
                <TooltipProvider>
                  <TooltipUI>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Number of assets with high risk assessment
                    </TooltipContent>
                  </TooltipUI>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-bold mt-2">
                {portfolioSummary.highRiskCount} of {assets.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Chart */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Investment vs. Carbon Reduction Analysis</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="investment" 
                  name="Investment" 
                  unit="k€"
                  label={{ value: 'Investment (k€)', position: 'bottom', offset: 20 }}
                />
                <YAxis 
                  dataKey="reduction" 
                  name="Carbon Reduction"
                  unit=" tons"
                  label={{ 
                    value: 'Carbon Reduction (tons/year)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: -20,
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload, label }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <p className="font-semibold">{data.name}</p>
                          <p>Investment: €{data.investment}k</p>
                          <p>Reduction: {data.reduction} tons/year</p>
                          <p>ROI: {data.roi}%</p>
                          <p>Risk Level: {data.risk}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter 
                  data={scatterData} 
                  fill="#8884d8"
                  shape={(props: any) => {
                    const { cx, cy } = props
                    const risk = props.payload.risk
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={8} 
                        fill={
                          risk === 'High' ? '#ef4444' : 
                          risk === 'Medium' ? '#f59e0b' : 
                          '#22c55e'
                        }
                      />
                    )
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Asset List */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Asset Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Current ROI</TableHead>
                <TableHead>Decarbonization Potential</TableHead>
                <TableHead>Required Investment</TableHead>
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

      {/* Simulation Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Investment Simulation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Initial Investment (€)</Label>
                <Input
                  type="number"
                  value={simulationInputs.initialInvestment}
                  onChange={(e) => setSimulationInputs(prev => ({
                    ...prev,
                    initialInvestment: Number(e.target.value)
                  }))}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Expected Energy Savings (%)</Label>
                  <span className="text-sm text-muted-foreground">
                    {simulationInputs.energySavings}%
                  </span>
                </div>
                <Slider
                  value={[simulationInputs.energySavings]}
                  onValueChange={([value]) => setSimulationInputs(prev => ({
                    ...prev,
                    energySavings: value
                  }))}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Carbon Emissions Reduction (%)</Label>
                  <span className="text-sm text-muted-foreground">
                    {simulationInputs.carbonReduction}%
                  </span>
                </div>
                <Slider
                  value={[simulationInputs.carbonReduction]}
                  onValueChange={([value]) => setSimulationInputs(prev => ({
                    ...prev,
                    carbonReduction: value
                  }))}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-6">
              <h4 className="font-semibold">Simulation Results</h4>
              
              <div className="space-y-4">
                <div>
                  <Label>Projected Annual ROI</Label>
                  <p className="text-2xl font-bold text-green-600">{calculateProjectedROI()}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on energy savings and investment amount
                  </p>
                </div>

                <div>
                  <Label>Estimated Carbon Reduction</Label>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(350 * (simulationInputs.carbonReduction / 100))} tons CO2/year
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total reduction across all assets
                  </p>
                </div>

                <div>
                  <Label>Payback Period</Label>
                  <p className="text-2xl font-bold">
                    {Math.ceil(100 / Number(calculateProjectedROI()))} years
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Time to recover initial investment
                  </p>
                </div>
              </div>

              {Number(calculateProjectedROI()) < 5 && (
                <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-3 rounded-md mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">
                    Consider adjusting parameters for better ROI (recommended: {'>'} 5%)
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 