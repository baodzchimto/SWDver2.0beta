'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { SearchForm } from './SearchForm'
import { ListingCard } from './ListingCard'
import { SearchMap } from '@/components/shared/SearchMap'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Pagination } from '@/components/ui/Pagination'
import { listingsApi } from '@/lib/api/listings'
import type { ListingSummaryDto, LocationDataDto, SearchCriteriaDto } from '@/types/listing'

/** Apply criteria as client-side filter on a listing set */
function applyFilter(listings: ListingSummaryDto[], criteria: SearchCriteriaDto): ListingSummaryDto[] {
  return listings.filter(l => {
    if (criteria.location) {
      const loc = criteria.location.toLowerCase()
      if (!l.address.toLowerCase().includes(loc) && !l.title.toLowerCase().includes(loc)) return false
    }
    if (criteria.minPrice !== undefined && l.price < criteria.minPrice) return false
    if (criteria.maxPrice !== undefined && l.price > criteria.maxPrice) return false
    if (criteria.furnishedStatus && l.furnishedStatus !== criteria.furnishedStatus) return false
    return true
  })
}

/** User-friendly message for network/API errors */
function friendlyError(message: string): string {
  if (message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('networkerror')) {
    return 'Unable to connect to the server. Please make sure the backend is running and try again.'
  }
  return message
}

const ITEMS_PER_PAGE = 12

export default function SearchPage() {
  const [allListings, setAllListings] = useState<ListingSummaryDto[]>([])
  const [locationData, setLocationData] = useState<LocationDataDto[]>([])
  const [liveCriteria, setLiveCriteria] = useState<SearchCriteriaDto>({})
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'list' | 'map'>('list') // mobile only
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    listingsApi.getSearchPage()
      .then(data => { setAllListings(data.summaries); setLocationData(data.locationData) })
      .catch(err => setError(friendlyError(err.message)))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSearch = async (criteria: SearchCriteriaDto) => {
    setIsSearching(true)
    setError(null)
    try {
      const data = await listingsApi.searchRooms(criteria)
      setAllListings(data.summaries)
      setLocationData(data.locationData)
    } catch (err: unknown) {
      setError(friendlyError(err instanceof Error ? err.message : 'Search failed'))
    } finally {
      setIsSearching(false)
    }
  }

  const filteredListings = useMemo(
    () => applyFilter(allListings, liveCriteria),
    [allListings, liveCriteria]
  )

  // Reset to page 1 whenever the filtered set changes (new search or filter applied)
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredListings.length, filteredListings])

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE)

  const paginatedListings = useMemo(
    () => filteredListings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredListings, currentPage]
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of results section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Only show pins for currently visible listings
  const filteredLocationData = useMemo(() => {
    const visibleIds = new Set(filteredListings.map(l => l.listingId))
    return locationData.filter(loc => visibleIds.has(loc.listingId))
  }, [filteredListings, locationData])

  const hasMapData = filteredLocationData.some(loc => loc.lat && loc.lng)

  // Scroll listing card into view when a map pin is clicked
  const scrollToCard = useCallback((listingId: string) => {
    const el = document.getElementById(`listing-${listingId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setHoveredListingId(listingId)
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Search Rooms</h1>
        <p className="mt-1 text-sm text-stone-500">Filter by location, price, and amenities to find your ideal room.</p>
      </div>

      {/* Search form — always visible */}
      <div className="mb-8">
        <SearchForm
          onSearch={handleSearch}
          onCriteriaChange={setLiveCriteria}
          isLoading={isSearching}
        />
      </div>

      {/* Results */}
      <div className="pb-10">
        {isLoading ? (
          <LoadingSpinner className="py-12" text="Loading rooms..." />
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
            <svg className="mx-auto mb-3 w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm font-medium text-red-700">{error}</p>
            <button
              onClick={() => { setError(null); setIsLoading(true); listingsApi.getSearchPage().then(d => { setAllListings(d.summaries); setLocationData(d.locationData) }).catch(e => setError(friendlyError(e.message))).finally(() => setIsLoading(false)) }}
              className="mt-3 text-xs text-red-600 underline hover:text-red-800 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-stone-500">No rooms found</p>
            <p className="mt-1 text-sm text-stone-400">Try adjusting your search filters</p>
          </div>
        ) : (
          <>
            {/* Result count badge */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Available Rooms</span>
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-600">
                {filteredListings.length}
              </span>
              {filteredListings.length !== allListings.length && (
                <span className="text-xs text-stone-400">of {allListings.length} total</span>
              )}
            </div>

            {/* Mobile tab toggle — only shown when map data is available */}
            {hasMapData && (
              <div className="flex gap-2 mb-4 lg:hidden">
                {(['list', 'map'] as const).map(view => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                      activeView === view
                        ? 'bg-teal-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            )}

            {/* Split layout (desktop) or full-width (no map data) */}
            <div className={hasMapData ? 'lg:grid lg:grid-cols-[3fr_2fr] lg:gap-6' : ''}>
              {/* Left panel: listing cards */}
              <div className={hasMapData && activeView === 'map' ? 'hidden lg:block' : ''}>
                <div className={`grid gap-4 grid-cols-1 ${hasMapData ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                  {paginatedListings.map(listing => (
                    <ListingCard
                      key={listing.listingId}
                      listing={listing}
                      isHighlighted={hoveredListingId === listing.listingId}
                      onMouseEnter={() => setHoveredListingId(listing.listingId)}
                      onMouseLeave={() => setHoveredListingId(null)}
                    />
                  ))}
                </div>
                {/* Pagination — only shown when there are multiple pages */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

              {/* Right panel: sticky map */}
              {hasMapData && (
                <div className={`${activeView === 'list' ? 'hidden lg:block' : ''} lg:sticky lg:top-4 lg:self-start`}>
                  <div className="h-[70vh] rounded-xl overflow-hidden shadow-sm border border-stone-200">
                    <SearchMap
                      locations={filteredLocationData}
                      listings={filteredListings}
                      hoveredListingId={hoveredListingId}
                      onPinClick={scrollToCard}
                      onPinHover={setHoveredListingId}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
