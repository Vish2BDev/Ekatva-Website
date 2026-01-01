'use client'

import { useEffect, useRef } from 'react'
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
                setCenterPosition(rect.width / 2, Math.min(rect.height / 2, 400))
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
                    height: 'clamp(450px, 55vh, 650px)',
                    minHeight: '400px',
                    maxHeight: '700px'
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

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 md:gap-8"
                >
                    {planets.map((planet, index) => (
                        <div
                            key={planet.id}
                            className="flex items-center gap-2 text-xs md:text-sm"
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: planet.appearance.baseColor }}
                            />
                            <span className="text-light-gray hidden sm:inline">
                                {planet.name}
                            </span>
                            <span className="text-mid-gray text-[10px] hidden md:inline">
                                ({index + 1})
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Instruction hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-mid-gray text-center"
                >
                    Click a planet to explore • Arrow keys to navigate • Press P to pause
                </motion.p>
            </div>

            {/* Content Panel (outside SVG for proper z-index) */}
            <ContentPanel />
        </>
    )
}
