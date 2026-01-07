'use client'

/**
 * HERO SECTION - EDITION PAGE
 * 
 * Above-the-fold section with:
 * - Video (completed editions - aftermovie teaser loop)
 * - Image (upcoming editions - venue photo)
 * - Title + Subtitle + Venue
 * - Status badge
 * - CTA button (upcoming only)
 * - Scroll indicator
 */

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { HeroData, EditionStatus } from '@/types/edition'

interface HeroSectionProps {
    data: HeroData
    status: EditionStatus
}

export function HeroSection({ data, status }: HeroSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    // Auto-play video on mount
    useEffect(() => {
        if (videoRef.current && data.type === 'video') {
            videoRef.current.play().catch(() => {
                // Autoplay failed (browser policy)
                console.log('Autoplay prevented')
            })
        }
    }, [data.type])

    // Scroll indicator click handler
    const handleScrollClick = () => {
        const statsSection = document.querySelector('.stats-section')
        if (statsSection) {
            statsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="hero-section">
            {/* Background Media */}
            {data.type === 'video' && data.videoUrl ? (
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={data.videoPoster}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                >
                    <source src={data.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : data.imageUrl ? (
                <img
                    className="hero-image"
                    src={data.imageUrl}
                    alt={`${data.title} venue`}
                />
            ) : (
                <div className="hero-image" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }} />
            )}

            {/* Gradient Overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Status Badge */}
                <motion.span
                    className={`hero-status ${status}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {status === 'completed' ? '✅ Completed' : '📅 Upcoming'}
                </motion.span>

                {/* Title */}
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {data.title}
                </motion.h1>

                {/* Subtitle (Date) */}
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {data.subtitle}
                </motion.p>

                {/* Venue */}
                <motion.p
                    className="hero-venue"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    📍 {data.venue}
                </motion.p>

                {/* CTA Button (Upcoming only) */}
                {status === 'upcoming' && data.ctaLink && (
                    <motion.a
                        href={data.ctaLink}
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        {data.ctaText || 'Register Now'}
                    </motion.a>
                )}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
                className="scroll-indicator"
                onClick={handleScrollClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                aria-label="Scroll to content"
            >
                <span className="scroll-text">Scroll to explore</span>
                <svg
                    className="scroll-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M12 5v14m0 0l7-7m-7 7l-7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.button>

            {/* Video Play/Pause Indicator (subtle) */}
            {data.type === 'video' && (
                <div className="video-indicator">
                    {isVideoPlaying ? (
                        <span className="video-status playing">▶ Playing</span>
                    ) : (
                        <span className="video-status paused">⏸ Paused</span>
                    )}
                </div>
            )}
        </section>
    )
}

export default HeroSection
