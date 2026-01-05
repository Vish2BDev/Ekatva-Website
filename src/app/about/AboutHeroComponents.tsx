'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue, wrap } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ===========================================
// MARQUEE COMPONENT
// ===========================================
interface MarqueeProps {
    children: React.ReactNode
    baseVelocity?: number
    className?: string
}

export function HeroMarquee({ children, baseVelocity = 100, className }: MarqueeProps) {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef<number>(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        // Change direction based on scroll (optional - keeps it dynamic)
        if (velocityFactor.get() < 0) { directionFactor.current = -1 }
        else if (velocityFactor.get() > 0) { directionFactor.current = 1 }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()
        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className={cn("overflow-hidden whitespace-nowrap flex flex-nowrap absolute w-full", className)}>
            <motion.div className="flex flex-nowrap gap-16" style={{ x }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="flex-shrink-0">
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// ===========================================
// CIRCULAR SCROLL INDICATOR
// ===========================================
interface CircularScrollProps {
    onClick?: () => void
    className?: string
}

export function CircularScroll({ onClick, className }: CircularScrollProps) {
    return (
        <motion.div
            className={cn("relative cursor-pointer group z-20", className)}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            whileHover={{ scale: 1.1 }}
        >
            {/* Rotating Text Ring */}
            <motion.div
                className="w-32 h-32 md:w-36 md:h-36"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white/80">
                    <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="11" className="font-mono uppercase tracking-[0.2em]">
                        <textPath xlinkHref="#circlePath">
                            SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            {/* Static Center Arrow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ArrowDown className="w-6 h-6 text-ekatva-teal" />
            </div>
        </motion.div>
    )
}
