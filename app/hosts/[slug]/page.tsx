// app/hosts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getHostBySlug, getListingsByHost, getAllReviews } from '@/lib/cosmic'
import { getMetafieldBoolean } from '@/types'
import ListingCard from '@/components/ListingCard'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'

export default async function HostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const host = await getHostBySlug(slug)

  if (!host) {
    notFound()
  }

  const listings = await getListingsByHost(host.id)
  const allReviews = await getAllReviews()

  // Filter reviews for this host's listings
  const hostListingIds = new Set(listings.map((l) => l.id))
  const hostReviews = allReviews.filter((r) => {
    const reviewListing = r.metadata?.listing
    if (!reviewListing) return false
    return hostListingIds.has(reviewListing.id)
  })

  const hostName = host.metadata?.name || host.title
  const bio = host.metadata?.bio || ''
  const profilePhoto = host.metadata?.profile_photo
  const isSuperhost = getMetafieldBoolean(host.metadata?.superhost)
  const yearsHosting = host.metadata?.years_hosting ?? 0
  const responseRate = host.metadata?.response_rate ?? ''
  const responseTime = host.metadata?.response_time ?? ''
  const school = host.metadata?.school ?? ''
  const work = host.metadata?.work ?? ''

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-airbnb-gray mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-airbnb-text">{hostName}</span>
      </nav>

      {/* Host Profile */}
      <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-airbnb-border">
        {/* Photo & Name */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {profilePhoto ? (
              <img
                src={`${profilePhoto.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={hostName}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-airbnb-text">
                {hostName.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-airbnb-text mt-4">{hostName}</h1>
          {isSuperhost && (
            <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-airbnb-text">
              <svg className="w-4 h-4 text-airbnb" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Superhost
            </span>
          )}
        </div>

        {/* Stats & Info */}
        <div className="flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-airbnb-text">{allReviews.length}</p>
              <p className="text-sm text-airbnb-gray">Reviews</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-airbnb-text">{yearsHosting}</p>
              <p className="text-sm text-airbnb-gray">Years hosting</p>
            </div>
            {responseRate && (
              <div className="p-4 bg-gray-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-airbnb-text">{responseRate}</p>
                <p className="text-sm text-airbnb-gray">Response rate</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-airbnb-text">
            {school && (
              <p>🎓 Where I went to school: <strong>{school}</strong></p>
            )}
            {work && (
              <p>💼 My work: <strong>{work}</strong></p>
            )}
            {responseTime && (
              <p>⏱ Responds {responseTime}</p>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <div className="mt-4">
              <p className="text-airbnb-text leading-relaxed whitespace-pre-line">{bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Host's Listings */}
      {listings.length > 0 && (
        <div className="py-8 border-b border-airbnb-border">
          <h2 className="text-xl font-semibold text-airbnb-text mb-6">
            {hostName}&apos;s listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews for this Host */}
      {hostReviews.length > 0 && (
        <div className="py-8">
          <h2 className="text-xl font-semibold text-airbnb-text mb-6">
            Reviews for {hostName}&apos;s places
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hostReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

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