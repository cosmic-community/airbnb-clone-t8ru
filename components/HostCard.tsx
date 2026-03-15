import Link from 'next/link'
import type { Host } from '@/types'
import { getMetafieldBoolean } from '@/types'

interface HostCardProps {
  host: Host
}

export default function HostCard({ host }: HostCardProps) {
  const hostName = host.metadata?.name || host.title
  const profilePhoto = host.metadata?.profile_photo
  const isSuperhost = getMetafieldBoolean(host.metadata?.superhost)
  const yearsHosting = Number(host.metadata?.years_hosting) || 0 // Changed: Coerce to number

  return (
    <Link href={`/hosts/${host.slug}`} className="flex items-center gap-4 group">
      {/* Photo */}
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
        {profilePhoto ? (
          <img
            src={`${profilePhoto.imgix_url}?w=112&h=112&fit=crop&auto=format,compress`}
            alt={hostName}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white bg-airbnb-text">
            {hostName.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="font-semibold text-airbnb-text group-hover:underline">
          Hosted by {hostName}
        </p>
        <div className="flex items-center gap-2 text-sm text-airbnb-gray mt-0.5">
          {isSuperhost && (
            <>
              <span className="font-medium">Superhost</span>
              <span>·</span>
            </>
          )}
          {yearsHosting > 0 && (
            <span>{yearsHosting} year{yearsHosting !== 1 ? 's' : ''} hosting</span>
          )}
        </div>
      </div>
    </Link>
  )
}