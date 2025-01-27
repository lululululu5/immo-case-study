'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, ChevronRight, Building2, DoorOpen } from "lucide-react"
import { useState } from "react"
import { EstateDetailsDialog } from "./estate-details-dialog"
import Image from "next/image"

type Estate = {
  id: string
  unit_number: string
  type: 'apartment' | 'commercial'
  size: number
  current_rent: number
  occupancy_status: 'occupied' | 'vacant'
  picture_urls: string[]
  tenant_profile: {
    tenant_type: string
    lease_start: string
    lease_duration: number
  }
  lease_terms: {
    monthly_rent: number
    security_deposit: number
    payment_terms: string
  }
  turnover_costs: number
  unit_condition: 'excellent' | 'good' | 'needs repair'
}

type Building = {
  id: string
  name: string
  type: 'residential' | 'commercial'
  construction_year: number
  energy_efficiency_rating: string
  sustainability_certification: string
  historical_performance: {
    last_year_income: number
    maintenance_history: string[]
    occupancy_trend: number[]
  }
  maintenance_cost: number
  tenancy_mix: {
    residential_units: number
    commercial_units: number
    avg_lease_term: number
  }
  cap_rate: number
  vacancy_rate: number
  location: {
    address: string
    city: string
    postal_code: string
    geographic_coordinates: {
      latitude: number
      longitude: number
    }
    local_market_trends: {
      price_trend: string
      demand_level: string
      future_outlook: string
    }
    walkability_score: number
    transportation_access: string
    crime_rate: 'low' | 'medium' | 'high'
  }
  estates: Estate[]
  image: string
}

// Update the mock data with more estates
const mockBuildingData: Building = {
  id: "b1",
  name: "Bergmannstraße Building",
  type: "residential",
  construction_year: 1985,
  energy_efficiency_rating: "B",
  sustainability_certification: "LEED Gold",
  historical_performance: {
    last_year_income: 320000,
    maintenance_history: [
      "2023: HVAC system upgrade",
      "2022: Facade renovation",
      "2021: Solar panel installation"
    ],
    occupancy_trend: [92, 94, 96, 95]
  },
  maintenance_cost: 45000,
  tenancy_mix: {
    residential_units: 24,
    commercial_units: 2,
    avg_lease_term: 3.5
  },
  cap_rate: 4.2,
  vacancy_rate: 3.5,
  location: {
    address: "Bergmannstraße 75",
    city: "Berlin",
    postal_code: "10961",
    geographic_coordinates: {
      latitude: 52.4889,
      longitude: 13.4094
    },
    local_market_trends: {
      price_trend: "Increasing",
      demand_level: "High",
      future_outlook: "Strong growth potential"
    },
    walkability_score: 92,
    transportation_access: "U-Bahn station within 200m, multiple bus lines",
    crime_rate: "low"
  },
  estates: [
    {
      id: "e1",
      unit_number: "101",
      type: "apartment",
      size: 85.5,
      current_rent: 1450,
      occupancy_status: "occupied",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Family",
        lease_start: "2022-06-01",
        lease_duration: 24
      },
      lease_terms: {
        monthly_rent: 1450,
        security_deposit: 4350,
        payment_terms: "Due by 3rd of each month"
      },
      turnover_costs: 2800,
      unit_condition: "excellent"
    },
    {
      id: "e2",
      unit_number: "102",
      type: "apartment",
      size: 65.0,
      current_rent: 1200,
      occupancy_status: "occupied",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Single",
        lease_start: "2023-01-01",
        lease_duration: 12
      },
      lease_terms: {
        monthly_rent: 1200,
        security_deposit: 3600,
        payment_terms: "Due by 5th of each month"
      },
      turnover_costs: 2200,
      unit_condition: "good"
    },
    {
      id: "e3",
      unit_number: "201",
      type: "apartment",
      size: 92.0,
      current_rent: 1650,
      occupancy_status: "vacant",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Previous: Family",
        lease_start: "2021-03-01",
        lease_duration: 24
      },
      lease_terms: {
        monthly_rent: 1650,
        security_deposit: 4950,
        payment_terms: "Due by 3rd of each month"
      },
      turnover_costs: 3100,
      unit_condition: "needs repair"
    },
    {
      id: "e4",
      unit_number: "202",
      type: "apartment",
      size: 78.5,
      current_rent: 1350,
      occupancy_status: "occupied",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Couple",
        lease_start: "2023-09-01",
        lease_duration: 24
      },
      lease_terms: {
        monthly_rent: 1350,
        security_deposit: 4050,
        payment_terms: "Due by 3rd of each month"
      },
      turnover_costs: 2500,
      unit_condition: "good"
    },
    {
      id: "e5",
      unit_number: "G01",
      type: "commercial",
      size: 120.0,
      current_rent: 2800,
      occupancy_status: "occupied",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Retail Store",
        lease_start: "2022-01-01",
        lease_duration: 60
      },
      lease_terms: {
        monthly_rent: 2800,
        security_deposit: 8400,
        payment_terms: "Due by 1st of each month"
      },
      turnover_costs: 5000,
      unit_condition: "excellent"
    },
    {
      id: "e6",
      unit_number: "G02",
      type: "commercial",
      size: 95.0,
      current_rent: 2200,
      occupancy_status: "occupied",
      picture_urls: ["url1", "url2"],
      tenant_profile: {
        tenant_type: "Office",
        lease_start: "2023-06-01",
        lease_duration: 36
      },
      lease_terms: {
        monthly_rent: 2200,
        security_deposit: 6600,
        payment_terms: "Due by 1st of each month"
      },
      turnover_costs: 4200,
      unit_condition: "good"
    }
  ],
  image: "/mfh_building.jpg"
}

