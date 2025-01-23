'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from "date-fns"
import { AssetDetailsDialog } from '../asset-details-dialog'
import { AssetUploadDialog } from '../asset-upload-dialog'

type StepTwoProps = {
  formData: any
  updateFormData: (data: any) => void
}

// Mock data for assets with enhanced information
const mockAssets = [
  {
    id: 1,
    name: "Kreuzberg Residential Complex",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    decarbonization_score: 85.5,
    portfolio_value: 2500000,
    roi: 9.2,
    liquidity_rating: "high",
    source: "Screening"
  },
  {
    id: 2,
    name: "Prenzlauer Berg Apartments",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "Medium",
    decarbonization_score: 65.8,
    portfolio_value: 1800000,
    roi: 8.5,
    liquidity_rating: "medium",
    source: "Screening"
  },
  {
    id: 3,
    name: "Charlottenburg Manor",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    decarbonization_score: 92.3,
    portfolio_value: 3200000,
    roi: 10.1,
    liquidity_rating: "medium",
    source: "Screening"
  },
  {
    id: 4,
    name: "Mitte Residential Tower",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "Medium",
    decarbonization_score: 71.2,
    portfolio_value: 4100000,
    roi: 7.8,
    liquidity_rating: "high",
    source: "Screening"
  },
  {
    id: 5,
    name: "Friedrichshain Complex",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    decarbonization_score: 88.7,
    portfolio_value: 2900000,
    roi: 9.7,
    liquidity_rating: "low",
    source: "Screening"
  },
]

const regions = [
  "Berlin",
  "Hamburg",
  "Munich",
  "Frankfurt",
  "Düsseldorf"
]

