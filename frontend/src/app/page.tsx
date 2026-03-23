import Link from 'next/link'
import { AnimatedOnScroll } from '@/components/shared/AnimatedOnScroll'
import { BannerCta, HeroCta, OwnerSectionCta, BottomCta } from '@/components/shared/auth-aware-cta'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Introduction Banner */}
      <section className="bg-white border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">HMSS</span>
              {' '}— Hotel Management &amp; Search System
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              HMSS is Vietnam&apos;s platform for finding and managing hostel and hotel rooms. We connect tenants with verified property owners, making it fast and transparent to find the right place to stay — whether you&apos;re a student, a professional, or just passing through.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2.5">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
            >
              Find a Room
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <BannerCta />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center grain-overlay">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-teal-900" />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 text-xs font-medium text-teal-300 tracking-wide uppercase mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                Now Available in Vietnam
              </span>
            </div>

            <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Find Your
              <span className="block mt-1 bg-gradient-to-r from-teal-300 to-amber-300 bg-clip-text text-transparent">
                Perfect Room
              </span>
            </h1>

            <p className="animate-fade-up delay-200 mt-6 text-lg text-stone-300 leading-relaxed max-w-lg">
              Discover comfortable hostel and hotel rooms across Vietnam. Compare prices, check amenities, and book your ideal stay — all in one place.
            </p>

            <HeroCta />

            {/* Quick stats */}
            <div className="animate-fade-up delay-400 mt-14 flex gap-10">
              <StatItem value="100+" label="Listings" />
              <StatItem value="50+" label="Locations" />
              <StatItem value="24/7" label="Support" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <AnimatedOnScroll className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Why HMSS</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
              Everything you need to find the right room
            </h2>
            <p className="mt-3 text-stone-500">
              Whether you&apos;re a student looking for affordable housing or a professional seeking comfort, we&apos;ve got you covered.
            </p>
          </AnimatedOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatedOnScroll delay={0}><FeatureCard icon={<SearchIcon />} title="Smart Search" description="Filter by location, price range, amenities, and furnishing status to find exactly what you need." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={80}><FeatureCard icon={<ShieldIcon />} title="Verified Listings" description="Every property goes through our verification process to ensure accuracy and safety." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={160}><FeatureCard icon={<BoltIcon />} title="Instant Requests" description="Send rental requests directly to property owners and get responses quickly." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={240}><FeatureCard icon={<MapIcon />} title="Location Maps" description="See exact property locations on the map and explore nearby amenities and transport." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={320}><FeatureCard icon={<CameraIcon />} title="Photo Galleries" description="Browse high-quality photos of every room and property before making a decision." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={400}><FeatureCard icon={<WalletIcon />} title="Transparent Pricing" description="No hidden fees. Compare prices across listings with clear monthly rates in VNĐ." /></AnimatedOnScroll>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5">
          <AnimatedOnScroll className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
              Find your room in 3 simple steps
            </h2>
          </AnimatedOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedOnScroll delay={0}><StepCard step="01" title="Search & Compare" description="Browse available rooms by location, price, and amenities. Compare options side by side." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={120}><StepCard step="02" title="Send Request" description="Found the right room? Send a rental request with your preferred move-in date and details." /></AnimatedOnScroll>
            <AnimatedOnScroll delay={240}><StepCard step="03" title="Move In" description="Once the owner accepts your request, finalize the arrangement and move into your new home." /></AnimatedOnScroll>
          </div>
        </div>
      </section>

      {/* Info / For Owners Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: text content */}
            <AnimatedOnScroll>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">For Property Owners</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
                Manage your properties with ease
              </h2>
              <p className="mt-4 text-stone-500 leading-relaxed">
                HMSS gives property owners a comprehensive dashboard to manage listings, handle tenant requests, and keep track of arrangements — all from one place.
              </p>

              <ul className="mt-8 space-y-4">
                <InfoItem text="Create and manage multiple properties and room listings" />
                <InfoItem text="Get verified to build trust with potential tenants" />
                <InfoItem text="Control listing visibility — publish, hide, or archive anytime" />
                <InfoItem text="Review and respond to rental requests in real-time" />
              </ul>

              <OwnerSectionCta />
            </AnimatedOnScroll>

            {/* Right: visual card */}
            <AnimatedOnScroll delay={150} className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-teal-50 border border-stone-200 p-8 shadow-sm">
                <div className="space-y-4">
                  <DashboardPreviewRow icon="🏠" label="Properties" value="12 active" accent="teal" />
                  <DashboardPreviewRow icon="📋" label="Listings" value="28 published" accent="amber" />
                  <DashboardPreviewRow icon="📨" label="Pending Requests" value="5 new" accent="rose" />
                  <DashboardPreviewRow icon="✅" label="Arrangements" value="23 active" accent="emerald" />
                </div>
              </div>
              {/* Decorative floating element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-100 rounded-2xl -z-10 rotate-6" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-100 rounded-2xl -z-10 -rotate-3" />
            </AnimatedOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 grain-overlay overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-stone-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <AnimatedOnScroll className="relative mx-auto max-w-7xl px-5 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-lg text-teal-100 max-w-md mx-auto">
            Join HMSS today and discover hundreds of rooms across Vietnam.
          </p>
          <BottomCta />
        </AnimatedOnScroll>
      </section>
    </div>
  )
}

/* --- Sub-components --- */

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-stone-400 mt-0.5">{label}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group rounded-2xl border border-stone-100 bg-white p-6 hover:border-teal-200 hover:shadow-md transition-all duration-300">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-100 transition-colors">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm text-stone-500 leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="relative text-center">
      <span className="text-5xl font-bold text-stone-100">{step}</span>
      <h3 className="mt-2 text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">{description}</p>
    </div>
  )
}

function InfoItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm text-stone-600">{text}</span>
    </li>
  )
}

function DashboardPreviewRow({ icon, label, value, accent }: { icon: string; label: string; value: string; accent: string }) {
  const accentColors: Record<string, string> = {
    teal: 'bg-teal-100 text-teal-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
    emerald: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <div className="flex items-center justify-between rounded-xl bg-white border border-stone-100 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium text-stone-700">{label}</span>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentColors[accent] ?? 'bg-stone-100 text-stone-700'}`}>
        {value}
      </span>
    </div>
  )
}

/* --- Icons --- */

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  )
}
