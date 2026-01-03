'use client'

import { motion } from 'framer-motion'
import OrbitalSystem from './OrbitalSystem'
import CorePhilosophies from './CorePhilosophies'

/**
 * IdentityRevealSection - "Dual Core" Asymmetric Split Layout
 * 
 * Premium 7:5 split-screen design:
 * - Left (7 cols): Interactive Orbital System (WebGL-only)
 * - Right (5 cols): "Atomic Truths" Accordion
 * 
 * Risk Mitigations:
 * - Cut-off prevention: ResizeObserver + dynamic viewBox
 * - Squished prevention: min-h-[500px] + fixed grid spans
 * - Mobile UX: Text-first stacking for narrative flow
 */
export default function IdentityRevealSection() {
    return (
        <section
            id="identity-reveal"
            className="relative py-16 md:py-20 lg:py-28 bg-oneness-black overflow-hidden"
            aria-labelledby="identity-title"
        >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(92, 230, 201, 0.15) 0%, transparent 70%)'
                    }}
                />
            </div>

            {/* Main Container */}
            <div className="container-custom relative z-10">
                {/* 7:5 Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT: Orbital Visual (7 cols) - shows second on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7 order-2 lg:order-1"
                    >
                        {/* Orbital Visual Container with Frame */}
                        <div
                            className="relative min-h-[450px] md:min-h-[500px] lg:min-h-[580px] rounded-2xl overflow-hidden"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)'
                            }}
                        >
                            {/* Grid Pattern Overlay */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
                                preserveAspectRatio="none"
                            >
                                <defs>
                                    <pattern
                                        id="orbital-grid"
                                        width="40"
                                        height="40"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 40 0 L 0 0 0 40"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="0.5"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#orbital-grid)" />
                            </svg>

                            {/* Ambient Glow behind Core */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full blur-[80px]"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, transparent 70%)'
                                    }}
                                />
                            </div>

                            {/* Orbital System */}
                            <OrbitalSystem />
                        </div>
                    </motion.div>

                    {/* RIGHT: Atomic Truths Content (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 order-1 lg:order-2"
                    >
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ekatva-teal/30 bg-ekatva-teal/10 mb-6">
                            <div className="w-2 h-2 rounded-full bg-ekatva-teal animate-pulse" />
                            <span className="text-ekatva-teal text-xs tracking-widest uppercase">
                                The Core
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            id="identity-title"
                            className="font-serif text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white mb-4"
                        >
                            Atomic{' '}
                            <span className="text-unity-gold italic block">Truths.</span>
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-mid-gray mb-8 max-w-md">
                            Ekatva is not defined by its events, but by the fundamental forces that bind our community together.
                        </p>

                        {/* Core Philosophies Accordion */}
                        <CorePhilosophies />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
