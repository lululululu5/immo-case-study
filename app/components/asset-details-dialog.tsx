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
import { Separator } from "@/components/ui/separator"
import { Building, ChevronRight, Home } from "lucide-react"

// Types for our data structures
type Building = {
  id: string
  name: string
  type: 'MFH'
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
    residential: number
    commercial: number
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
    walkability_score: number
    transportation_access: string
    crime_rate: 'low' | 'medium' | 'high'
  }
}

type Asset = {
  id: number
  name: string
  portfolio_value: number
  decarbonization_score: number
  performance_metrics: {
    current_occupancy: number
    avg_lease_term: number
    operating_expenses: number
    net_operating_income: number
  }
  future_potential: {
    estimated_value_increase: number
    renovation_potential: string
    market_outlook: string
  }
  liquidity_rating: 'low' | 'medium' | 'high'
  buildings: Building[]
}

// Mock data for a single asset
const mockAssetData: Asset = {
  id: 1,
  name: "Kreuzberg Residential Complex",
  portfolio_value: 2500000,
  decarbonization_score: 85.5,
  performance_metrics: {
    current_occupancy: 95.5,
    avg_lease_term: 3.2,
    operating_expenses: 450000,
    net_operating_income: 875000
  },
  future_potential: {
    estimated_value_increase: 12.5,
    renovation_potential: "High potential for energy efficiency improvements",
    market_outlook: "Strong growth expected in the next 5 years"
  },
  liquidity_rating: "high",
  buildings: [
    {
      id: "b1",
      name: "Bergmannstraße Building",
      type: "MFH",
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
        residential: 85,
        commercial: 15,
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
        walkability_score: 92,
        transportation_access: "U-Bahn station within 200m, multiple bus lines",
        crime_rate: "low"
      }
    },
    {
      id: "b2",
      name: "Dieffenbachstraße Complex",
      type: "MFH",
      construction_year: 1992,
      energy_efficiency_rating: "C",
      sustainability_certification: "DGNB Silver",
      historical_performance: {
        last_year_income: 280000,
        maintenance_history: [
          "2023: Window replacement",
          "2022: Heating system modernization"
        ],
        occupancy_trend: [89, 91, 94, 96]
      },
      maintenance_cost: 38000,
      tenancy_mix: {
        residential: 90,
        commercial: 10,
        avg_lease_term: 2.8
      },
      cap_rate: 4.5,
      vacancy_rate: 4.2,
      location: {
        address: "Dieffenbachstraße 45",
        city: "Berlin",
        postal_code: "10967",
        geographic_coordinates: {
          latitude: 52.4912,
          longitude: 13.4167
        },
        walkability_score: 88,
        transportation_access: "Bus stop nearby, 10 min walk to U-Bahn",
        crime_rate: "low"
      }
    },
    {
      id: "b3",
      name: "Graefestraße Residence",
      type: "MFH",
      construction_year: 1978,
      energy_efficiency_rating: "D",
      sustainability_certification: "Pending DGNB",
      historical_performance: {
        last_year_income: 245000,
        maintenance_history: [
          "2023: Roof renovation",
          "2021: Electrical system upgrade"
        ],
        occupancy_trend: [88, 90, 93, 92]
      },
      maintenance_cost: 42000,
      tenancy_mix: {
        residential: 95,
        commercial: 5,
        avg_lease_term: 3.1
      },
      cap_rate: 4.8,
      vacancy_rate: 5.5,
      location: {
        address: "Graefestraße 12",
        city: "Berlin",
        postal_code: "10967",
        geographic_coordinates: {
          latitude: 52.4934,
          longitude: 13.4189
        },
        walkability_score: 85,
        transportation_access: "Multiple bus lines, 15 min walk to U-Bahn",
        crime_rate: "medium"
      }
    },
    {
      id: "b4",
      name: "Urbanstraße Tower",
      type: "MFH",
      construction_year: 1995,
      energy_efficiency_rating: "B",
      sustainability_certification: "LEED Silver",
      historical_performance: {
        last_year_income: 295000,
        maintenance_history: [
          "2023: Smart home system installation",
          "2022: Energy efficiency upgrade"
        ],
        occupancy_trend: [91, 93, 95, 94]
      },
      maintenance_cost: 35000,
      tenancy_mix: {
        residential: 80,
        commercial: 20,
        avg_lease_term: 3.8
      },
      cap_rate: 4.1,
      vacancy_rate: 2.8,
      location: {
        address: "Urbanstraße 89",
        city: "Berlin",
        postal_code: "10967",
        geographic_coordinates: {
          latitude: 52.4901,
          longitude: 13.4228
        },
        walkability_score: 90,
        transportation_access: "U-Bahn station within 300m, tram stop nearby",
        crime_rate: "low"
      }
    }
  ]
}

interface AssetDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  assetId: number
}

export function AssetDetailsDialog({
  isOpen,
  onClose,
  assetId
}: AssetDetailsDialogProps) {
  // In a real application, we would fetch the asset data based on the assetId
  const asset = mockAssetData

  const getLiquidityColor = (rating: string) => {
    switch (rating) {
      case 'high':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed z-[100]">
        <DialogHeader>
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Transaction</span>
            <ChevronRight className="h-4 w-4" />
            <span>Asset</span>
          </div>
          <DialogTitle className="text-xl font-semibold pt-2">{asset.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">€{asset.portfolio_value.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{asset.decarbonization_score}</div>
                <p className="text-sm text-muted-foreground">Decarbonization Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Badge className={`${getLiquidityColor(asset.liquidity_rating)} text-lg`}>
                  {asset.liquidity_rating.charAt(0).toUpperCase() + asset.liquidity_rating.slice(1)}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Occupancy</p>
                  <p className="text-lg font-semibold">{asset.performance_metrics.current_occupancy}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Lease Term</p>
                  <p className="text-lg font-semibold">{asset.performance_metrics.avg_lease_term} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Operating Expenses</p>
                  <p className="text-lg font-semibold">€{asset.performance_metrics.operating_expenses.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Operating Income</p>
                  <p className="text-lg font-semibold">€{asset.performance_metrics.net_operating_income.toLocaleString()}</p>
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
                  <p className="text-sm text-muted-foreground">Estimated Value Increase</p>
                  <p className="text-lg font-semibold">{asset.future_potential.estimated_value_increase}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renovation Potential</p>
                  <p className="text-lg">{asset.future_potential.renovation_potential}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Outlook</p>
                  <p className="text-lg">{asset.future_potential.market_outlook}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buildings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Buildings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Construction Year</TableHead>
                    <TableHead>Energy Rating</TableHead>
                    <TableHead>Vacancy Rate</TableHead>
                    <TableHead>Cap Rate</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asset.buildings.map((building) => (
                    <TableRow key={building.id}>
                      <TableCell className="font-medium">{building.name}</TableCell>
                      <TableCell>{building.construction_year}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{building.energy_efficiency_rating}</Badge>
                      </TableCell>
                      <TableCell>{building.vacancy_rate}%</TableCell>
                      <TableCell>{building.cap_rate}%</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {building.location.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
} 