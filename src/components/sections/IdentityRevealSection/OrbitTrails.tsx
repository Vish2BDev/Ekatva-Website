'use client'

import { motion } from 'framer-motion'
import { useOrbitalStore, PlanetState } from '@/store/orbitalStore'

// Constant to prevent array recreation every frame
const DASH_ANIMATION = [0, 16]

/**
 * OrbitTrails - PRODUCTION VERSION
 * 
 * Clean, polished orbital paths with maximum visibility
 * No debug clutter, just beautiful orbits
 */
interface OrbitTrailsProps {
    planets: PlanetState[]
    centerX: number
    centerY: number
    scale: number
}

export default function OrbitTrails({ planets, centerX, centerY, scale }: OrbitTrailsProps) {
    const { hoveredPlanetId } = useOrbitalStore()

    return (
        <g>
            {planets.map((planet) => {
                const isHovered = hoveredPlanetId === planet.id
                const scaledRadius = planet.orbital.radius * scale

                // Calculate ellipse axes
                const rx = scaledRadius * (1 + planet.orbital.eccentricity * 0.5)
                const ry = scaledRadius * (1 - planet.orbital.eccentricity * 0.3)

                return (
                    <g key={planet.id}>
                        {/* Outer glow layer - subtle atmosphere */}
                        <motion.ellipse
                            cx={centerX}
                            cy={centerY}
                            rx={rx + 6}
                            ry={ry + 6}
                            fill="none"
                            stroke={planet.appearance.baseColor}
                            strokeWidth={6}
                            opacity={isHovered ? 0.2 : 0.08}
                            style={{
                                filter: 'blur(8px)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Main orbit trail - BRIGHT and CLEAR */}
                        <motion.ellipse
                            cx={centerX}
                            cy={centerY}
                            rx={rx}
                            ry={ry}
                            fill="none"
                            stroke={isHovered ? planet.appearance.baseColor : 'rgba(255, 255, 255, 0.6)'}
                            strokeWidth={isHovered ? 4 : 3}
                            strokeDasharray={isHovered ? '0' : '10 5'}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                strokeDashoffset: isHovered ? 0 : DASH_ANIMATION,
                            }}
                            transition={{
                                opacity: { duration: 0.5 },
                                strokeDashoffset: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                },
                            }}
                            style={{
                                filter: isHovered
                                    ? `drop-shadow(0 0 10px ${planet.appearance.glowColor})`
                                    : 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Inner highlight - adds depth */}
                        <motion.ellipse
                            cx={centerX}
                            cy={centerY}
                            rx={rx - 1.5}
                            ry={ry - 1.5}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth={1}
                            opacity={isHovered ? 0.5 : 0.2}
                            style={{ pointerEvents: 'none' }}
                        />
                    </g>
                )
            })}
        </g>
    )
}
