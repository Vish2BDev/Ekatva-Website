'use client'

import { motion } from 'framer-motion'

/**
 * MissionText - Animated Mission Statement
 * 
 * Fades in after the ripple wave completes
 * Clean, elegant typography with subtle glow
 */
interface MissionTextProps {
    isVisible: boolean
}

export default function MissionText({ isVisible }: MissionTextProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 1.2,
                delay: 4.5,
                ease: [0.4, 0, 0.2, 1]
            }}
            className="text-center mt-12 md:mt-16 max-w-3xl mx-auto px-4"
        >
            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 4.8 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-ekatva-teal to-transparent mx-auto mb-6"
            />

            {/* Mission statement */}
            <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light italic"
                style={{
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
                }}
            >
                &ldquo;To unite IITM BS students through{' '}
                <span className="text-ekatva-teal font-normal not-italic">
                    shared experiences
                </span>
                {' '}and{' '}
                <span className="text-unity-gold font-normal not-italic">
                    cultural celebration
                </span>
                &rdquo;
            </p>

            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 5 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-unity-gold to-transparent mx-auto mt-6"
            />
        </motion.div>
    )
}
