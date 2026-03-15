import { createBucketClient } from '@cosmicjs/sdk'
import type { Listing, Host, Category, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all listings
export async function getListings(): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings')
  }
}

// Fetch a single listing by slug
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'listings', slug })
      .props(['id', 'slug', 'title', 'metadata', 'content'])
      .depth(2)
    return response.object as Listing
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch listing')
  }
}

// Fetch listings by category
export async function getListingsByCategory(categoryId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings by category')
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(0)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(0)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch all hosts
export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(0)
    return response.objects as Host[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hosts')
  }
}

// Fetch a single host by slug
export async function getHostBySlug(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(['id', 'slug', 'title', 'metadata', 'content'])
      .depth(0)
    return response.object as Host
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch host')
  }
}

// Fetch listings by host
export async function getListingsByHost(hostId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.host': hostId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings by host')
  }
}

// Fetch reviews for a listing
export async function getReviewsByListing(listingId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.listing': listingId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

// Fetch all reviews
export async function getAllReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}