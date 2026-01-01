'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useOrbitalStore } from '@/store/orbitalStore'
import { useOrbitalAnimation } from '@/hooks/useOrbitalAnimation'
import CenterCore from './CenterCore'
import Planet from './Planet'
import OrbitTrails from './OrbitTrails'
import ContentPanel from './ContentPanel'

/**
 * OrbitalSystem - Main container for the stellar orbit visualization
 * 
 * Features:
 * - SVG viewport with star background
 * - Orbit trails, center core, planets
 * - Responsive sizing
 * - Content panel for details
 */
export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null)

    const {
        planets,
        orbitScale,
        planetSize,
        centerPosition,
        setCenterPosition,
    } = useOrbitalStore()

    // Initialize animation
    useOrbitalAnimation()

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
                className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
                style={{ minHeight: '500px' }}
            >
                {/* Star Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Static stars via CSS */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(
                                circle at 50% 50%,
                                rgba(92, 230, 201, 0.03) 0%,
                                transparent 50%
                            )`,
                        }}
                    />

                    {/* Animated stars */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: Math.random() * 2 + 1,
                                height: Math.random() * 2 + 1,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

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
                    {planets.map((planet) => (
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
                    Click on a planet to explore
                </motion.p>
            </div>

            {/* Content Panel (outside SVG for proper z-index) */}
            <ContentPanel />
        </>
    )
}
