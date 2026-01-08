'use client'

/**
 * PHOTO LIGHTBOX - FLIP Animation Fullscreen View
 * 
 * Uses Framer Motion's layoutId for FLIP (First-Last-Invert-Play)
 * animation. The card physically expands from its grid position
 * to fullscreen, creating a seamless transition.
 * 
 * Key Features:
 * - layoutId matching for FLIP animation
 * - AnimatePresence for overlay fade
 * - ESC key and click-outside to close
 * - Accessible: aria-modal, focus management
 * - Body scroll lock while open
 */

import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface PhotoLightboxProps {
    imageSrc: string
    imageAlt: string
    layoutId: string
    onClose: () => void
}

export function PhotoLightbox({
    imageSrc,
    imageAlt,
    layoutId,
    onClose
}: PhotoLightboxProps) {

    // ESC key handler
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }, [onClose])

    // Setup keyboard listener and body scroll lock
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        // Lock body scroll while lightbox is open
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = originalOverflow
        }
    }, [handleKeyDown])

    return (
        <>
            {/* Backdrop - Click to close */}
            <motion.div
                className="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Image Container - FLIP animation via layoutId */}
            <motion.div
                className="lightbox-content"
                layoutId={layoutId}
                role="dialog"
                aria-modal="true"
                aria-label={imageAlt}
            >
                <motion.img
                    src={imageSrc}
                    alt={imageAlt}
                    className="lightbox-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                />

                {/* Close button */}
                <motion.button
                    className="lightbox-close"
                    onClick={onClose}
                    aria-label="Close lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <X size={24} />
                </motion.button>
            </motion.div>
        </>
    )
}

export default PhotoLightbox
