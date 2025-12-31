import { HeroSection, OriginStorySection } from '@/components/sections'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-oneness-black overflow-x-hidden selection:bg-ekatva-teal selection:text-oneness-black">
      {/* Section 1: Hero Arrival - Visceral First */}
      <HeroSection />

      {/* Section 2: Origin Story - The Why */}
      <OriginStorySection />

      {/* Upcoming sections for Sprint 2:
          - Identity Reveal (Section 3)
          - Proof of Life (Section 4)
          - Expansion Vision (Section 5)
      */}
    </main>
  )
}
