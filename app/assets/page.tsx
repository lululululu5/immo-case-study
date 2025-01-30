'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Building2, TrendingUp, Leaf, Euro } from "lucide-react"

// Mock data for assets (using the same structure as in step-two)
const mockAssets = [
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
]

// Calculate summary statistics
const totalPortfolioValue = mockAssets.reduce((sum, asset) => sum + asset.portfolio_value, 0)
const averageROI = mockAssets.reduce((sum, asset) => sum + asset.roi, 0) / mockAssets.length
const highDecarbonizationCount = mockAssets.filter(asset => asset.decarbonization === "High").length
const highLiquidityCount = mockAssets.filter(asset => asset.liquidity_rating === "A").length

export default function AssetsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Assets</h2>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <div className="text-2xl font-bold">€{(totalPortfolioValue / 1000000).toFixed(1)}M</div>
              </div>
              <Euro className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average ROI</p>
                <div className="text-2xl font-bold">{averageROI.toFixed(1)}%</div>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Decarbonization</p>
                <div className="text-2xl font-bold">{highDecarbonizationCount}</div>
                <p className="text-xs text-muted-foreground mt-1">of {mockAssets.length} assets</p>
              </div>
              <Leaf className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Liquidity</p>
                <div className="text-2xl font-bold">{highLiquidityCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Rating A assets</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Portfolio Value</TableHead>
                <TableHead>Decarbonization</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Liquidity Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssets.map((asset) => (
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
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      asset.decarbonization === 'High' 
                        ? 'bg-green-50 text-green-700' 
                        : asset.decarbonization === 'Medium'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {asset.decarbonization}
                    </span>
                  </TableCell>
                  <TableCell>{asset.roi}%</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      asset.liquidity_rating === 'A' 
                        ? 'bg-green-50 text-green-700' 
                        : asset.liquidity_rating === 'B'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {asset.liquidity_rating}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 