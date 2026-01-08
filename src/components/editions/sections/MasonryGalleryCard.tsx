'use client'

/**
 * MASONRY GALLERY CARD
 * 
 * Pinterest-style card with natural image sizing.
 * Uses actual IMG tags for intrinsic height.
 * Preserves shuffle interaction.
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle } from 'lucide-react'

interface MasonryGalleryCardProps {
    deckId: string
    label: string
    images: string[]
    onPhotoClick?: (src: string, alt: string, layoutId: string) => void
    entryDelay?: number
}

// Shuffle sound (same as MemoryDeck)
const playShuffleSound = () => {
    if (typeof window !== 'undefined') {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
    }
}

export function MasonryGalleryCard({
    deckId,
    label,
    images,
    onPhotoClick,
    entryDelay = 0
}: MasonryGalleryCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isShuffling, setIsShuffling] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)

    // Handle shuffle
    const handleShuffle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        if (isShuffling || images.length <= 1) return

        setIsShuffling(true)
        playShuffleSound()

        // Animate to next image
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % images.length)
            setIsShuffling(false)
        }, 300)
    }, [images.length, isShuffling])

    // Handle card click for lightbox
    const handleCardClick = useCallback(() => {
        if (onPhotoClick) {
            const layoutId = `masonry-${deckId}-${currentIndex}`
            onPhotoClick(images[currentIndex], `${label} - Photo ${currentIndex + 1}`, layoutId)
        }
    }, [onPhotoClick, images, currentIndex, deckId, label])

    const currentLayoutId = `masonry-${deckId}-${currentIndex}`

    return (
        <motion.div
            className="masonry-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entryDelay / 1000, duration: 0.5 }}
        >
            {/* Image Container - Natural sizing */}
            <div
                className="masonry-card-image-wrap"
                onClick={handleCardClick}
                role={onPhotoClick ? "button" : undefined}
                tabIndex={onPhotoClick ? 0 : undefined}
                style={{ cursor: onPhotoClick ? 'pointer' : 'default' }}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        ref={imageRef}
                        src={images[currentIndex]}
                        alt={`${label} - Photo ${currentIndex + 1}`}
                        className="masonry-card-image"
                        layoutId={currentLayoutId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: 30, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                    />
                </AnimatePresence>

                {/* Film Grain Overlay */}
                <div className="masonry-card-grain" />

                {/* Category Label */}
                <span className="masonry-card-label">{label}</span>
            </div>

            {/* Shuffle Button */}
            {images.length > 1 && (
                <motion.button
                    className="masonry-shuffle-btn"
                    onClick={handleShuffle}
                    disabled={isShuffling}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Shuffle ${label} photos`}
                >
                    <Shuffle size={18} />
                </motion.button>
            )}
        </motion.div>
    )
}

export default MasonryGalleryCard
