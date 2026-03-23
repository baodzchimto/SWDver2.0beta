import { apiRequest } from '@/lib/api/api-client'

export interface PropertyDto {
  name: string
  address: string
  mapLocation?: string
  description?: string
  generalPolicies?: string
}

export interface PropertySummaryDto {
  propertyId: string
  name: string
  address: string
  updatedAt: string
}

export const propertiesApi = {
  getForm: () => apiRequest<{ fieldDescriptions: Record<string, string> }>('/api/property/form'),
  createProperty: (data: PropertyDto) => apiRequest<{ propertyId: string; name: string; address: string; createdAt: string }>('/api/property', { method: 'POST', body: JSON.stringify(data) }),
  getMyProperties: () => apiRequest<PropertySummaryDto[]>('/api/property/my'),
  getPropertyForEdit: (id: string) => apiRequest<PropertyDto & { propertyId: string }>(`/api/property/${id}/edit`),
  updateProperty: (id: string, data: PropertyDto) => apiRequest<{ propertyId: string; name: string }>(`/api/property/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}
