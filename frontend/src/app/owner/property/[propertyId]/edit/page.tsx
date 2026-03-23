'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LocationPicker } from '@/components/shared/location-picker'
import { propertiesApi } from '@/lib/api/properties'

export default function EditPropertyPage() {
  const { propertyId } = useParams<{ propertyId: string }>()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    address: '',
    mapLocation: '',
    description: '',
    generalPolicies: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    propertiesApi.getPropertyForEdit(propertyId)
      .then(data => {
        // Cast through unknown to safely access optional fields not declared in the return type
        const d = data as unknown as Record<string, unknown>
        setForm({
          name: data.name,
          address: data.address,
          mapLocation: data.mapLocation ?? '',
          description: typeof d.description === 'string' ? d.description : '',
          generalPolicies: typeof d.generalPolicies === 'string' ? d.generalPolicies : '',
        })
      })
      .finally(() => setIsLoading(false))
  }, [propertyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await propertiesApi.updateProperty(propertyId, form)
      router.push('/owner/property')
    } catch {
      // error handled by redirect failure
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="py-12 text-center">Loading...</div>

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name *"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <Input
          label="Address *"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          required
        />
        <LocationPicker
          value={form.mapLocation}
          onChange={val => setForm(f => ({ ...f, mapLocation: val }))}
        />
        <Button type="submit" isLoading={isSaving} className="w-full">Save Changes</Button>
      </form>
    </div>
  )
}
