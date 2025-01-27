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

export default function AssetsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Assets</h2>
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
                    <span className={`px-2 py-1 rounded text-sm ${
                      asset.decarbonization === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.decarbonization === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {asset.decarbonization}
                    </span>
                  </TableCell>
                  <TableCell>{asset.roi}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      asset.liquidity_rating === 'A' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.liquidity_rating === 'B'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
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