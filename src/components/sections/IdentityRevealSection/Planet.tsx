'use client'

import { motion } from 'framer-motion'
import { useOrbitalStore, PlanetState } from '@/store/orbitalStore'
import { useTouchHandlers } from '@/hooks/useOrbitalInteraction'
import { useState, useEffect } from 'react'

/**
 * Planet Component - PRODUCTION VERSION
 * 
 * Enhanced features from 10/10 version:
 * ✅ Larger touch zones (44px minimum)
 * ✅ Haptic feedback on mobile
 * ✅ Better ARIA labels
 * ✅ Enhanced visibility
 * ✅ NO debug clutter
 */
interface PlanetProps {
    planet: PlanetState
    centerX: number
    centerY: number
    size: number
}

export default function Planet({ planet, centerX, centerY, size }: PlanetProps) {
    const { hoveredPlanetId, setHoveredPlanet, setActivePlanet } = useOrbitalStore()
    const touchHandlers = useTouchHandlers(planet.id)
    const [isMobile, setIsMobile] = useState(false)

    const isHovered = hoveredPlanetId === planet.id
    const Icon = planet.appearance.icon

    // Calculate viewport position
    const x = centerX + planet.position.x
    const y = centerY + planet.position.y

    // Detect mobile
    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    const handleClick = () => {
        setActivePlanet(planet.id)

        // Haptic feedback on mobile
        if (isMobile && navigator.vibrate) {
            navigator.vibrate(10)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setActivePlanet(planet.id)
        }
    }

    // Touch zone size - larger on mobile (44px minimum for accessibility)
    const touchZoneSize = isMobile ? Math.max(size * 1.5, 44) : size

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => !isMobile && setHoveredPlanet(planet.id)}
            onMouseLeave={() => !isMobile && setHoveredPlanet(null)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...touchHandlers}
            tabIndex={0}
            role="button"
            aria-label={`${planet.name}: ${planet.content.headline}. Press Enter to learn more.`}
            aria-pressed={isHovered}
        >
            {/* Invisible touch zone (larger on mobile) */}
            <circle
                cx={x}
                cy={y}
                r={touchZoneSize / 2}
                fill="transparent"
                style={{ pointerEvents: 'all' }}
            />

            {/* Outer glow - visible on hover */}
            <motion.circle
                cx={x}
                cy={y}
                r={size / 2 + planet.appearance.glowRadius}
                fill={`url(#planetGlow-${planet.id})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.8 : 0.3 }}
                transition={{ duration: isMobile ? 0.2 : 0.3 }}
                style={{ pointerEvents: 'none' }}
            />

            {/* Planet surface */}
            <motion.circle
                cx={x}
                cy={y}
                r={size / 2}
                fill="rgba(5, 5, 5, 0.8)"
                stroke={planet.appearance.baseColor}
                strokeWidth={isHovered ? 3 : 2}
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: isMobile ? 0.15 : 0.2 }}
                style={{
                    transformOrigin: `${x}px ${y}px`,
                    filter: isHovered
                        ? `drop-shadow(0 0 ${isMobile ? 12 : 20}px ${planet.appearance.glowColor})`
                        : 'none',
                    pointerEvents: 'none',
                }}
            />

            {/* Icon via foreignObject */}
            <foreignObject
                x={x - size / 4}
                y={y - size / 4}
                width={size / 2}
                height={size / 2}
                style={{ pointerEvents: 'none' }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {Icon ? (
                        <Icon
                            size={size / 3}
                            color={planet.appearance.baseColor}
                            strokeWidth={1.5}
                        />
                    ) : (
                        // Fallback if icon fails to load
                        <div
                            style={{
                                width: size / 4,
                                height: size / 4,
                                backgroundColor: planet.appearance.baseColor,
                                borderRadius: '50%',
                            }}
                        />
                    )}
                </div>
            </foreignObject>

            {/* Label - visible on hover (desktop) or always (mobile) */}
            <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: isHovered || isMobile ? 1 : 0,
                    y: isHovered || isMobile ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' }}
            >
                {/* Label background */}
                <rect
                    x={x - 60}
                    y={y + size / 2 + (isMobile ? 8 : 10)}
                    width={120}
                    height={isMobile ? 24 : 28}
                    rx={isMobile ? 12 : 14}
                    fill="rgba(5, 5, 5, 0.95)"
                    stroke={planet.appearance.baseColor}
                    strokeWidth={1}
                />

                {/* Label text */}
                <text
                    x={x}
                    y={y + size / 2 + (isMobile ? 22 : 28)}
                    textAnchor="middle"
                    fill={planet.appearance.baseColor}
                    fontSize={isMobile ? '10' : '12'}
                    fontWeight="600"
                    letterSpacing="0.05em"
                >
                    {planet.name}
                </text>
            </motion.g>

            {/* Defs for planet-specific gradient */}
            <defs>
                <radialGradient
                    id={`planetGlow-${planet.id}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                >
                    <stop
                        offset="0%"
                        stopColor={planet.appearance.baseColor}
                        stopOpacity="0.4"
                    />
                    <stop
                        offset="100%"
                        stopColor={planet.appearance.baseColor}
                        stopOpacity="0"
                    />
                </radialGradient>
            </defs>
        </motion.g>
    )
}
