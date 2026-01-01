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
 * OrbitalSystem - PRODUCTION VERSION
 * 
 * Clean, polished orbital visualization
 * - Proper SVG viewBox for visibility
 * - No debug markers
 * - ARIA accessible
 * - Mobile optimized
 */
export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(500)
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [svgDimensions, setSvgDimensions] = useState({ width: 1000, height: 700 })

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

    // Update center position and SVG dimensions
    useEffect(() => {
        const updateCenter = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const height = rect.height
                const width = rect.width

                setContainerHeight(height)
                setSvgDimensions({ width, height })

                // Center position - EXACTLY in middle
                const centerX = width / 2
                const centerY = height / 2

                setCenterPosition(centerX, centerY)
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
            {/* ARIA LIVE REGION */}
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
                    maxHeight: '750px',
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
                    className="absolute inset-0"
                    width={svgDimensions.width}
                    height={svgDimensions.height}
                    viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
                    style={{ overflow: 'visible' }}
                    preserveAspectRatio="xMidYMid meet"
                    aria-label="EKATVA orbital system showing three pillars"
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

                {/* Instruction hint */}
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

                {/* Legend */}
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
            </div>

            {/* Content Panel */}
            <ContentPanel />
        </>
    )
}
