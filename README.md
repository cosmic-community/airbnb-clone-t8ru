# StayBnB – Vacation Rental Marketplace

![App Preview](https://imgix.cosmicjs.com/8868a730-2092-11f1-bc0c-3944cd212116-autopilot-photo-1480796927426-f609979314bd-1773594914907.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful Airbnb-inspired vacation rental marketplace built with **Next.js 16** and **[Cosmic](https://www.cosmicjs.com)** CMS. Browse listings, explore categories, read reviews, and discover amazing hosts — all dynamically powered by your Cosmic content.

## Features

- 🏠 **Listing Cards** — Beautiful card grid with images, pricing, ratings, and Guest Favorite badges
- 📸 **Photo Gallery** — Airbnb-style 5-image grid on listing detail pages
- 🔍 **Search & Filter** — Search destinations and filter by category
- 👤 **Host Profiles** — Superhost badges, bio, stats, and response info
- ⭐ **Guest Reviews** — Star ratings with detailed review breakdowns
- 🏷️ **Category Browsing** — Horizontal scrollable category icon bar
- 📱 **Fully Responsive** — Mobile-first design matching Airbnb's layout
- ⚡ **Server Components** — Fast rendering with Next.js 16 App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69b6e896d724d895912ac0a7&clone_repository=69b6ea6fd724d895912ac0d5)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online marketplace with product listings, seller profiles, categories, and customer reviews. User instructions: Airbnb clone. IMPORTANT: The user provided reference URLs (https://www.airbnb.com, https://www.airbnb.com/rooms/740139015404308357?check_in=2026-09-11&check_out=2026-09-13&photo_id=1519250196&source_impression_id=p3_1773592999_P3_HTFAGngaKBvuk&previous_page_section_name=1000). The user is rebuilding an existing website and provided these design notes: Match style and layout. Factor these preferences into the content structure."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Airbnb clone'. The content is managed in Cosmic CMS with the following object types: hosts, categories, listings, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Airbnb clone. Match style and layout."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd staybnb

# Install dependencies
bun install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Fetch all listings
const { objects: listings } = await cosmic.objects
  .find({ type: 'listings' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single listing by slug
const { object: listing } = await cosmic.objects
  .findOne({ type: 'listings', slug: 'beach-house' })
  .props(['id', 'slug', 'title', 'metadata', 'content'])
  .depth(2)
```

## Cosmic CMS Integration

This app uses 4 object types from your Cosmic bucket:

| Object Type | Description |
|-------------|-------------|
| `listings` | Property listings with images, pricing, amenities |
| `hosts` | Host profiles with bios, photos, Superhost status |
| `categories` | Property categories with icons |
| `reviews` | Guest reviews with ratings linked to listings |

## Deployment Options

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create a new site from Git in Netlify
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables in Netlify dashboard

<!-- README_END -->