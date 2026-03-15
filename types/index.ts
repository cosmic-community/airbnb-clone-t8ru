// Cosmic file metafield type
export interface CosmicFile {
  url: string
  imgix_url: string
}

// Helper to safely extract string value from select-dropdown, radio-buttons, or check-boxes metafields
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Helper to safely extract boolean value from switch metafields
export function getMetafieldBoolean(field: unknown): boolean {
  if (typeof field === 'boolean') return field
  if (typeof field === 'string') return field.toLowerCase() === 'true'
  if (typeof field === 'number') return field !== 0
  if (typeof field === 'object' && field !== null && 'value' in field) {
    const val = (field as { value: unknown }).value
    if (typeof val === 'boolean') return val
    if (typeof val === 'string') return val.toLowerCase() === 'true'
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    const key = (field as { key: unknown }).key
    if (typeof key === 'string') return key.toLowerCase() === 'true'
  }
  return false
}

// Host metadata
export interface HostMetadata {
  name: string
  bio?: string
  profile_photo?: CosmicFile
  superhost?: boolean | string | { key: string; value: string }
  years_hosting?: number | string
  response_rate?: string
  response_time?: string
  school?: string
  work?: string
}

// Host object
export interface Host {
  id: string
  slug: string
  title: string
  metadata?: HostMetadata
  content?: string
}

// Category metadata
export interface CategoryMetadata {
  name: string
  icon?: string
  description?: string
}

// Category object
export interface Category {
  id: string
  slug: string
  title: string
  metadata?: CategoryMetadata
}

// Listing metadata
export interface ListingMetadata {
  description?: string
  location?: string
  price_per_night?: number | string
  property_type?: string | { key: string; value: string }
  max_guests?: number | string
  bedrooms?: number | string
  beds?: number | string
  bathrooms?: number | string
  amenities?: string
  hero_image?: CosmicFile
  gallery?: CosmicFile[]
  rating?: number | string
  review_count?: number | string
  guest_favorite?: boolean | string | { key: string; value: string }
  host?: Host
  category?: Category
}

// Listing object
export interface Listing {
  id: string
  slug: string
  title: string
  metadata?: ListingMetadata
  content?: string
}

// Review metadata
export interface ReviewMetadata {
  reviewer_name?: string
  rating?: number | string
  review_date?: string
  review_text?: string
  listing?: Listing
}

// Review object
export interface Review {
  id: string
  slug: string
  title: string
  metadata?: ReviewMetadata
}