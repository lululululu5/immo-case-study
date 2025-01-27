'use client'

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, ChevronRight, Users, Calendar, Euro } from "lucide-react"
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
  image: "/mfh_estate_interior.jpg"
}

export default function EstateDetailsPage() {
  const params = useParams()
  // In a real app, we would fetch the estate data based on params.estateId
  
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
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockEstate.size} m²</div>
            <p className="text-sm text-muted-foreground">Unit Size</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">€{mockEstate.current_rent}</div>
            <p className="text-sm text-muted-foreground">Current Rent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Badge variant={mockEstate.occupancy_status === 'occupied' ? 'default' : 'destructive'}>
              {mockEstate.occupancy_status.charAt(0).toUpperCase() + mockEstate.occupancy_status.slice(1)}
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">Status</p>
          </CardContent>
        </Card>
      </div>

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