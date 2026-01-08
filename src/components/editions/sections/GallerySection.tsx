'use client'

/**
 * GALLERY SECTION - "Every Moment, Every Memory"
 * 
 * Hybrid architecture:
 * - 6 Interactive Shuffle Decks (3x2 grid)
 * - 1 Infinite Vibe Stream (full-bleed marquee)
 * 
 * Implements Iceberg Loading:
 * - Phase 1: Top cards only (LCP priority)
 * - Phase 2: Back cards after idle
 * - Phase 3: n+2 on interaction
 */

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { MemoryDeck } from './MemoryDeck'
import { VibeStream } from './VibeStream'
import type { GalleryData, EditionStatus } from '@/types/edition'

interface GallerySectionProps {
    data: GalleryData
    status: EditionStatus
    city: string
}

// Gallery deck configuration - Iceberg data model
const DECK_CONFIG = {
    'icebreakers': {
        label: 'Icebreakers',
        images: [
            '/images/gallery/icebreakers/speed-conversations.png',
            '/images/gallery/icebreakers/senior-junior.png',
            '/images/gallery/icebreakers/treasure-hunt.png'
        ]
    },
    'red-light': {
        label: 'Red Light, Green Light',
        images: [
            '/images/gallery/red-light/thumbnail.png',
            '/images/gallery/red-light/action-1.jpg'
        ]
    },
    'mimic-relay': {
        label: 'Mimic Relay',
        images: [
            '/images/gallery/mimic-relay/mimic-1.png',
            '/images/gallery/mimic-relay/mimic-2.png'
        ]
    },
    'interactive': {
        label: 'Interactive Sessions',
        images: [
            '/images/gallery/interactive/interactive-1.png',
            '/images/gallery/interactive/interactive-2.png'
        ]
    },
    'dj-night': {
        label: 'Music & DJ Night',
        images: [
            '/images/gallery/dj-night/music.png',
            '/images/gallery/dj-night/dance.png',
            '/images/gallery/dj-night/dj.png'
        ]
    },
    'ekatva-family': {
        label: 'Ekatva Family',
        images: [
            '/images/gallery/ekatva-family/family-1.png',
            '/images/gallery/ekatva-family/family-2.jpg',
            '/images/gallery/ekatva-family/family-3.png'
        ]
    }
}

// Slider images for vibe stream
const SLIDER_IMAGES = [
    '/images/gallery/slider/people-1.png',
    '/images/gallery/slider/people-2.jpg',
    '/images/gallery/slider/people-3.jpg',
    '/images/gallery/slider/venue-1.jpg'
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
}

export function GallerySection({ data, status, city }: GallerySectionProps) {
    // For completed editions with shuffle decks
    if (status === 'completed') {
        return (
            <section className="gallery-section gallery-section--hybrid">
                {/* Section Header */}
                <motion.div
                    className="gallery-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <h2 className="section-headline">
                        Every Moment, <span className="text-gold">Every Memory</span>
                    </h2>
                    <p className="gallery-subheadline">
                        Click to shuffle through the highlights
                    </p>
                </motion.div>

                {/* Shuffle Deck Grid - 3x2 on Desktop */}
                <motion.div
                    className="memory-deck-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {Object.entries(DECK_CONFIG).map(([deckId, deck]) => (
                        <motion.div key={deckId} variants={itemVariants}>
                            <MemoryDeck
                                deckId={deckId}
                                label={deck.label}
                                images={deck.images}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Vibe Stream - Full Bleed Marquee */}
                <motion.div
                    className="vibe-stream-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <VibeStream images={SLIDER_IMAGES} />
                </motion.div>

                {/* Download Action */}
                {data.downloadLink && (
                    <motion.div
                        className="gallery-actions"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <a href={data.downloadLink} className="gallery-download" download>
                            <Download size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                            Download High-Res (ZIP)
                        </a>
                    </motion.div>
                )}
            </section>
        )
    }

    // Upcoming edition - placeholder
    return (
        <section className="gallery-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                A Glimpse of What Awaits
            </motion.h2>

            <motion.div
                className="gallery-placeholder"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <div className="placeholder-content">
                    <span className="placeholder-icon">📸</span>
                    <h3>Memories in the Making</h3>
                    <p>
                        The gallery will be filled with moments from {city} 2025.
                        <br />
                        For now, explore what Hyderabad looked like:
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

export default GallerySection
