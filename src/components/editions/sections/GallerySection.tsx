'use client'

/**
 * GALLERY SECTION - EDITION PAGE
 * 
 * Photo gallery with:
 * - Grid layout for completed editions
 * - Placeholder for upcoming editions
 * - Download link for high-res photos
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryData, EditionStatus } from '@/types/edition'

interface GallerySectionProps {
    data: GalleryData
    status: EditionStatus
    city: string
}

export function GallerySection({ data, status, city }: GallerySectionProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
    }

    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setLightboxIndex((prev) => (prev === 0 ? data.photos.length - 1 : prev - 1))
        } else {
            setLightboxIndex((prev) => (prev === data.photos.length - 1 ? 0 : prev + 1))
        }
    }

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
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    }

    // Completed edition with photos
    if (status === 'completed' && data.photos.length > 0) {
        return (
            <section className="gallery-section">
                <motion.h2
                    className="section-headline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Every Moment, Every Memory
                </motion.h2>

                <motion.div
                    className="gallery-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {data.photos.slice(0, 8).map((photo, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            variants={itemVariants}
                            onClick={() => openLightbox(index)}
                        >
                            <img src={photo.url} alt={photo.caption} />
                            <div className="gallery-caption">
                                <p>{photo.caption}</p>
                                {photo.timestamp && <span>{photo.timestamp}</span>}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="gallery-actions"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    {data.photos.length > 8 && (
                        <button className="gallery-view-all" onClick={() => openLightbox(0)}>
                            View All {data.photos.length} Photos
                        </button>
                    )}

                    {data.downloadLink && (
                        <a href={data.downloadLink} className="gallery-download" download>
                            <Download size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                            Download High-Res (ZIP)
                        </a>
                    )}
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxOpen && (
                        <motion.div
                            className="lightbox-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeLightbox}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.95)',
                                zIndex: 2000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 20,
                            }}
                        >
                            <button
                                onClick={closeLightbox}
                                style={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 20,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                }}
                            >
                                <X size={24} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigateLightbox('prev')
                                }}
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                }}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            >
                                <img
                                    src={data.photos[lightboxIndex].url}
                                    alt={data.photos[lightboxIndex].caption}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        borderRadius: 12,
                                    }}
                                />
                                <p
                                    style={{
                                        textAlign: 'center',
                                        color: '#fff',
                                        marginTop: 16,
                                        fontSize: 16,
                                    }}
                                >
                                    {data.photos[lightboxIndex].caption}
                                </p>
                            </motion.div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigateLightbox('next')
                                }}
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                }}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
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

            <div className="gallery-teaser">
                <p className="teaser-label">From EKATVA Hyderabad 2025:</p>
                {/* Teaser would show Hyderabad photos */}
                <motion.div
                    className="gallery-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ opacity: 0.7 }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="gallery-item"
                            variants={itemVariants}
                            style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    fontSize: 48,
                                }}
                            >
                                📷
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default GallerySection
