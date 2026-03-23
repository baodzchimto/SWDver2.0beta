'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LocationPicker } from '@/components/shared/location-picker'
import { propertiesApi } from '@/lib/api/properties'

export default function NewPropertyPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    address: '',
    mapLocation: '',
    description: '',
    generalPolicies: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await propertiesApi.createProperty(form)
      router.push('/owner/property')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Create Property</h1>
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
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
          <textarea
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            rows={3}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">General Policies</label>
          <textarea
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            rows={3}
            value={form.generalPolicies}
            onChange={e => setForm(f => ({ ...f, generalPolicies: e.target.value }))}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" isLoading={isLoading} className="w-full">Create Property</Button>
      </form>
    </div>
  )
}
