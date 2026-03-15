interface AmenityIconProps {
  name: string
}

const amenityIcons: Record<string, string> = {
  'wifi': '📶',
  'kitchen': '🍳',
  'parking': '🅿️',
  'pool': '🏊',
  'hot tub': '♨️',
  'washer': '🧺',
  'dryer': '👕',
  'air conditioning': '❄️',
  'heating': '🔥',
  'tv': '📺',
  'iron': '👔',
  'hair dryer': '💇',
  'smoke alarm': '🚨',
  'carbon monoxide': '⚠️',
  'fire extinguisher': '🧯',
  'first aid': '🩹',
  'gym': '💪',
  'elevator': '🛗',
  'beach': '🏖️',
  'ocean view': '🌊',
  'sea view': '🌊',
  'bay view': '🌅',
  'mountain view': '🏔️',
  'garden': '🌿',
  'patio': '🪑',
  'balcony': '🏠',
  'bbq': '🍖',
  'grill': '🍖',
  'pets': '🐾',
  'breakfast': '🥐',
  'coffee': '☕',
  'workspace': '💻',
  'self check-in': '🔑',
  'lock': '🔐',
  'security': '🛡️',
  'luggage': '🧳',
  'beach access': '🏖️',
  'fast wifi': '⚡',
  'smart tv': '📺',
  'garage': '🏗️',
  'towels': '🛁',
  'chairs': '🪑',
  'boogie boards': '🏄',
  'sleeper couch': '🛋️',
  'sofa': '🛋️'
}

function getAmenityIcon(name: string): string {
  const lower = name.toLowerCase()
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (lower.includes(key)) return icon
  }
  return '✓'
}

export default function AmenityIcon({ name }: AmenityIconProps) {
  const icon = getAmenityIcon(name)

  return (
    <div className="flex items-center gap-4 py-2">
      <span className="text-xl w-8 text-center shrink-0">{icon}</span>
      <span className="text-airbnb-text">{name}</span>
    </div>
  )
}