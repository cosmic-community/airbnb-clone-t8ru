import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name ?? 'Anonymous'
  const rating = Number(review.metadata?.rating) || 5 // Changed: Coerce to number
  const reviewDate = review.metadata?.review_date ?? ''
  const reviewText = review.metadata?.review_text ?? ''

  // Format date
  let formattedDate = ''
  if (reviewDate) {
    try {
      const date = new Date(reviewDate)
      formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    } catch {
      formattedDate = reviewDate
    }
  }

  return (
    <div className="space-y-3">
      {/* Reviewer Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-airbnb-text rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {reviewerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm text-airbnb-text">{reviewerName}</p>
          {formattedDate && (
            <p className="text-xs text-airbnb-gray">{formattedDate}</p>
          )}
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? 'text-airbnb-text' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-sm text-airbnb-text leading-relaxed line-clamp-3">
          {reviewText}
        </p>
      )}
    </div>
  )
}