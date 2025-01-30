'use client'

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, ChevronRight, Users, Calendar, Euro, TrendingUp, CreditCard, Percent } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for an estate (using the same structure as in estate-details-dialog)
const mockEstate = {
  id: "e1",
  unit_number: "101",
  type: "apartment",
  size: 85.5,
  current_rent: 1450,
  occupancy_status: "occupied",
  tenant_profile: {
    tenant_type: "Family",
    lease_start: "2022-06-01",
    lease_duration: 24,
    tenant_history: [
      "Previous 2-year lease completed successfully",
      "No major incidents reported",
      "Regular maintenance requests handled promptly"
    ],
    payment_history: {
      on_time_payments: 22,
      late_payments: 1,
      total_payments: 23
    },
    special_requirements: [
      "Pet-friendly accommodation",
      "Additional storage space"
    ]
  },
  lease_terms: {
    monthly_rent: 1450,
    security_deposit: 4350,
    payment_terms: "Due by 3rd of each month",
    lease_start_date: "2022-06-01",
    lease_end_date: "2024-05-31",
    renewal_options: "Option to renew for 2 years with 3% increase",
    included_utilities: [
      "Water",
      "Building maintenance",
      "Garbage collection"
    ],
    special_conditions: [
      "No short-term subletting",
      "Annual property inspection required"
    ]
  },
  turnover_costs: 2800,
  unit_condition: "excellent",
  name: "Estate A",
  image: "/mfh_estate_interior.jpg",
  financial_metrics: {
    market_value: 850000,
    price_per_sqm: 9942, // 850000 / 85.5
    annual_rental_income: 17400, // 1450 * 12
    potential_annual_income: 18000,
    operating_expenses: 3480, // 20% of current rental income
    net_operating_income: 13920,
    rental_yield: 2.05, // (17400 / 850000) * 100
    price_to_rent_ratio: 48.85, // 850000 / 17400
    last_valuation_date: "2024-01-15",
    historical_values: [
      { date: "2023-01", value: 820000 },
      { date: "2023-06", value: 835000 },
      { date: "2024-01", value: 850000 }
    ]
  }
}

export default function EstateDetailsPage() {
  const params = useParams()
  // In a real app, we would fetch the estate data based on params.estateId
  
  // Calculate additional metrics
  const monthlyExpenses = mockEstate.financial_metrics.operating_expenses / 12
  const monthlyNOI = mockEstate.financial_metrics.net_operating_income / 12
  const occupancyRate = mockEstate.occupancy_status === 'occupied' ? 100 : 0
  const valueAppreciation = ((mockEstate.financial_metrics.market_value - mockEstate.financial_metrics.historical_values[0].value) / mockEstate.financial_metrics.historical_values[0].value) * 100

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
        <Link href={`/assets/${params.assetId}/buildings/${params.buildingId}`} className="hover:text-primary">
          Building
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Unit {mockEstate.unit_number}</span>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Unit {mockEstate.unit_number} - {mockEstate.type.charAt(0).toUpperCase() + mockEstate.type.slice(1)}
        </h2>
      </div>

      {/* Estate Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={mockEstate.image}
          alt={mockEstate.name}
          fill
          className="object-cover rounded-lg"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Value</p>
                <div className="text-2xl font-bold">€{(mockEstate.financial_metrics.market_value / 1000).toFixed(0)}k</div>
                <p className="text-xs text-muted-foreground mt-1">€{mockEstate.financial_metrics.price_per_sqm}/m²</p>
              </div>
              <Euro className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <div className="text-2xl font-bold">€{mockEstate.current_rent}</div>
                <p className="text-xs text-muted-foreground mt-1">Current rental income</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly NOI</p>
                <div className="text-2xl font-bold">€{monthlyNOI.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground mt-1">Net operating income</p>
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rental Yield</p>
                <div className="text-2xl font-bold">{mockEstate.financial_metrics.rental_yield.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground mt-1">Annual yield</p>
              </div>
              <Percent className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-2xl font-bold">€{monthlyExpenses.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground mt-1">Operating costs</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price to Rent Ratio</p>
                <p className="text-2xl font-bold">{mockEstate.financial_metrics.price_to_rent_ratio.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">Market value / Annual rent</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Value Appreciation</p>
                <p className="text-2xl font-bold">{valueAppreciation.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">Past 12 months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Valuation</p>
                <p className="text-2xl font-bold">{new Date(mockEstate.financial_metrics.last_valuation_date).toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Market value assessment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tenant Type</p>
                <p className="font-medium">{mockEstate.tenant_profile.tenant_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lease Duration</p>
                <p className="font-medium">{mockEstate.tenant_profile.lease_duration} months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment History</p>
                <p className="font-medium">
                  {mockEstate.tenant_profile.payment_history.on_time_payments} on-time /
                  {mockEstate.tenant_profile.payment_history.total_payments} total payments
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Special Requirements</p>
                <ul className="list-disc list-inside">
                  {mockEstate.tenant_profile.special_requirements.map((req, index) => (
                    <li key={index} className="font-medium">{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenant History</p>
                <ul className="list-disc list-inside">
                  {mockEstate.tenant_profile.tenant_history.map((history, index) => (
                    <li key={index} className="font-medium">{history}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lease Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Lease Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">€{mockEstate.lease_terms.monthly_rent}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Security Deposit</p>
                <p className="font-medium">€{mockEstate.lease_terms.security_deposit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Terms</p>
                <p className="font-medium">{mockEstate.lease_terms.payment_terms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lease Period</p>
                <p className="font-medium">
                  {new Date(mockEstate.lease_terms.lease_start_date).toLocaleDateString()} - 
                  {new Date(mockEstate.lease_terms.lease_end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Included Utilities</p>
                <ul className="list-disc list-inside">
                  {mockEstate.lease_terms.included_utilities.map((utility, index) => (
                    <li key={index} className="font-medium">{utility}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Special Conditions</p>
                <ul className="list-disc list-inside">
                  {mockEstate.lease_terms.special_conditions.map((condition, index) => (
                    <li key={index} className="font-medium">{condition}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Condition */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Condition</p>
              <Badge className={`mt-1 ${
                mockEstate.unit_condition === 'excellent' 
                  ? 'bg-green-100 text-green-800' 
                  : mockEstate.unit_condition === 'good'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {mockEstate.unit_condition.charAt(0).toUpperCase() + mockEstate.unit_condition.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Turnover Costs</p>
              <p className="font-medium">€{mockEstate.turnover_costs}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 