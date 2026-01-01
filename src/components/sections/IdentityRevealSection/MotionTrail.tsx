'use client'

import { PlanetState } from '@/store/orbitalStore'

/**
 * MotionTrail - Renders position history as fading trail
 * 
 * Shows last 20 positions as circles with decreasing opacity
 * More prominent when planet is hovered
 */
interface MotionTrailProps {
    planet: PlanetState
    centerX: number
    centerY: number
    isHovered: boolean
}

export default function MotionTrail({ planet, centerX, centerY, isHovered }: MotionTrailProps) {
    const { positionHistory, appearance } = planet

    // Don't render if no history
    if (!positionHistory || positionHistory.length < 2) return null

    return (
        <g>
            {positionHistory.slice(1).map((pos, index) => {
                // Calculate opacity (newer = more opaque)
                const baseOpacity = isHovered ? 0.6 : 0.3
                const opacity = baseOpacity * (1 - index / positionHistory.length)

                // Calculate size (newer = larger)
                const size = Math.max(2, 8 * (1 - index / positionHistory.length))

                return (
                    <circle
                        key={index}
                        cx={centerX + pos.x}
                        cy={centerY + pos.y}
                        r={size}
                        fill={appearance.baseColor}
                        opacity={opacity}
                        style={{
                            filter: isHovered ? `blur(1px)` : 'none',
                        }}
                    />
                )
            })}
        </g>
    )
}
