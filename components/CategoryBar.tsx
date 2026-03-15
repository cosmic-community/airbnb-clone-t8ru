'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Category } from '@/types'

// Default category icons (emoji-based)
const categoryIcons: Record<string, string> = {
  'beachfront': '🏖️',
  'mountain': '🏔️',
  'cabin': '🏡',
  'apartment': '🏢',
  'villa': '🏛️',
  'house': '🏠',
  'condo': '🏙️',
  'cottage': '🛖',
  'loft': '🏗️',
  'studio': '🎨',
  'resort': '🌴',
  'treehouse': '🌳',
  'castle': '🏰',
  'farm': '🌾',
  'boat': '🚢',
  'rv': '🚐',
  'tent': '⛺',
  'igloo': '🧊',
  'yurt': '🎪',
  'tiny-home': '🏘️',
  'luxury': '💎',
  'pool': '🏊',
  'lake': '🌊',
  'desert': '🏜️',
  'island': '🏝️',
  'city': '🌆',
  'countryside': '🌿',
  'ski': '⛷️',
  'tropical': '🌺',
  'historic': '🏛️',
  'unique': '✨',
  'entire-home': '🏠',
  'shared-room': '🛏️',
  'private-room': '🚪'
}

function getCategoryIcon(category: Category): string {
  const icon = category.metadata?.icon
  if (icon) return icon

  const slug = category.slug.toLowerCase()
  const name = (category.metadata?.name || category.title).toLowerCase()

  for (const [key, emoji] of Object.entries(categoryIcons)) {
    if (slug.includes(key) || name.includes(key)) {
      return emoji
    }
  }

  return '🏠'
}

interface CategoryBarProps {
  categories: Category[]
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  const [activeIndex, setActiveIndex] = useState(-1)

  if (categories.length === 0) return null

  return (
    <div className="flex items-center gap-8 py-3 overflow-x-auto scrollbar-hide">
      {categories.map((category, index) => {
        const icon = getCategoryIcon(category)
        const name = category.metadata?.name || category.title
        const isActive = activeIndex === index

        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-1.5 min-w-[56px] pb-2 border-b-2 transition-all duration-150 cursor-pointer group ${
              isActive
                ? 'border-airbnb-text opacity-100'
                : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className={`text-xs whitespace-nowrap ${
              isActive ? 'font-semibold text-airbnb-text' : 'text-airbnb-gray group-hover:text-airbnb-text'
            }`}>
              {name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}