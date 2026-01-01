'use client'

import { motion } from 'framer-motion'
import OrbitalSystemSelector from './OrbitalSystemSelector'

/**
 * IdentityRevealSection - Main section wrapper
 * 
 * Replaced static 3-card grid with orbital system
 * Shows Socio-Cultural, Techno-Cultural, and Sports
 * as planets orbiting central EKATVA core
 * 
 * Tier 4: Auto-detects WebGL support and renders 3D or 2D version
 */
export default function IdentityRevealSection() {
    return (
        <section
            id="identity-reveal"
            className="relative py-20 md:py-28 lg:py-32 bg-oneness-black overflow-hidden"
            aria-labelledby="identity-title"
        >
            {/* Section Header */}
            <div className="container-custom text-center mb-12 md:mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-2 rounded-full border border-ekatva-teal/30 bg-ekatva-teal/10 text-ekatva-teal text-xs tracking-widest uppercase mb-6"
                >
                    What is EKATVA?
                </motion.span>

                <motion.h2
                    id="identity-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                >
                    One Movement.{' '}
                    <span className="text-unity-gold italic">Three Expressions.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-mid-gray max-w-2xl mx-auto"
                >
                    EKATVA brings together three powerful forces that define the IITM BS student experience.
                </motion.p>
            </div>

            {/* Orbital System - Auto WebGL/SVG */}
            <OrbitalSystemSelector />

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, #050505, transparent)',
                }}
            />
        </section>
    )
}
