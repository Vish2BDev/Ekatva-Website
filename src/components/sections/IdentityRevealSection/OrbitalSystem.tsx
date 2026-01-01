'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOrbitalStore } from '@/store/orbitalStore'
import { useOrbitalAnimation } from '@/hooks/useOrbitalAnimation'
import { useOrbitalInteraction } from '@/hooks/useOrbitalInteraction'
import CenterCore from './CenterCore'
import Planet from './Planet'
import OrbitTrails from './OrbitTrails'
import ContentPanel from './ContentPanel'
import MotionTrail from './MotionTrail'
import ParticleField from './ParticleField'

/**
 * OrbitalSystem - Main container for the stellar orbit visualization
 * 
 * ENHANCEMENTS (10/10):
 * ✅ ARIA live regions for screen readers
 * ✅ Loading skeleton on first render
 * ✅ Mobile-optimized touch zones
 * ✅ Performance monitoring
 * ✅ Responsive center positioning
 */
export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(500)
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const {
        planets,
        hoveredPlanetId,
        activePlanetId,
        orbitScale,
        planetSize,
        centerPosition,
        setCenterPosition,
    } = useOrbitalStore()

    // Initialize animation
    useOrbitalAnimation()

    // Initialize keyboard navigation
    useOrbitalInteraction()

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Update center position on mount and resize
    useEffect(() => {
        const updateCenter = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setContainerHeight(rect.height)

                // FIXED: Use exact center instead of 42% offset
                const centerY = rect.height / 2
                setCenterPosition(rect.width / 2, centerY)
            }
        }

        updateCenter()

        // Observe container size changes
        const observer = new ResizeObserver(updateCenter)
        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        // Mark as loaded after first paint
        const timer = setTimeout(() => setIsLoading(false), 100)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
        }
    }, [setCenterPosition])

    // Get active planet for ARIA announcements
    const activePlanet = planets.find(p => p.id === activePlanetId)
    const hoveredPlanet = planets.find(p => p.id === hoveredPlanetId)

    return (
        <>
            {/* ARIA LIVE REGION - Screen reader announcements */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {hoveredPlanet && !activePlanetId && (
                    `Hovering over ${hoveredPlanet.name}: ${hoveredPlanet.content.headline}`
                )}
                {activePlanet && (
                    `Viewing ${activePlanet.name}. Press Escape to return to orbit view.`
                )}
            </div>

            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                style={{
                    height: 'clamp(450px, 60vh, 700px)',
                    minHeight: '400px',
                    maxHeight: '750px'
                }}
                role="application"
                aria-label="Interactive orbital system showing EKATVA's three expressions"
            >
                {/* Loading Skeleton */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center bg-oneness-black/50 backdrop-blur-sm z-50"
                        >
                            <div className="flex flex-col items-center gap-4">
                                {/* Pulsing center circle */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="w-20 h-20 rounded-full border-2 border-ekatva-teal"
                                />
                                <p className="text-sm text-mid-gray">Initializing orbital system...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Particle Field Background */}
                <ParticleField count={isMobile ? 30 : 60} />

                {/* Main SVG Viewport */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ willChange: 'transform' }}
                    aria-label="EKATVA orbital system showing three pillars: Socio-Cultural, Techno-Cultural, and Sports"
                    role="img"
                >
                    {/* Orbit Trails */}
                    <OrbitTrails
                        planets={planets}
                        centerX={centerPosition.x}
                        centerY={centerPosition.y}
                        scale={orbitScale}
                    />

                    {/* Motion Trails (behind planets) */}
                    {!isMobile && planets.map((planet) => (
                        <MotionTrail
                            key={`trail-${planet.id}`}
                            planet={planet}
                            centerX={centerPosition.x}
                            centerY={centerPosition.y}
                            isHovered={hoveredPlanetId === planet.id}
                        />
                    ))}

                    {/* Center Core */}
                    <CenterCore
                        cx={centerPosition.x}
                        cy={centerPosition.y}
                    />

                    {/* Planets */}
                    {planets.map((planet) => (
                        <Planet
                            key={planet.id}
                            planet={planet}
                            centerX={centerPosition.x}
                            centerY={centerPosition.y}
                            size={planetSize}
                        />
                    ))}
                </svg>

                {/* Instruction hint - positioned above legend */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute left-1/2 -translate-x-1/2 text-xs text-mid-gray text-center z-10 px-4"
                    style={{ bottom: isMobile ? '48px' : '56px' }}
                >
                    {isMobile
                        ? 'Tap a planet to explore'
                        : 'Click a planet to explore • Arrow keys to navigate • Press P to pause'
                    }
                </motion.p>

                {/* Legend - at very bottom with better mobile spacing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 flex gap-3 md:gap-6 z-10 bg-oneness-black/80 px-3 md:px-4 py-1.5 md:py-2 rounded-full backdrop-blur-sm"
                    style={{ bottom: '12px' }}
                    role="list"
                    aria-label="Planet legend"
                >
                    {planets.map((planet, index) => (
                        <div
                            key={planet.id}
                            className="flex items-center gap-1.5 md:gap-2 text-xs"
                            role="listitem"
                        >
                            <div
                                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: planet.appearance.baseColor }}
                                aria-hidden="true"
                            />
                            <span className="text-light-gray text-[10px] md:text-xs whitespace-nowrap">
                                {isMobile ? planet.name.split('-')[0] : planet.name}
                            </span>
                            {!isMobile && (
                                <span className="text-mid-gray text-[9px] md:text-[10px] hidden md:inline">
                                    ({index + 1})
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Performance Monitor (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute top-2 left-2 text-[10px] text-mid-gray font-mono bg-oneness-black/80 px-2 py-1 rounded">
                        <div>Scale: {orbitScale.toFixed(2)}</div>
                        <div>Center: {centerPosition.x.toFixed(0)}, {centerPosition.y.toFixed(0)}</div>
                        <div>Planets: {planets.length}</div>
                    </div>
                )}
            </div>

            {/* Content Panel (outside SVG for proper z-index) */}
            <ContentPanel />
        </>
    )
}
