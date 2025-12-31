'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { scaleIn, fadeIn } from '@/lib/animations'

/**
 * Hero Section - Award-Winning Design (Phase 2)
 * 
 * Features (10/10 polish):
 * - Parallax scroll (background moves slower)
 * - Content fades on scroll
 * - Massive typography with text glows
 * - Radial spotlight overlay
 */
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)

    // Parallax scroll effects
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    })

    // Background moves slower (parallax)
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

    // Content fades out and moves up on scroll
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

    const handleScrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen w-full overflow-hidden flex items-center justify-center"
            aria-label="Hero section"
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                <Image
                    src="/assets/images/hero-bg.gif"
                    alt="EKATVA Hyderabad 2025 - Students celebrating"
                    fill
                    priority
                    className="object-cover scale-110"
                    style={{ opacity: 0.75 }}
                    unoptimized
                />

                {/* Radial Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(
                            ellipse 80% 80% at center,
                            rgba(31, 79, 89, 0.3) 0%,
                            rgba(14, 47, 54, 0.45) 50%,
                            rgba(5, 5, 5, 0.7) 100%
                        )`
                    }}
                />
            </motion.div>

            {/* Hero Content with scroll fade */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                style={{ opacity: contentOpacity, y: contentY }}
            >
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

                {/* MASSIVE Headline with stagger */}
                <motion.h1
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[1.1] mb-8"
                >
                    <motion.span
                        className="block"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        From Online
                    </motion.span>
                    <motion.span
                        className="block text-unity-gold italic"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            textShadow: '0 0 60px rgba(255, 207, 150, 0.5), 0 0 120px rgba(255, 207, 150, 0.3)'
                        }}
                    >
                        to Oneness.
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    className="text-white/90 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                >
                    The aftermovie is coming. Until then, explore the journey behind{' '}
                    <br className="hidden md:block" />
                    IITM BS&apos;s first-ever regional fest.
                </motion.p>

                {/* CTA Buttons with shimmer effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                    {/* Primary CTA */}
                    <a
                        href="#origin-story"
                        className="group relative px-10 py-5 bg-ekatva-teal rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(92,230,201,0.6)]"
                        style={{
                            boxShadow: '0 0 30px rgba(92, 230, 201, 0.4)'
                        }}
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out -translate-x-full" />
                        <span className="relative text-oneness-black font-bold tracking-widest uppercase text-sm md:text-base">
                            Read The Story
                        </span>
                    </a>

                    {/* Secondary CTA */}
                    <a
                        href="#moments"
                        className="px-10 py-5 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all text-sm md:text-base font-bold tracking-widest uppercase"
                    >
                        View Gallery
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.5 }}
                onClick={handleScrollToNext}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full border border-white/10 hover:border-ekatva-teal/30 hover:opacity-100 transition-all duration-300 focus:outline-none"
                aria-label="Scroll to explore"
                style={{ opacity: contentOpacity }}
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
