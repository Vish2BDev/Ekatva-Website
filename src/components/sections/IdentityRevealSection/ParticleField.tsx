'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * ParticleField - Floating particles for space atmosphere
 * 
 * 50 white particles with random positions and pulsing animations
 * Optimized with useMemo to prevent re-renders
 */
interface ParticleFieldProps {
    count?: number
}

export default function ParticleField({ count = 50 }: ParticleFieldProps) {
    // Generate particles only once
    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 3,
        }))
    }, [count])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Nebula glow effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 40% 30% at 30% 40%, rgba(92, 230, 201, 0.05) 0%, transparent 70%),
                        radial-gradient(ellipse 30% 40% at 70% 60%, rgba(255, 207, 150, 0.04) 0%, transparent 70%),
                        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 107, 107, 0.03) 0%, transparent 60%)
                    `,
                }}
            />
        </div>
    )
}
