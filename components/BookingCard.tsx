'use client'

import { useState } from 'react'

interface BookingCardProps {
  pricePerNight: number
  rating: number
  reviewCount: number
}

export default function BookingCard({ pricePerNight, rating, reviewCount }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  // Calculate nights
  let nights = 2 // default display
  if (checkIn && checkOut) {
    const diffMs = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    nights = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  }

  const subtotal = pricePerNight * nights
  const serviceFee = Math.round(subtotal * 0.14)
  const total = subtotal + serviceFee

  return (
    <div className="border border-airbnb-border rounded-xl p-6 shadow-lg">
      {/* Price Header */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-semibold text-airbnb-text">
            ${pricePerNight}
          </span>
          <span className="text-airbnb-gray"> night</span>
        </div>
        {rating > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-3.5 h-3.5 text-airbnb-text" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-airbnb-gray">· {reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Date & Guest Selection */}
      <div className="border border-airbnb-border rounded-xl overflow-hidden mb-4">
        <div className="grid grid-cols-2">
          <div className="p-3 border-r border-airbnb-border">
            <label className="block text-[10px] font-bold text-airbnb-text uppercase tracking-wider">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-airbnb-text bg-transparent outline-none mt-1"
              placeholder="Add date"
            />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-bold text-airbnb-text uppercase tracking-wider">
              Checkout
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm text-airbnb-text bg-transparent outline-none mt-1"
              placeholder="Add date"
            />
          </div>
        </div>
        <div className="p-3 border-t border-airbnb-border">
          <label className="block text-[10px] font-bold text-airbnb-text uppercase tracking-wider">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full text-sm text-airbnb-text bg-transparent outline-none mt-1"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reserve Button */}
      <button className="w-full bg-airbnb text-white py-3 rounded-lg font-semibold text-base hover:bg-airbnb-dark transition">
        Reserve
      </button>

      <p className="text-center text-sm text-airbnb-gray mt-3">
        You won&apos;t be charged yet
      </p>

      {/* Price Breakdown */}
      {pricePerNight > 0 && (
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="underline text-airbnb-text">
              ${pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span className="text-airbnb-text">${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline text-airbnb-text">Service fee</span>
            <span className="text-airbnb-text">${serviceFee}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-airbnb-border font-semibold">
            <span className="text-airbnb-text">Total</span>
            <span className="text-airbnb-text">${total}</span>
          </div>
        </div>
      )}
    </div>
  )
}