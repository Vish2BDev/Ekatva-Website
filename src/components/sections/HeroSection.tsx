'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { scaleIn, fadeIn } from '@/lib/animations'

/**
 * Hero Section - Award-Winning Video Background (10/10)
 * 
 * Features:
 * - Real EKATVA celebration video background
 * - 3-layer overlay system for perfect text readability
 * - MASSIVE typography (208px on desktop)
 * - Mobile-responsive (poster image on mobile)
 * - Smooth parallax scroll effect
 * - Performance optimized with Cloudinary
 */
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMobile, setIsMobile] = useState(false)

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

    // Detect mobile for conditional rendering
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Ensure video plays on mount
    useEffect(() => {
        if (videoRef.current && !isMobile) {
            // Attempt to play video
            videoRef.current.play().catch(err => {
                console.log('Video autoplay prevented:', err)
            })
        }
    }, [isMobile])

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
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-oneness-black"
            aria-label="Hero section with EKATVA celebration video"
        >
            {/* Video/Image Background with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                {isMobile ? (
                    /* Mobile: Static poster image for performance */
                    <Image
                        src="https://res.cloudinary.com/davgdsnyd/video/upload/so_0,f_jpg,q_auto:best/v1767244223/Last_Part_Edit_-_Highlights_720p_qcarfn.jpg"
                        alt="EKATVA Hyderabad 2025 - Students celebrating"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    /* Desktop: Optimized video */
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        poster="https://res.cloudinary.com/davgdsnyd/video/upload/so_0,f_jpg,q_auto:best/v1767244223/Last_Part_Edit_-_Highlights_720p_qcarfn.jpg"
                    >
                        {/* WebM for Chrome/Firefox (better compression) */}
                        <source
                            src="https://res.cloudinary.com/davgdsnyd/video/upload/q_auto:good,f_webm/v1767244223/Last_Part_Edit_-_Highlights_720p_qcarfn.webm"
                            type="video/webm"
                        />

                        {/* MP4 fallback for Safari */}
                        <source
                            src="https://res.cloudinary.com/davgdsnyd/video/upload/q_auto:good,f_mp4/v1767244223/Last_Part_Edit_-_Highlights_720p_qcarfn.mp4"
                            type="video/mp4"
                        />

                        {/* Fallback message */}
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* 3-LAYER OVERLAY SYSTEM FOR TEXT READABILITY */}
                <div className="absolute inset-0 z-10">
                    {/* Layer 1: Base darkening (40% opacity) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'rgba(5, 5, 5, 0.4)'
                        }}
                    />

                    {/* Layer 2: Radial gradient spotlight (30-85% opacity) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(
                                ellipse 60% 60% at 50% 45%,
                                rgba(31, 79, 89, 0.3) 0%,
                                rgba(14, 47, 54, 0.6) 40%,
                                rgba(5, 5, 5, 0.85) 100%
                            )`
                        }}
                    />

                    {/* Layer 3: Top/bottom vignette for cinematic feel */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(
                                to bottom,
                                rgba(5, 5, 5, 0.6) 0%,
                                transparent 30%,
                                transparent 70%,
                                rgba(5, 5, 5, 0.7) 100%
                            )`
                        }}
                    />
                </div>
            </motion.div>

            {/* Hero Content - MASSIVE Typography */}
            <motion.div
                className="relative z-20 text-center px-4 max-w-6xl mx-auto"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                {/* Pre-headline Badge */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="inline-block mb-10 px-6 py-3 rounded-full border border-unity-gold/50 bg-unity-gold/20 backdrop-blur-md"
                >
                    <span className="text-sm md:text-base text-unity-gold tracking-[0.3em] uppercase font-bold">
                        The Legend Begins
                    </span>
                </motion.div>

                {/* ULTRA-MASSIVE Headline - Award-Winning Scale */}
                <motion.h1
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] text-white leading-[1.05] mb-12"
                >
                    <motion.span
                        className="block"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        From Online
                    </motion.span>
                    <motion.span
                        className="block text-unity-gold italic"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            textShadow: '0 0 80px rgba(255, 207, 150, 0.6), 0 0 120px rgba(255, 207, 150, 0.4)'
                        }}
                    >
                        to Oneness.
                    </motion.span>
                </motion.h1>

                {/* Subtitle - Larger & More Readable */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    className="text-white text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto mb-16 font-light leading-relaxed"
                    style={{
                        textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    The aftermovie is coming. Until then, explore the journey behind{' '}
                    <br className="hidden lg:block" />
                    IITM BS&apos;s first-ever regional fest.
                </motion.p>

                {/* CTA Buttons - Larger & More Prominent */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    {/* Primary CTA - Bigger with stronger glow */}
                    <a
                        href="#origin-story"
                        className="group relative px-12 py-6 bg-ekatva-teal rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(92,230,201,0.7)]"
                        style={{
                            boxShadow: '0 0 40px rgba(92, 230, 201, 0.5)'
                        }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out -translate-x-full" />

                        <span className="relative text-oneness-black font-bold tracking-widest uppercase text-base md:text-lg">
                            Read The Story
                        </span>
                    </a>

                    {/* Secondary CTA - Larger */}
                    <a
                        href="#moments"
                        className="px-12 py-6 rounded-full border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all text-base md:text-lg font-bold tracking-widest uppercase backdrop-blur-sm"
                    >
                        View Gallery
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator - Slightly larger */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 1.5 }}
                onClick={handleScrollToNext}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-full border border-white/20 hover:border-ekatva-teal/40 hover:opacity-100 transition-all duration-300 focus:outline-none backdrop-blur-sm"
                aria-label="Scroll to explore EKATVA story"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-6 h-6 text-white/70" />
                </motion.div>
            </motion.button>
        </section>
    )
}
