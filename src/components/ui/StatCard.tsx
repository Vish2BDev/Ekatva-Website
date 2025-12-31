'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'
import type { StatCardProps } from '@/types'

/**
 * StatCard - Award-Winning Design (Phase 1)
 * Based on Expert Design Critique
 * 
 * Improvements:
 * - MASSIVE numbers (64px on desktop)
 * - Instrument Serif for numbers (font-serif)
 * - Glass background with gradient
 * - Hover lift effect
 * - Color-coded glow effects
 */
export default function StatCard({
    value,
    label,
    color = 'teal',
    className
}: StatCardProps) {
    const colorClasses = {
        teal: 'text-ekatva-teal',
        gold: 'text-unity-gold',
        white: 'text-white',
    }

    const glowStyles = {
        teal: { textShadow: '0 0 40px rgba(92, 230, 201, 0.4)' },
        gold: { textShadow: '0 0 40px rgba(255, 207, 150, 0.4)' },
        white: { textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' },
    }

    const borderHoverClasses = {
        teal: 'hover:border-ekatva-teal/50',
        gold: 'hover:border-unity-gold/50',
        white: 'hover:border-white/50',
    }

    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className={cn(
                'text-center p-6 md:p-8',
                'rounded-2xl md:rounded-3xl',
                'border border-divider-gray/40',
                borderHoverClasses[color],
                'transition-all duration-300',
                'cursor-default',
                className
            )}
            style={{
                background: `linear-gradient(135deg, 
                    rgba(31, 79, 89, 0.25) 0%, 
                    rgba(14, 47, 54, 0.3) 100%
                )`,
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Number - Responsive to prevent overflow */}
            <p
                className={cn(
                    'font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 whitespace-nowrap',
                    colorClasses[color]
                )}
                style={glowStyles[color]}
            >
                {value}
            </p>

            {/* Label - More contrast */}
            <p className="text-xs md:text-sm text-light-gray uppercase tracking-[0.15em] font-semibold">
                {label}
            </p>
        </motion.div>
    )
}
