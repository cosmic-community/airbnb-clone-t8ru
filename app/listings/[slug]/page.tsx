// app/listings/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getListingBySlug, getReviewsByListing } from '@/lib/cosmic'
import { getMetafieldValue, getMetafieldBoolean } from '@/types'
import PhotoGallery from '@/components/PhotoGallery'
import AmenityIcon from '@/components/AmenityIcon'
import ReviewCard from '@/components/ReviewCard'
import HostCard from '@/components/HostCard'
import BookingCard from '@/components/BookingCard'
import Link from 'next/link'

export default async function ListingPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    notFound()
  }

  const reviews = await getReviewsByListing(listing.id)

  const location = listing.metadata?.location ?? ''
  const description = listing.metadata?.description ?? ''
  const pricePerNight = listing.metadata?.price_per_night ?? 0
  const maxGuests = listing.metadata?.max_guests ?? 0
  const bedrooms = listing.metadata?.bedrooms ?? 0
  const beds = listing.metadata?.beds ?? 0
  const bathrooms = listing.metadata?.bathrooms ?? 0
  const amenitiesStr = listing.metadata?.amenities ?? ''
  const rating = listing.metadata?.rating ?? 0
  const reviewCount = listing.metadata?.review_count ?? 0
  const isGuestFavorite = getMetafieldBoolean(listing.metadata?.guest_favorite)
  const propertyType = getMetafieldValue(listing.metadata?.property_type)
  const host = listing.metadata?.host
  const heroImage = listing.metadata?.hero_image
  const gallery = listing.metadata?.gallery

  // Build images array for gallery
  const images: Array<{ url: string; imgix_url: string }> = []
  if (heroImage) images.push(heroImage)
  if (gallery && Array.isArray(gallery)) {
    gallery.forEach((img) => {
      if (img && img.imgix_url) images.push(img)
    })
  }

  // Parse amenities
  const amenities = amenitiesStr
    ? amenitiesStr.split(',').map((a) => a.trim()).filter(Boolean)
    : []

  // Calculate average review rating from reviews
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
    : rating

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20">
      {/* Title Section */}
      <div className="pt-6 pb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-airbnb-text">
          {listing.title}
        </h1>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery images={images} title={listing.title} />

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12 py-8 border-t border-airbnb-border mt-6">
        {/* Left Column - Details */}
        <div className="flex-1 min-w-0">
          {/* Property overview */}
          <div className="pb-6 border-b border-airbnb-border">
            <h2 className="text-xl md:text-2xl font-semibold text-airbnb-text">
              {propertyType ? `${propertyType} in ` : 'Entire home in '}{location}
            </h2>
            <p className="text-airbnb-gray mt-1">
              {maxGuests > 0 && `${maxGuests} guest${maxGuests !== 1 ? 's' : ''}`}
              {bedrooms > 0 && ` · ${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}
              {beds > 0 && ` · ${beds} bed${beds !== 1 ? 's' : ''}`}
              {bathrooms > 0 && ` · ${bathrooms} bath${bathrooms !== 1 ? 's' : ''}`}
            </p>

            {/* Guest Favorite Badge */}
            {isGuestFavorite && (
              <div className="flex items-center gap-4 mt-6 p-4 border border-airbnb-border rounded-xl">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">Guest</span>
                  <span className="text-lg font-bold">favorite</span>
                </div>
                <div className="h-12 w-px bg-airbnb-border" />
                <p className="text-sm text-airbnb-gray flex-1">
                  One of the most loved homes on the platform, according to guests
                </p>
                <div className="h-12 w-px bg-airbnb-border" />
                <div className="text-center">
                  <p className="text-xl font-bold">{avgRating.toFixed(2)}</p>
                  <div className="flex gap-0.5 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.round(avgRating) ? 'text-airbnb-text' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px bg-airbnb-border" />
                <div className="text-center">
                  <p className="text-xl font-bold">{reviewCount || reviews.length}</p>
                  <p className="text-xs text-airbnb-gray underline">Reviews</p>
                </div>
              </div>
            )}
          </div>

          {/* Host info */}
          {host && (
            <div className="py-6 border-b border-airbnb-border">
              <HostCard host={host} />
            </div>
          )}

          {/* Description */}
          <div className="py-6 border-b border-airbnb-border">
            <div className="text-airbnb-text leading-relaxed whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="py-6 border-b border-airbnb-border">
              <h2 className="text-xl font-semibold text-airbnb-text mb-4">
                What this place offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.slice(0, 10).map((amenity, index) => (
                  <AmenityIcon key={index} name={amenity} />
                ))}
              </div>
              {amenities.length > 10 && (
                <button className="mt-6 px-6 py-3 border border-airbnb-text rounded-lg font-semibold text-airbnb-text hover:bg-gray-50 transition">
                  Show all {amenities.length} amenities
                </button>
              )}
            </div>
          )}

          {/* Reviews */}
          <div className="py-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-airbnb-text" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-xl font-semibold text-airbnb-text">
                {avgRating > 0 ? avgRating.toFixed(1) : 'New'} · {reviewCount || reviews.length} review{(reviewCount || reviews.length) !== 1 ? 's' : ''}
              </h2>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-airbnb-gray">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-24">
            <BookingCard
              pricePerNight={pricePerNight}
              rating={avgRating}
              reviewCount={reviewCount || reviews.length}
            />
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-airbnb-text font-semibold underline hover:text-airbnb-dark transition"
        >
          ← Back to all listings
        </Link>
      </div>
    </div>
  )
}