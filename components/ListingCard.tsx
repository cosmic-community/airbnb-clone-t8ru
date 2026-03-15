import Link from 'next/link'
import type { Listing } from '@/types'
import { getMetafieldBoolean } from '@/types'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const heroImage = listing.metadata?.hero_image
  const location = listing.metadata?.location ?? ''
  const pricePerNight = listing.metadata?.price_per_night ?? 0
  const rating = listing.metadata?.rating ?? 0
  const isGuestFavorite = getMetafieldBoolean(listing.metadata?.guest_favorite)

  return (
    <Link href={`/listings/${listing.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
        {heroImage ? (
          <img
            src={`${heroImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={listing.title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        )}

        {/* Guest Favorite Badge */}
        {isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full text-xs font-semibold text-airbnb-text shadow-sm">
            Guest favorite
          </div>
        )}

        {/* Heart/Save Button */}
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center">
          <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-airbnb-text line-clamp-2 leading-tight">
            {listing.title}
          </h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <svg className="w-3.5 h-3.5 text-airbnb-text" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-airbnb-text">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {location && (
          <p className="text-sm text-airbnb-gray mt-0.5 truncate">{location}</p>
        )}

        {pricePerNight > 0 && (
          <p className="text-sm mt-1">
            <span className="font-semibold text-airbnb-text">${pricePerNight}</span>
            <span className="text-airbnb-gray"> night</span>
          </p>
        )}
      </div>
    </Link>
  )
}