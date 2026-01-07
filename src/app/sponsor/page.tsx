'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, Bell } from 'lucide-react'

/**
 * Sponsor Page - Coming Soon Placeholder
 * 
 * This page will eventually contain:
 * - Sponsorship tiers and benefits
 * - Success stories from past sponsors
 * - ROI metrics and audience demographics
 * - Contact form for sponsorship inquiries
 */

export default function SponsorPage() {
    return (
        <main className="min-h-screen bg-oneness-black flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(92, 230, 201, 0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 207, 150, 0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            {/* Back Link */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-white/70 hover:text-ekatva-teal transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Home</span>
            </Link>

            {/* Main Content */}
            <motion.div
                className="text-center max-w-2xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Icon */}
                <motion.div
                    className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-ekatva-teal/20 to-ekatva-gold/20 flex items-center justify-center border border-white/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Clock size={36} className="text-ekatva-teal" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Sponsor <span className="text-ekatva-gold">EKATVA</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Connect your brand with <strong className="text-white">34,000+ IITM BS students</strong> across India.
                    Our sponsorship portal is launching soon.
                </motion.p>

                {/* Coming Soon Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <span className="w-2 h-2 rounded-full bg-ekatva-teal animate-pulse" />
                    <span className="text-sm font-medium text-white/80">Coming Soon</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link
                        href="/partner-with-us"
                        className="px-8 py-3.5 bg-ekatva-teal text-oneness-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(92,230,201,0.4)] transition-all"
                    >
                        Partner With Us Instead
                    </Link>
                    <a
                        href="mailto:sponsor@ekatva.in"
                        className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <Bell size={16} />
                        Notify Me
                    </a>
                </motion.div>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                {[
                    { value: '34,000+', label: 'Students' },
                    { value: '10', label: 'Cities' },
                    { value: '4.4/5', label: 'Avg Rating' },
                    { value: '100%', label: 'Engagement' },
                ].map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-ekatva-teal">{stat.value}</div>
                        <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </main>
    )
}
