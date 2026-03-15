import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-airbnb-border">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold text-airbnb-text mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-airbnb-gray">
              <li><span className="hover:underline cursor-pointer">Help Center</span></li>
              <li><span className="hover:underline cursor-pointer">Safety information</span></li>
              <li><span className="hover:underline cursor-pointer">Cancellation options</span></li>
              <li><span className="hover:underline cursor-pointer">Disability support</span></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold text-airbnb-text mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm text-airbnb-gray">
              <li><span className="hover:underline cursor-pointer">List your home</span></li>
              <li><span className="hover:underline cursor-pointer">Hosting resources</span></li>
              <li><span className="hover:underline cursor-pointer">Community forum</span></li>
              <li><span className="hover:underline cursor-pointer">Hosting responsibly</span></li>
            </ul>
          </div>

          {/* StayBnB */}
          <div>
            <h3 className="font-semibold text-airbnb-text mb-4">StayBnB</h3>
            <ul className="space-y-3 text-sm text-airbnb-gray">
              <li><span className="hover:underline cursor-pointer">Newsroom</span></li>
              <li><span className="hover:underline cursor-pointer">Careers</span></li>
              <li><span className="hover:underline cursor-pointer">Gift cards</span></li>
              <li>
                <Link href="/" className="hover:underline">Browse listings</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-airbnb-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-airbnb-gray">
            © {new Date().getFullYear()} StayBnB. Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-airbnb-text"
            >
              Cosmic
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm text-airbnb-gray">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  )
}