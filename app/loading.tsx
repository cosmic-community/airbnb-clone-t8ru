export default function Loading() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-6">
      {/* Search bar skeleton */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-2xl h-16 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {/* Category bar skeleton */}
      <div className="flex gap-8 mb-8 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[56px]">
            <div className="w-6 h-6 bg-gray-100 rounded animate-pulse" />
            <div className="w-14 h-3 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-1/3 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}