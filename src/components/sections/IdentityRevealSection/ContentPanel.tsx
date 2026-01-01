'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useOrbitalStore } from '@/store/orbitalStore'
import { useEffect } from 'react'

/**
 * ContentPanel - Slide-in detail view for selected planet
 * 
 * Features:
 * - Slides from right on planet click
 * - Devanagari heading with glow
 * - Description, activities, stats
 * - Close on X or Escape key
 */
export default function ContentPanel() {
    const { planets, activePlanetId, closePanel } = useOrbitalStore()

    const activePlanet = planets.find((p) => p.id === activePlanetId)

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
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={closePanel}
                    />

                    {/* Panel */}
                    <motion.aside
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-oneness-black/95 border-l border-divider-gray/30 overflow-y-auto"
                        style={{
                            boxShadow: `-20px 0 60px rgba(0, 0, 0, 0.5)`,
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="panel-title"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePanel}
                            className="absolute top-6 right-6 p-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all z-10"
                            aria-label="Close panel"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        {/* Content */}
                        <div className="p-8 pt-20">
                            {/* Devanagari Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-serif mb-2"
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
                                className="text-2xl md:text-3xl font-bold text-white mb-2"
                            >
                                {activePlanet.name}
                            </motion.h3>

                            {/* Headline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-light-gray mb-8"
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
                                className="text-base text-mid-gray leading-relaxed mb-8"
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
                                            className="px-4 py-2 rounded-full text-sm border"
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
                                className="grid grid-cols-3 gap-4"
                            >
                                {activePlanet.content.stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-4 rounded-xl"
                                        style={{
                                            backgroundColor: `${activePlanet.appearance.baseColor}10`,
                                            border: `1px solid ${activePlanet.appearance.baseColor}30`,
                                        }}
                                    >
                                        <p
                                            className="text-2xl font-bold mb-1"
                                            style={{ color: activePlanet.appearance.baseColor }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-mid-gray uppercase tracking-wide">
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
                                    className="w-full py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: activePlanet.appearance.baseColor,
                                        color: '#050505',
                                        boxShadow: `0 0 30px ${activePlanet.appearance.glowColor}`,
                                    }}
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
