import { HeroSection, OriginStorySection, IdentityRevealSection, RippleSection, BuildWithUsSection } from '@/components/sections'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-oneness-black overflow-x-hidden selection:bg-ekatva-teal selection:text-oneness-black">
      {/* Section 1: Hero Arrival - Visceral First */}
      <HeroSection />

      {/* Section 2: Origin Story - The Why */}
      <OriginStorySection />

      {/* Section 3: Identity Reveal - What is EKATVA */}
      <IdentityRevealSection />

      {/* Section 4: The Ripple - Movement Expansion */}
      <RippleSection />

      {/* Section 5: Build With Us - Conversion */}
      <BuildWithUsSection />
    </main>
  )
}