interface BuildingDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  buildingId: string
}

export function BuildingDetailsDialog({
  isOpen,
  onClose,
  buildingId
}: BuildingDetailsDialogProps) {
  // In a real application, we would fetch the building data based on the buildingId
  const building = mockBuildingData
  const [selectedEstateId, setSelectedEstateId] = useState<string | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed z-[110]">
        <DialogHeader>
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Transaction</span>
            <ChevronRight className="h-4 w-4" />
            <span>Asset</span>
            <ChevronRight className="h-4 w-4" />
            <span>Building</span>
          </div>
          <DialogTitle className="text-xl font-semibold pt-2">{building.name}</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[300px] mb-6">
          <Image
            src={building.image}
            alt={building.name}
            fill
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{building.construction_year}</div>
                <p className="text-sm text-muted-foreground">Construction Year</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Badge variant="outline" className="text-lg">
                  {building.energy_efficiency_rating}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">Energy Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{building.vacancy_rate}%</div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="text-lg font-semibold capitalize">{building.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sustainability Certification (LEED)</p>
                  <p className="text-lg font-semibold">{building.sustainability_certification}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cap Rate</p>
                  <p className="text-lg font-semibold">{building.cap_rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance Cost</p>
                  <p className="text-lg font-semibold">€{building.maintenance_cost.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-lg">{building.location.address}</p>
                  <p className="text-sm">{building.location.postal_code} {building.location.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transportation</p>
                  <p className="text-lg">{building.location.transportation_access}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Walkability Score</p>
                  <p className="text-lg font-semibold">{building.location.walkability_score}/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crime Rate</p>
                  <Badge className={`
                    ${building.location.crime_rate === 'low' ? 'bg-green-100 text-green-800' : 
                      building.location.crime_rate === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {building.location.crime_rate.charAt(0).toUpperCase() + building.location.crime_rate.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price Trend</p>
                  <p className="text-lg">{building.location.local_market_trends.price_trend}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Demand Level</p>
                  <p className="text-lg">{building.location.local_market_trends.demand_level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Future Outlook</p>
                  <p className="text-lg">{building.location.local_market_trends.future_outlook}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estates Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5" />
                Units
              </CardTitle>
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
                    <TableHead>Condition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {building.estates.map((estate) => (
                    <TableRow key={estate.id}>
                      <TableCell className="font-medium">
                        <button
                          onClick={() => setSelectedEstateId(estate.id)}
                          className="text-left hover:underline text-blue-600"
                        >
                          {estate.unit_number}
                        </button>
                      </TableCell>
                      <TableCell className="capitalize">{estate.type}</TableCell>
                      <TableCell>{estate.size}</TableCell>
                      <TableCell>€{estate.current_rent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${estate.occupancy_status === 'occupied' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {estate.occupancy_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {estate.unit_condition}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {selectedEstateId && (
        <EstateDetailsDialog
            isOpen={selectedEstateId !== null}
            onClose={() => setSelectedEstateId(null)}
            estateId={selectedEstateId}
        />
        )}
      </DialogContent>
    </Dialog>
  )
}
