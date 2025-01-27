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
import Link from "next/link"
import Image from "next/image"
import { Building2 } from "lucide-react"

// Mock data for a single asset (using the same structure as in asset-details-dialog)
const mockAsset = {
  id: 1,
  name: "Kreuzberg Residential Complex",
  type: "Residential",
  location: "Berlin, Germany",
  portfolio_value: 12500000,
  decarbonization: "High",
  decarbonization_score: 85,
  roi: 7.8,
  liquidity_rating: "A",
  performance_metrics: {
    occupancy_rate: 95,
    operating_expenses: 450000,
    net_operating_income: 980000
  },
  future_potential: {
    value_appreciation: "High",
    development_opportunities: ["Rooftop Solar Installation", "EV Charging Stations"],
    market_outlook: "Positive"
  },
  buildings: [
    {
      id: "b1",
      name: "Building A",
      type: "residential",
      units: 24,
      occupancy_rate: 96,
      image: "/mfh_building.jpg"
    },
    {
      id: "b2",
      name: "Building B",
      type: "mixed-use",
      units: 18,
      occupancy_rate: 92,
      image: "/mfh_building.jpg"
    }
  ]
}

export default function AssetDetailsPage() {
  const params = useParams()
  // In a real app, we would fetch the asset data based on params.assetId
  
  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{mockAsset.name}</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">€{(mockAsset.portfolio_value / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Portfolio Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockAsset.decarbonization_score}</div>
            <p className="text-sm text-muted-foreground">Decarbonization Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockAsset.roi}%</div>
            <p className="text-sm text-muted-foreground">ROI</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Badge variant="outline" className="text-lg">
              {mockAsset.liquidity_rating}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">Liquidity Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className="text-2xl font-bold">{mockAsset.performance_metrics.occupancy_rate}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Operating Expenses</p>
              <p className="text-2xl font-bold">€{(mockAsset.performance_metrics.operating_expenses / 1000).toFixed(0)}k</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Operating Income</p>
              <p className="text-2xl font-bold">€{(mockAsset.performance_metrics.net_operating_income / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Potential */}
      <Card>
        <CardHeader>
          <CardTitle>Future Potential</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Value Appreciation</p>
              <p className="font-medium">{mockAsset.future_potential.value_appreciation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Development Opportunities</p>
              <ul className="list-disc list-inside">
                {mockAsset.future_potential.development_opportunities.map((opportunity, index) => (
                  <li key={index} className="font-medium">{opportunity}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Outlook</p>
              <p className="font-medium">{mockAsset.future_potential.market_outlook}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buildings */}
      <Card>
        <CardHeader>
          <CardTitle>Buildings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {mockAsset.buildings.map((building) => (
              <Link 
                key={building.id}
                href={`/assets/${mockAsset.id}/buildings/${building.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="relative w-full h-[200px] mb-4">
                      <Image
                        src={building.image}
                        alt={building.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{building.name}</h3>
                        <p className="text-sm text-muted-foreground">{building.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{building.units} Units</p>
                        <p className="text-sm text-muted-foreground">{building.occupancy_rate}% Occupied</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 