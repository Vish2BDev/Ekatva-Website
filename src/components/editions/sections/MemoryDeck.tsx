'use client'

/**
 * MEMORY DECK - Interactive Shuffle Card Component
 * 
 * Implements the "Digital Memory Box" metaphor:
 * - 3 stacked cards with subtle rotation
 * - Click to shuffle with elegant animation + haptic sound
 * - Click card to open in lightbox (FLIP animation)
 * - Film grain overlay for nostalgia
 * - Category label with glass pill effect
 * 
 * PROGRESSIVE REVEAL SYSTEM:
 * - Layer 1: Better icon (Shuffle instead of RefreshCw)
 * - Layer 2: Entry animation (pulse on viewport)
 * - Layer 3: Hover-expand label (circle → pill with "Shuffle" text)
 * 
 * Architecture: Iceberg Loading + Circular Buffer
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { getShuffleSound } from '@/lib/HapticAudio'

interface MemoryDeckProps {
    deckId: string
    label: string
    images: string[]
    className?: string
    onPhotoClick?: (src: string, alt: string, layoutId: string) => void
    entryDelay?: number // Staggered delay for entry animation
}

// Random rotation between -2° and +2° (Ekatva brand: harmony, not chaos)
const getRandomRotation = () => (Math.random() * 4 - 2)

export function MemoryDeck({
    deckId,
    label,
    images,
    className = '',
    onPhotoClick,
    entryDelay = 0
}: MemoryDeckProps) {
    const prefersReducedMotion = useReducedMotion()

    // Circular buffer state
    const [cursor, setCursor] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [hasEnteredView, setHasEnteredView] = useState(false)

    // Precomputed rotations for back cards
    const [backRotation, setBackRotation] = useState(getRandomRotation())
    const [shadowRotation, setShadowRotation] = useState(getRandomRotation())

    // Preload next image
    const preloadRef = useRef<HTMLImageElement | null>(null)
    const deckRef = useRef<HTMLDivElement>(null)

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Entry animation trigger using IntersectionObserver
    useEffect(() => {
        if (!deckRef.current || prefersReducedMotion) {
            setHasEnteredView(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasEnteredView) {
                    // Delay based on entryDelay prop for staggered effect
                    setTimeout(() => {
                        setHasEnteredView(true)
                    }, entryDelay)
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(deckRef.current)
        return () => observer.disconnect()
    }, [entryDelay, hasEnteredView, prefersReducedMotion])

    useEffect(() => {
        // Preload n+2 image for fast shuffle
        const nextNextIndex = (cursor + 2) % images.length
        const img = new Image()
        img.src = images[nextNextIndex]
        preloadRef.current = img
    }, [cursor, images])

    // Get current indices using circular buffer
    const topIndex = cursor % images.length
    const backIndex = (cursor + 1) % images.length
    const shadowIndex = (cursor + 2) % images.length

    // Generate unique layoutId for FLIP animation
    const currentLayoutId = `photo-${deckId}-${topIndex}`

    // Shuffle handler with lock to prevent animation overlap
    const handleShuffle = useCallback((e: React.MouseEvent) => {
        // Prevent click from bubbling to card
        e.stopPropagation()

        if (isLocked) return

        // Play haptic sound - the magic touch! 🎯
        getShuffleSound().play()

        if (prefersReducedMotion) {
            // For reduced motion, just swap instantly
            setCursor(prev => prev + 1)
            return
        }

        setIsLocked(true)

        // Increment cursor (circular buffer)
        setCursor(prev => prev + 1)

        // Generate new rotations for incoming cards
        setTimeout(() => {
            setBackRotation(getRandomRotation())
            setShadowRotation(getRandomRotation())
        }, 200)

        // Release lock after animation completes (400ms cooldown)
        setTimeout(() => {
            setIsLocked(false)
        }, 400)
    }, [isLocked, prefersReducedMotion])

    // Handle card click for lightbox (not shuffle button)
    const handleCardClick = useCallback(() => {
        if (onPhotoClick) {
            onPhotoClick(
                images[topIndex],
                `${label} - Photo ${topIndex + 1}`,
                currentLayoutId
            )
        }
    }, [onPhotoClick, images, topIndex, label, currentLayoutId])

    return (
        <div
            ref={deckRef}
            className={`memory-deck ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Stack Container */}
            <div
                className="memory-deck-stack"
                onClick={handleCardClick}
                role={onPhotoClick ? "button" : undefined}
                tabIndex={onPhotoClick ? 0 : undefined}
                aria-label={onPhotoClick ? `View ${label} in full screen` : undefined}
                style={{ cursor: onPhotoClick ? 'pointer' : 'default' }}
            >
                {/* Shadow Card (z-index: 1) */}
                <motion.div
                    className="memory-card memory-card--shadow"
                    animate={{
                        rotate: shadowRotation,
                        scale: 0.92,
                        opacity: 0.6,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        backgroundImage: `url(${images[shadowIndex]})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1
                    }}
                />

                {/* Back Card (z-index: 2) */}
                <motion.div
                    className="memory-card memory-card--back"
                    animate={{
                        rotate: backRotation,
                        scale: 0.95,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                        backgroundImage: `url(${images[backIndex]})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 2
                    }}
                />

                {/* Top Card with AnimatePresence for exit (z-index: 3) */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={topIndex}
                        layoutId={currentLayoutId}
                        className="memory-card memory-card--top"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            x: 0
                        }}
                        exit={{
                            x: '25%',
                            rotate: 8,
                            opacity: 0
                        }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{
                            backgroundImage: `url(${images[topIndex]})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            zIndex: 3
                        }}
                    >
                        {/* Film Grain Overlay */}
                        <div className="memory-card-grain" />

                        {/* Category Label - Glass Pill */}
                        <span className="memory-deck-label">{label}</span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Shuffle Button - Progressive Reveal Design */}
            {/* Layer 2: Entry animation (pulse) */}
            {/* Layer 3: Hover-expand to show "Shuffle" text */}
            <motion.button
                className={`shuffle-btn ${isButtonHovered && !isMobile ? 'shuffle-btn--expanded' : ''}`}
                onClick={handleShuffle}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                disabled={isLocked}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    opacity: isHovered || isMobile ? 1 : 0.6,
                    y: 0,
                    scale: hasEnteredView ? 1 : 0.8
                }}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
                    scale: { duration: hasEnteredView ? 0.3 : 0.5 }
                }}
                aria-label={`Shuffle ${label} photos`}
            >
                <Shuffle size={18} strokeWidth={2.5} />
                {/* Hover label - only show on desktop */}
                <span className="shuffle-btn-label">Shuffle</span>
            </motion.button>
        </div>
    )
}

export default MemoryDeck

