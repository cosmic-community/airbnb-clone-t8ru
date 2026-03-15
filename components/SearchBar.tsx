'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [destination, setDestination] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just navigate home since we use category filtering
    router.push('/')
  }

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <div className="flex items-center w-full max-w-2xl border border-airbnb-border rounded-full shadow-sm hover:shadow-md transition-shadow">
        {/* Where */}
        <div className="flex-1 pl-6 pr-4 py-3 cursor-pointer">
          <label className="block text-xs font-semibold text-airbnb-text">Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full text-sm text-airbnb-gray placeholder-airbnb-gray bg-transparent outline-none"
          />
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-airbnb-border" />

        {/* When */}
        <div className="px-4 py-3 cursor-pointer">
          <label className="block text-xs font-semibold text-airbnb-text">When</label>
          <span className="text-sm text-airbnb-gray">Add dates</span>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-airbnb-border" />

        {/* Who */}
        <div className="flex items-center gap-3 pl-4 pr-2 py-3">
          <div className="cursor-pointer">
            <label className="block text-xs font-semibold text-airbnb-text">Who</label>
            <span className="text-sm text-airbnb-gray">Add guests</span>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-12 h-12 bg-airbnb rounded-full flex items-center justify-center hover:bg-airbnb-dark transition shrink-0"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}