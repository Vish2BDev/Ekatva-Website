'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useOrbitalStore } from '@/store/orbitalStore'
import { useEffect, useRef } from 'react'

/**
 * ContentPanel - Slide-in detail view for selected planet
 * 
 * ENHANCEMENTS (10/10):
 * ✅ Focus trap (locks focus inside panel)
 * ✅ Proper ARIA dialog attributes
 * ✅ Smooth slide animation
 * ✅ Auto-scroll to top on open
 * ✅ Better mobile spacing
 */
export default function ContentPanel() {
    const { planets, activePlanetId, closePanel } = useOrbitalStore()
    const panelRef = useRef<HTMLElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    const activePlanet = planets.find((p) => p.id === activePlanetId)

    // Focus management - trap focus inside panel
    useEffect(() => {
        if (!activePlanet) return

        // Focus close button when panel opens
        closeButtonRef.current?.focus()

        // Store previously focused element
        const previouslyFocused = document.activeElement as HTMLElement

        // Focus trap logic
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && panelRef.current) {
                const focusableElements = panelRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
                const firstElement = focusableElements[0] as HTMLElement
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

                if (e.shiftKey && document.activeElement === firstElement) {
                    // Shift+Tab on first element -> go to last
                    e.preventDefault()
                    lastElement?.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    // Tab on last element -> go to first
                    e.preventDefault()
                    firstElement?.focus()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        // Cleanup: restore focus on close
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            previouslyFocused?.focus()
        }
    }, [activePlanet])

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && activePlanetId) {
                closePanel()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activePlanetId, closePanel])

    // Scroll to top when opening
    useEffect(() => {
        if (activePlanet && panelRef.current) {
            panelRef.current.scrollTop = 0
        }
    }, [activePlanet])

    return (
        <AnimatePresence>
            {activePlanet && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                        onClick={closePanel}
                        aria-hidden="true"
                    />

                    {/* Panel */}
                    <motion.aside
                        ref={panelRef}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-oneness-black/95 border-l border-divider-gray/30 overflow-y-auto"
                        style={{
                            boxShadow: `-20px 0 60px rgba(0, 0, 0, 0.5)`,
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="panel-title"
                        aria-describedby="panel-description"
                    >
                        {/* Close Button - Larger touch target on mobile */}
                        <button
                            ref={closeButtonRef}
                            onClick={closePanel}
                            className="absolute top-4 md:top-6 right-4 md:right-6 p-3 md:p-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-ekatva-teal"
                            aria-label="Close panel and return to orbit view"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        {/* Content */}
                        <div className="p-6 md:p-8 pt-16 md:pt-20">
                            {/* Devanagari Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2"
                                style={{
                                    color: activePlanet.appearance.baseColor,
                                    textShadow: `0 0 30px ${activePlanet.appearance.glowColor}`,
                                }}
                            >
                                {activePlanet.devanagari}
                            </motion.h2>

                            {/* English Name */}
                            <motion.h3
                                id="panel-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2"
                            >
                                {activePlanet.name}
                            </motion.h3>

                            {/* Headline */}
                            <motion.p
                                id="panel-description"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-base md:text-lg text-light-gray mb-8"
                            >
                                {activePlanet.content.headline}
                            </motion.p>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.25 }}
                                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
                            />

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-sm md:text-base text-mid-gray leading-relaxed mb-8"
                            >
                                {activePlanet.content.description}
                            </motion.p>

                            {/* Activities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mb-8"
                            >
                                <h4 className="text-xs uppercase tracking-widest text-light-gray mb-4">
                                    Featured Activities
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {activePlanet.content.activities.map((activity, index) => (
                                        <span
                                            key={index}
                                            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm border"
                                            style={{
                                                borderColor: `${activePlanet.appearance.baseColor}40`,
                                                color: activePlanet.appearance.baseColor,
                                                backgroundColor: `${activePlanet.appearance.baseColor}10`,
                                            }}
                                        >
                                            {activity}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-3 gap-3 md:gap-4"
                            >
                                {activePlanet.content.stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-3 md:p-4 rounded-xl"
                                        style={{
                                            backgroundColor: `${activePlanet.appearance.baseColor}10`,
                                            border: `1px solid ${activePlanet.appearance.baseColor}30`,
                                        }}
                                    >
                                        <p
                                            className="text-xl md:text-2xl font-bold mb-1"
                                            style={{ color: activePlanet.appearance.baseColor }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-mid-gray uppercase tracking-wide">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                className="mt-10"
                            >
                                <button
                                    onClick={closePanel}
                                    className="w-full py-3 md:py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-oneness-black"
                                    style={{
                                        backgroundColor: activePlanet.appearance.baseColor,
                                        color: '#050505',
                                        boxShadow: `0 0 30px ${activePlanet.appearance.glowColor}`,
                                    }}
                                    aria-label="Close panel and return to orbit view"
                                >
                                    Back to Orbit
                                </button>
                            </motion.div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    )
}
