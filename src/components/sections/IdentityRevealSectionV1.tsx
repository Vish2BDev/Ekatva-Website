'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Sparkles, Users } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { PillarCard } from '@/components/ui'

const pillars = [
    {
        icon: Calendar,
        title: 'Regional Fests',
        description: 'Bringing campus culture to your city. No long journeys, no barriers—just pure celebration.',
    },
    {
        icon: Sparkles,
        title: 'Cultural Movement',
        description: "More than an event, it's a movement. Preserving traditions while embracing innovation.",
    },
    {
        icon: Users,
        title: 'Community Building',
        description: 'Transforming digital classmates into lifelong friends through shared experiences.',
    },
]

/**
 * Identity Reveal Section - Section 3
 * 
 * Features:
 * - Etymology visual (EKATVA = एकत्व = Oneness)
 * - Three pillars of EKATVA
 * - Pure white background (contrast with dark sections)
 * - Scroll-triggered stagger animations
 */
export default function IdentityRevealSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            id="identity-reveal"
            ref={sectionRef}
            className="min-h-screen bg-white py-20 md:py-32 lg:py-40"
            aria-labelledby="identity-reveal-title"
        >
            <div className="container-custom">
                {/* Etymology Visual */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="text-center mb-20 md:mb-28"
                >
                    {/* Pre-headline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-sm md:text-base text-mid-gray uppercase tracking-[0.25em] mb-8 font-semibold"
                    >
                        What is EKATVA?
                    </motion.p>

                    {/* EKATVA in English - Massive with glow */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        id="identity-reveal-title"
                        className="text-6xl md:text-7xl lg:text-8xl font-bold text-ekatva-teal mb-6"
                        style={{
                            textShadow: '0 0 60px rgba(92, 230, 201, 0.35)',
                        }}
                    >
                        EKATVA
                    </motion.h2>

                    {/* Devanagari script */}
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-near-black mb-6"
                    >
                        एकत्व
                    </motion.p>

                    {/* English translation */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-light-gray font-light tracking-wide"
                    >
                        Oneness
                    </motion.p>

                    {/* Connecting gradient line */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={isInView ? { height: 64, opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="w-1 bg-gradient-to-b from-ekatva-teal to-transparent mx-auto mt-10"
                    />
                </motion.div>

                {/* Three Pillars Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
                >
                    {pillars.map((pillar, index) => (
                        <PillarCard key={index} {...pillar} index={index} />
                    ))}
                </motion.div>

                {/* Transition text to next section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-20 md:mt-28 text-center"
                >
                    <p className="text-mid-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        These three pillars form the foundation of EKATVA—a movement that&apos;s
                        redefining what it means to be part of the IITM BS community.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
