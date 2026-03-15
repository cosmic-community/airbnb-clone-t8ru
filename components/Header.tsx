import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-airbnb-border">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <svg
              className="w-8 h-8 text-airbnb"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.29.001.08v.153a5.571 5.571 0 01-5.496 5.597l-.209.001c-2.42 0-4.164-1.225-5.768-3.494l-.298-.428-.156-.229-.172-.252-.112.161c-1.544 2.192-3.2 3.589-5.322 4.133l-.341.074-.277.046-.253.03-.224.018-.189.008-.155.002h-.053a5.57 5.57 0 01-5.497-5.597v-.257l.007-.216c.044-.942.282-1.835.953-3.446l.145-.353c.986-2.296 5.146-11.005 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.837c-.576 1.389-.724 2.02-.752 2.701l-.004.181v.162a3.571 3.571 0 003.468 3.569l.182.003c1.7 0 2.987-.843 4.348-2.789l.278-.404.254-.376.168-.254.239-.378.138.209.229.346c1.395 2.05 2.728 3.088 4.358 3.388l.263.04.216.022.2.01h.053a3.571 3.571 0 003.57-3.497l.001-.093v-.208l-.004-.166c-.028-.667-.177-1.296-.747-2.674l-.349-.85c-.972-2.263-5.107-10.918-7.033-14.694l-.523-1.008C18.053 3.539 17.239 3 16 3z" />
            </svg>
            <span className="text-airbnb text-xl font-bold hidden md:block">staybnb</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-airbnb-text pb-1 border-b-2 border-airbnb-text transition hover:text-airbnb"
            >
              Homes
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>

            <div className="flex items-center gap-3 pl-3 pr-1 py-1 border border-airbnb-border rounded-full hover:shadow-md cursor-pointer transition">
              <svg className="w-4 h-4 text-airbnb-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <div className="w-8 h-8 bg-airbnb-gray rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}