export function StepTwo({ formData, updateFormData }: StepTwoProps) {
  const [selectedAssets, setSelectedAssets] = useState<number[]>([])
  const [assets, setAssets] = useState(mockAssets)
  const [performanceCriteria, setPerformanceCriteria] = useState({
    roi: { min: "5", max: "15" },
    occupancy: { min: "70", max: "100" },
    tenantStability: { min: "60", max: "100" },
    energyEfficiency: { min: "50", max: "100" }
  })
  const [selectedAssetForDialog, setSelectedAssetForDialog] = useState<number | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Calculate total value and average ROI from selected assets
  const selectedAssetsData = formData.selectedAssets || []
  const totalValue = selectedAssetsData.reduce((sum: number, asset: any) => sum + asset.portfolio_value, 0)
  const averageROI = selectedAssetsData.length > 0
    ? selectedAssetsData.reduce((sum: number, asset: any) => sum + asset.roi, 0) / selectedAssetsData.length
    : 0

  const handleAssetSelect = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const handleAddSelected = () => {
    const selectedAssetData = assets.filter(asset => 
      selectedAssets.includes(asset.id)
    )
    updateFormData({
      ...formData,
      selectedAssets: [...(formData.selectedAssets || []), ...selectedAssetData]
    })
    setSelectedAssets([])
  }

  const handleFileUpload = () => {
    setIsUploadDialogOpen(true)
  }

  const handleCriteriaChange = (
    category: keyof typeof performanceCriteria,
    bound: 'min' | 'max',
    value: string
  ) => {
    setPerformanceCriteria(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [bound]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Transaction Information Box */}
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <h3 className="text-lg font-semibold">Transaction Information</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
              {/* Basic Information */}
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 font-medium">{formData.transactionType || 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-medium">Pending</span>
              </div>
              
              {/* Dates */}
              <div>
                <span className="text-muted-foreground">Date Initiated:</span>
                <span className="ml-2 font-medium">{formData.transactionDate ? format(new Date(formData.transactionDate), 'PP') : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date Closed:</span>
                <span className="ml-2 font-medium text-muted-foreground">Not available</span>
              </div>
              
              {/* Financial Information */}
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <span className="ml-2 font-medium">{formData.budget ? `€${parseInt(formData.budget).toLocaleString()}` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Value:</span>
                <span className="ml-2 font-medium">{totalValue ? `€${totalValue.toLocaleString()}` : 'Not set'}</span>
              </div>
              
              {/* Risk and Returns */}
              <div>
                <span className="text-muted-foreground">Expected ROI:</span>
                <span className="ml-2 font-medium">{averageROI ? `${averageROI.toFixed(1)}%` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction Risk:</span>
                <span className="ml-2 font-medium text-muted-foreground">Not available</span>
              </div>
              
              {/* Strategic Information */}
              <div className="col-span-2">
                <span className="text-muted-foreground">Strategic Goal:</span>
                <span className="ml-2 font-medium">{formData.strategic_goal_alignment || 'Not set'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Market Conditions:</span>
                <span className="ml-2 font-medium text-muted-foreground">Not available</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Criteria Setup */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Region</Label>
              <Select 
                onValueChange={(value) => updateFormData({...formData, region: value})}
                value={formData.region}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Asset Type</Label>
              <Select
                onValueChange={(value) => updateFormData({...formData, assetType: value})}
                value={formData.assetType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multi-family">Multi Family Home</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label>Target Budget Range</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Minimum ($)</Label>
                  <Input
                    type="number"
                    min={100000}
                    max={5000000}
                    step={100000}
                    defaultValue={100000}
                    onChange={(e) => updateFormData({...formData, targetBudgetMin: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm">Maximum ($)</Label>
                  <Input
                    type="number"
                    min={100000}
                    max={5000000}
                    step={100000}
                    defaultValue={5000000}
                    onChange={(e) => updateFormData({...formData, targetBudgetMax: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Performance Criteria Inputs */}
            <div className="col-span-2 space-y-4">
              <Label>Performance Criteria</Label>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Annual Return (ROI) Min %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={performanceCriteria.roi.min}
                      onChange={(e) => handleCriteriaChange('roi', 'min', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Annual Return (ROI) Max %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={performanceCriteria.roi.max}
                      onChange={(e) => handleCriteriaChange('roi', 'max', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Occupancy Rate Min %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.occupancy.min}
                      onChange={(e) => handleCriteriaChange('occupancy', 'min', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Occupancy Rate Max %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.occupancy.max}
                      onChange={(e) => handleCriteriaChange('occupancy', 'max', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Tenant Stability Min %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.tenantStability.min}
                      onChange={(e) => handleCriteriaChange('tenantStability', 'min', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Tenant Stability Max %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.tenantStability.max}
                      onChange={(e) => handleCriteriaChange('tenantStability', 'max', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Energy Efficiency Min %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.energyEfficiency.min}
                      onChange={(e) => handleCriteriaChange('energyEfficiency', 'min', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Energy Efficiency Max %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={performanceCriteria.energyEfficiency.max}
                      onChange={(e) => handleCriteriaChange('energyEfficiency', 'max', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Search Results</h3>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={handleFileUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
              <Button 
                onClick={handleAddSelected}
                disabled={selectedAssets.length === 0}
              >
                Add Selected Assets
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Portfolio Value</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Decarbonization</TableHead>
                <TableHead>Liquidity</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedAssets.includes(asset.id)}
                      onCheckedChange={() => handleAssetSelect(asset.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedAssetForDialog(asset.id)}
                      className="text-left hover:underline text-blue-600"
                    >
                      {asset.name}
                    </button>
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>€{asset.portfolio_value.toLocaleString()}</TableCell>
                  <TableCell>{asset.roi}%</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={`px-2 py-1 rounded text-sm ${
                        asset.decarbonization === 'High' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {asset.decarbonization}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Score: {asset.decarbonization_score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      asset.liquidity_rating === 'high' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.liquidity_rating === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {asset.liquidity_rating.charAt(0).toUpperCase() + asset.liquidity_rating.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{asset.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Asset Details Dialog */}
      <AssetDetailsDialog
        isOpen={selectedAssetForDialog !== null}
        onClose={() => setSelectedAssetForDialog(null)}
        assetId={selectedAssetForDialog || 0}
      />

      {/* Asset Upload Dialog */}
      <AssetUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onAssetAdd={(asset) => {
          setAssets([...assets, asset])
        }}
      />
    </div>
  )
} 