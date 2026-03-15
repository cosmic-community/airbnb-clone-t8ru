// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

// Host type
export interface Host extends CosmicObject {
  type: 'hosts'
  metadata: {
    name?: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    superhost?: boolean | { key: string; value: string }
    years_hosting?: number
    response_rate?: string
    response_time?: string
    school?: string
    work?: string
  }
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    icon?: string
    description?: string
  }
}

// Listing type
export interface Listing extends CosmicObject {
  type: 'listings'
  metadata: {
    description?: string
    location?: string
    price_per_night?: number
    property_type?: string | { key: string; value: string }
    max_guests?: number
    bedrooms?: number
    beds?: number
    bathrooms?: number
    amenities?: string
    hero_image?: {
      url: string
      imgix_url: string
    }
    gallery?: Array<{
      url: string
      imgix_url: string
    }>
    rating?: number
    review_count?: number
    guest_favorite?: boolean | { key: string; value: string }
    host?: Host
    category?: Category
  }
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    reviewer_name?: string
    rating?: number
    review_date?: string
    review_text?: string
    listing?: Listing
  }
}

// Helper to safely extract metafield values (select-dropdown, radio-buttons, etc.)
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

// Helper to check boolean metafields
export function getMetafieldBoolean(field: unknown): boolean {
  if (typeof field === 'boolean') return field
  if (typeof field === 'string') return field.toLowerCase() === 'true'
  if (typeof field === 'object' && field !== null && 'value' in field) {
    const val = String((field as { value: unknown }).value).toLowerCase()
    return val === 'true' || val === 'yes'
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    const key = String((field as { key: unknown }).key).toLowerCase()
    return key === 'true' || key === 'yes'
  }
  return false
}