'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { scaleIn, fadeIn } from '@/lib/animations'

/**
 * Hero Section - Award-Winning Design (Phase 1)
 * Based on Expert Design Critique
 * 
 * Improvements:
 * - Massive typography (72px → 96px+ headline)
 * - Radial overlay (40-60% instead of 80%)
 * - Text glows for depth
 * - Evocative CTA copy
 */
export default function HeroSection() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleScrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <section
            id="hero"
            className="relative h-screen w-full overflow-hidden flex items-center justify-center"
            aria-label="Hero section"
        >
            {/* Animated Background - More visible now! */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero-bg.gif"
                    alt="EKATVA Hyderabad 2025 - Students celebrating"
                    fill
                    priority
                    className="object-cover"
                    style={{ opacity: 0.7 }} // Increased from 0.6
                    unoptimized
                />

                {/* RADIAL Gradient Overlay - Spotlight Effect (40-60%, not 80%) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(
                            ellipse 80% 80% at center,
                            rgba(31, 79, 89, 0.35) 0%,
                            rgba(14, 47, 54, 0.5) 50%,
                            rgba(5, 5, 5, 0.75) 100%
                        )`
                    }}
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Pre-headline Badge */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="inline-block mb-8 px-5 py-2.5 rounded-full border border-unity-gold/40 bg-unity-gold/15 backdrop-blur-md"
                >
                    <span className="text-xs md:text-sm text-unity-gold tracking-[0.25em] uppercase font-semibold">
                        The Legend Begins
                    </span>
                </motion.div>

                {/* MASSIVE Headline - Instrument Serif with Glows */}
                <motion.h1
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[1.1] mb-8"
                >
                    <span className="block">From Online</span>
                    <span
                        className="block text-unity-gold italic"
                        style={{
                            textShadow: '0 0 60px rgba(255, 207, 150, 0.5), 0 0 120px rgba(255, 207, 150, 0.3)'
                        }}
                    >
                        to Oneness.
                    </span>
                </motion.h1>

                {/* Subtitle - Larger, more breathing room */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    className="text-white/90 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                >
                    The aftermovie is coming. Until then, explore the journey behind{' '}
                    <br className="hidden md:block" />
                    IITM BS&apos;s first-ever regional fest.
                </motion.p>

                {/* CTA Buttons - More impactful */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    {/* Primary CTA - Pulsing glow */}
                    <a
                        href="#origin-story"
                        className="group relative px-10 py-5 bg-ekatva-teal rounded-full overflow-hidden transition-all hover:scale-105"
                        style={{
                            boxShadow: '0 0 30px rgba(92, 230, 201, 0.4)'
                        }}
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full" />
                        <span className="relative text-oneness-black font-bold tracking-widest uppercase text-sm md:text-base">
                            Read The Story
                        </span>
                    </a>

                    {/* Secondary CTA */}
                    <a
                        href="#moments"
                        className="px-10 py-5 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all text-sm md:text-base font-bold tracking-widest uppercase"
                    >
                        View Gallery
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator - Subtle, doesn't compete with CTAs */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.5 }}
                onClick={handleScrollToNext}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full border border-white/10 hover:border-ekatva-teal/30 hover:opacity-100 transition-all duration-300 focus:outline-none"
                aria-label="Scroll to explore"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-5 h-5 text-white/60" />
                </motion.div>
            </motion.button>
        </section>
    )
}
