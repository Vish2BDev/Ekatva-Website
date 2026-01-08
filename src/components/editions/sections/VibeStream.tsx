'use client'

/**
 * VIBE STREAM - Infinite Inertia Marquee
 * 
 * The "Stream of Oneness" - a world-class slider that:
 * - Auto-scrolls at 30s per loop (drift, not race)
 * - Monochrome → Color on hover (finding unity)
 * - Desktop: Drag with inertia momentum
 * - Mobile: Touch scroll only (prevent scroll trap)
 * - Film grain overlay for nostalgia
 * 
 * Architecture: Duplicated track for seamless loop
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion'

interface VibeStreamProps {
    images: string[]
    className?: string
}

export function VibeStream({ images, className = '' }: VibeStreamProps) {
    const prefersReducedMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const [trackWidth, setTrackWidth] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const x = useMotionValue(0)
    const baseVelocity = -0.5 // Slow drift speed (pixels per frame)

    // Detect mobile for scroll trap prevention
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Calculate track width on mount
    useEffect(() => {
        if (trackRef.current) {
            // Single set of images width (we duplicate, so divide by 2)
            setTrackWidth(trackRef.current.scrollWidth / 2)
        }
    }, [images])

    // Continuous auto-scroll animation
    useAnimationFrame((_, delta) => {
        if (prefersReducedMotion || isPaused || isDragging || trackWidth === 0) return

        let newX = x.get() + baseVelocity * (delta / 16.67) // Normalize to 60fps

        // Loop seamlessly
        if (Math.abs(newX) >= trackWidth) {
            newX = 0
        }

        x.set(newX)
    })

    // Drag config for desktop with inertia
    const dragConfig = isMobile ? {} : {
        drag: 'x' as const,
        dragConstraints: { left: -trackWidth, right: 0 },
        dragElastic: 0.1,
        dragMomentum: true,
        dragTransition: {
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.3,
            timeConstant: 200
        },
        onDragStart: () => setIsDragging(true),
        onDragEnd: () => {
            setIsDragging(false)
            // Normalize position after drag
            const currentX = x.get()
            if (Math.abs(currentX) >= trackWidth) {
                x.set(currentX % trackWidth)
            }
        }
    }

    // Duplicate images for seamless loop
    const duplicatedImages = [...images, ...images]

    return (
        <div
            ref={containerRef}
            className={`vibe-stream ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Film Grain Overlay */}
            <div className="vibe-stream-grain" />

            {/* Track */}
            <motion.div
                ref={trackRef}
                className="vibe-stream-track"
                style={{ x }}
                {...dragConfig}
            >
                {duplicatedImages.map((src, index) => (
                    <motion.div
                        key={`${src}-${index}`}
                        className="vibe-item"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <img
                            src={src}
                            alt={`Event moment ${(index % images.length) + 1}`}
                            loading="lazy"
                            draggable={false}
                        />
                        {/* Unity Gold Overlay for monochrome state */}
                        <div className="vibe-item-overlay" />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default VibeStream
