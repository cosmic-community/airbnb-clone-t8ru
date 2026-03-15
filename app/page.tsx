import { getListings, getCategories } from '@/lib/cosmic'
import SearchBar from '@/components/SearchBar'
import CategoryBar from '@/components/CategoryBar'
import ListingCard from '@/components/ListingCard'

export default async function HomePage() {
  const [listings, categories] = await Promise.all([
    getListings(),
    getCategories()
  ])

  return (
    <div>
      {/* Search Hero */}
      <div className="border-b border-airbnb-border">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-4">
          <SearchBar />
        </div>
      </div>

      {/* Category Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-airbnb-border">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20">
          <CategoryBar categories={categories} />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-6">
        {listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-airbnb-gray text-lg">No listings available yet.</p>
            <p className="text-airbnb-gray mt-2">Add listings in your Cosmic dashboard to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}