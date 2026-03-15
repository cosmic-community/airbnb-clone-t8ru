// app/listings/[slug]/loading.tsx
export default function ListingLoading() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-6">
      <div className="h-8 bg-gray-100 rounded w-2/3 animate-pulse mb-6" />

      {/* Photo gallery skeleton */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px]">
        <div className="col-span-2 row-span-2 bg-gray-100 animate-pulse" />
        <div className="bg-gray-100 animate-pulse" />
        <div className="bg-gray-100 animate-pulse" />
        <div className="bg-gray-100 animate-pulse" />
        <div className="bg-gray-100 animate-pulse" />
      </div>

      <div className="flex gap-12 mt-8">
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-100 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
          <div className="h-32 bg-gray-100 rounded animate-pulse mt-6" />
        </div>
        <div className="w-[380px]">
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}