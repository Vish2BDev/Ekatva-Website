'use client'

import { motion } from 'framer-motion'
import { useOrbitalStore, PlanetState } from '@/store/orbitalStore'

/**
 * OrbitTrails - Elliptical orbit paths for planets
 * 
 * Features:
 * - Dashed stroke when not hovered
 * - Solid + colored when planet is hovered
 * - Animated dash offset for subtle movement
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
                    <motion.ellipse
                        key={planet.id}
                        cx={centerX}
                        cy={centerY}
                        rx={rx}
                        ry={ry}
                        fill="none"
                        stroke={isHovered ? planet.appearance.baseColor : 'rgba(255, 255, 255, 0.1)'}
                        strokeWidth={isHovered ? 2 : 1}
                        strokeDasharray={isHovered ? '0' : '8 8'}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            strokeDashoffset: isHovered ? 0 : [0, 16],
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
                                ? `drop-shadow(0 0 8px ${planet.appearance.glowColor})`
                                : 'none',
                        }}
                    />
                )
            })}
        </g>
    )
}
