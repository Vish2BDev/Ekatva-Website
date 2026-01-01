'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * ParticleField - Floating particles for space atmosphere
 * 
 * HYDRATION FIX:
 * - Particles generated client-side only (after mount)
 * - Prevents server/client mismatch from Math.random()
 * - Uses seeded random for consistent particle positions
 */
interface ParticleFieldProps {
    count?: number
}

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

// Seeded random number generator for consistent results
function seededRandom(seed: number): () => number {
    return function () {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
    }
}

export default function ParticleField({ count = 50 }: ParticleFieldProps) {
    const [particles, setParticles] = useState<Particle[]>([])
    const [mounted, setMounted] = useState(false)

    // Generate particles only on client-side after mount
    useEffect(() => {
        setMounted(true)

        // Use a fixed seed for consistent particle positions across page loads
        const random = seededRandom(12345)

        const generatedParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: random() * 100,
            y: random() * 100,
            size: random() * 2 + 1,
            duration: random() * 3 + 2,
            delay: random() * 3,
        }))

        setParticles(generatedParticles)
    }, [count])

    // Don't render particles until mounted (prevents hydration mismatch)
    if (!mounted) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Nebula glow effect - static, no hydration issues */}
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
