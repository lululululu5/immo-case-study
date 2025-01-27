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
import { Home, ChevronRight } from "lucide-react"

// Mock data for a building (using the same structure as in building-details-dialog)
const mockBuilding = {
  id: "b1",
  name: "Bergmannstraße Building",
  type: "residential",
  construction_year: 1985,
  energy_efficiency_rating: "B",
  sustainability_certification: "LEED Gold",
  historical_performance: {
    last_year_income: 980000,
    maintenance_history: [
      "2023: HVAC System Upgrade",
      "2022: Facade Renovation",
      "2021: Solar Panel Installation"
    ],
    occupancy_trend: [92, 94, 95, 96]
  },
  maintenance_cost: 45000,
  tenancy_mix: {
    residential_units: 24,
    commercial_units: 2,
    avg_lease_term: 36
  },
  cap_rate: 4.5,
  vacancy_rate: 4,
  location: {
    address: "Bergmannstraße 100",
    city: "Berlin",
    postal_code: "10961",
    geographic_coordinates: {
      latitude: 52.4889,
      longitude: 13.4094
    },
    local_market_trends: {
      price_trend: "Increasing",
      demand_level: "High",
      future_outlook: "Positive"
    },
    walkability_score: 85,
    transportation_access: "Excellent",
    crime_rate: "low"
  },
  estates: [
    {
      id: "e1",
      unit_number: "101",
      type: "apartment",
      size: 85.5,
      current_rent: 1450,
      occupancy_status: "occupied"
    },
    {
      id: "e2",
      unit_number: "102",
      type: "apartment",
      size: 76.0,
      current_rent: 1280,
      occupancy_status: "occupied"
    },
    {
      id: "e3",
      unit_number: "201",
      type: "apartment",
      size: 92.0,
      current_rent: 1650,
      occupancy_status: "vacant"
    }
  ],
  image: "/mfh_building.jpg"
}

export default function BuildingDetailsPage() {
  const params = useParams()
  // In a real app, we would fetch the building data based on params.buildingId
  
  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/assets" className="hover:text-primary">
          Assets
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/assets/${params.assetId}`} className="hover:text-primary">
          Asset
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Building</span>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{mockBuilding.name}</h2>
      </div>

      {/* Building Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={mockBuilding.image}
          alt={mockBuilding.name}
          fill
          className="object-cover rounded-lg"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockBuilding.construction_year}</div>
            <p className="text-sm text-muted-foreground">Construction Year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Badge variant="outline" className="text-lg">
              {mockBuilding.energy_efficiency_rating}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">Energy Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockBuilding.vacancy_rate}%</div>
            <p className="text-sm text-muted-foreground">Vacancy Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Building Details */}
      <Card>
        <CardHeader>
          <CardTitle>Building Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{mockBuilding.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sustainability</p>
                <p className="font-medium">{mockBuilding.sustainability_certification}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cap Rate</p>
                <p className="font-medium">{mockBuilding.cap_rate}%</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Annual Income</p>
                <p className="font-medium">€{(mockBuilding.historical_performance.last_year_income / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maintenance Cost</p>
                <p className="font-medium">€{(mockBuilding.maintenance_cost / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Lease Term</p>
                <p className="font-medium">{mockBuilding.tenancy_mix.avg_lease_term} months</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{mockBuilding.location.address}</p>
                <p className="font-medium">{mockBuilding.location.postal_code} {mockBuilding.location.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transportation</p>
                <p className="font-medium">{mockBuilding.location.transportation_access}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Walkability Score</p>
                <p className="font-medium">{mockBuilding.location.walkability_score}/100</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Market Trends</p>
                <p className="font-medium">Price: {mockBuilding.location.local_market_trends.price_trend}</p>
                <p className="font-medium">Demand: {mockBuilding.location.local_market_trends.demand_level}</p>
                <p className="font-medium">Outlook: {mockBuilding.location.local_market_trends.future_outlook}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size (m²)</TableHead>
                <TableHead>Current Rent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBuilding.estates.map((estate) => (
                <TableRow key={estate.id}>
                  <TableCell>
                    <Link
                      href={`/assets/${params.assetId}/buildings/${params.buildingId}/estates/${estate.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {estate.unit_number}
                    </Link>
                  </TableCell>
                  <TableCell className="capitalize">{estate.type}</TableCell>
                  <TableCell>{estate.size}</TableCell>
                  <TableCell>€{estate.current_rent}</TableCell>
                  <TableCell>
                    <Badge variant={estate.occupancy_status === 'occupied' ? 'default' : 'destructive'}>
                      {estate.occupancy_status}
                    </Badge>
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