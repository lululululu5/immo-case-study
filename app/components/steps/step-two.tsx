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

type StepTwoProps = {
  formData: any
  updateFormData: (data: any) => void
}

// Mock data for assets
const mockAssets = [
  {
    id: 1,
    name: "Kreuzberg Residential Complex",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    roi: "9.2%",
    source: "Screening"
  },
  {
    id: 2,
    name: "Prenzlauer Berg Apartments",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "Medium",
    roi: "8.5%",
    source: "Screening"
  },
  {
    id: 3,
    name: "Charlottenburg Manor",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    roi: "10.1%",
    source: "Screening"
  },
  {
    id: 4,
    name: "Mitte Residential Tower",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "Medium",
    roi: "7.8%",
    source: "Screening"
  },
  {
    id: 5,
    name: "Friedrichshain Complex",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    roi: "9.7%",
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
    const mockUploadedAsset = {
      id: assets.length + 1,
      name: "Uploaded Property Complex",
      location: "Berlin, Germany",
      type: "Multi Family Home",
      decarbonization: "Medium",
      roi: "8.9%",
      source: "Manually Uploaded"
    }
    setAssets([...assets, mockUploadedAsset])
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
                <TableHead>Decarbonization</TableHead>
                <TableHead>ROI</TableHead>
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
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      asset.decarbonization === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {asset.decarbonization}
                    </span>
                  </TableCell>
                  <TableCell>{asset.roi}</TableCell>
                  <TableCell>{asset.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 