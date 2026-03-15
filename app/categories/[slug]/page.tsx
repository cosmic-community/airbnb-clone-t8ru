// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getListingsByCategory } from '@/lib/cosmic'
import ListingCard from '@/components/ListingCard'
import Link from 'next/link'

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const listings = await getListingsByCategory(category.id)

  const categoryName = category.metadata?.name || category.title
  const description = category.metadata?.description || ''

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-airbnb-gray mb-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-airbnb-text">{categoryName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-airbnb-text">{categoryName}</h1>
        {description && (
          <p className="text-airbnb-gray mt-2 text-lg">{description}</p>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-airbnb-gray text-lg">
            No listings found in this category.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-airbnb font-semibold underline hover:text-airbnb-dark"
          >
            Browse all listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}