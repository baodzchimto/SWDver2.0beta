export interface SearchCriteriaDto {
  location?: string
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  availableFrom?: string
  furnishedStatus?: string
  privateWC?: boolean
}

export interface ListingSummaryDto {
  listingId: string
  title: string
  price: number
  capacity: number
  furnishedStatus: string
  firstImageUrl?: string
  address: string
  status: string
}

export interface LocationDataDto {
  listingId: string
  lat?: number
  lng?: number
  mapUrl?: string
}

export interface SearchPageResponseDto {
  summaries: ListingSummaryDto[]
  locationData: LocationDataDto[]
}

export interface SearchResponseDto {
  summaries: ListingSummaryDto[]
  locationData: LocationDataDto[]
  hasResults: boolean
}

export interface RoomDetailDto {
  listingId: string
  propertyId: string
  ownerId: string
  title: string
  description?: string
  price: number
  capacity: number
  amenities: string[]
  availableFrom: string
  furnishedStatus: string
  privateWCStatus: string
  imagesRef: string[]
  status: string
  propertyName: string
  propertyAddress: string
  propertyPolicies?: string
}

export interface MapDto {
  embedUrl?: string
  lat?: number
  lng?: number
}

export interface RoomListingDraftDto {
  propertyId: string
  title: string
  description?: string
  price: number
  capacity: number
  amenities?: string
  availableFrom: string
  furnishedStatus: string
  privateWCStatus: string
}

export interface ListingResponseDto {
  listingId: string
  title: string
  status: string
  propertyId: string
}

export interface PublicationEligibilityDto {
  eligible: boolean
  blockers: string[]
}

export interface VisibilityActionDto {
  action: 'Hide' | 'Show'
}

export interface AcceptedArrangementDto {
  requestId: string
  listingId: string
  listingTitle: string
  tenantName: string
  moveInDate: string
  acceptedAt: string
}
