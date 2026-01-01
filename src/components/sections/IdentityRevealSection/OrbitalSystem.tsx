'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
 * Features:
 * - SVG viewport with star/particle background
 * - Motion trails behind planets
 * - Orbit trails, center core, planets
 * - Responsive sizing
 * - Content panel for details
 * - Keyboard navigation
 */
export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(500)

    const {
        planets,
        hoveredPlanetId,
        orbitScale,
        planetSize,
        centerPosition,
        setCenterPosition,
    } = useOrbitalStore()

    // Initialize animation
    useOrbitalAnimation()

    // Initialize keyboard navigation
    useOrbitalInteraction()

    // Update center position on mount and resize
    useEffect(() => {
        const updateCenter = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setContainerHeight(rect.height)
                // Simply use middle for centered positioning
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

        return () => observer.disconnect()
    }, [setCenterPosition])

    return (
        <>
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                style={{
                    height: 'clamp(500px, 60vh, 700px)',
                    minHeight: '450px',
                    maxHeight: '750px'
                }}
            >
                {/* Particle Field Background */}
                <ParticleField count={60} />

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
                    {planets.map((planet) => (
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
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute left-1/2 -translate-x-1/2 text-xs text-mid-gray text-center z-10 whitespace-nowrap"
                    style={{ bottom: '56px' }}
                >
                    Click a planet to explore • Arrow keys to navigate • Press P to pause
                </motion.p>

                {/* Legend - at very bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-10 bg-oneness-black/80 px-4 py-2 rounded-full backdrop-blur-sm"
                    style={{ bottom: '16px' }}
                >
                    {planets.map((planet, index) => (
                        <div
                            key={planet.id}
                            className="flex items-center gap-2 text-xs md:text-sm"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: planet.appearance.baseColor }}
                            />
                            <span className="text-light-gray hidden sm:inline text-xs">
                                {planet.name}
                            </span>
                            <span className="text-mid-gray text-[10px] hidden md:inline">
                                ({index + 1})
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Content Panel (outside SVG for proper z-index) */}
            <ContentPanel />
        </>
    )
}
