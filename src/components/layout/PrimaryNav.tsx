'use client'

/**
 * PrimaryNav - Page-Level Navigation (Dark Glass Layer)
 * 
 * Features:
 * - Dark glass morphism design
 * - Logo with hover effects
 * - Page navigation links
 * - Editions dropdown integration
 * - Active page indicator
 * - CTA button
 */

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { PRIMARY_NAV, EDITIONS_NAV, isNavActive } from './navigation-config'

interface PrimaryNavProps {
    onMobileMenuToggle: () => void
    isMobileMenuOpen: boolean
}

export default function PrimaryNav({ onMobileMenuToggle, isMobileMenuOpen }: PrimaryNavProps) {
    const pathname = usePathname()
    const [editionsOpen, setEditionsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setEditionsOpen(false)
            }
        }
        if (editionsOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [editionsOpen])

    return (
        <nav
            className="px-6 py-4 rounded-2xl border border-white/10"
            style={{
                background: 'rgba(5, 5, 5, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-ekatva-teal/30 group-hover:border-ekatva-teal transition-colors">
                        <Image
                            src="/assets/images/Ekatva Logo.png"
                            alt="EKATVA"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-serif text-xl text-white group-hover:text-ekatva-teal transition-colors hidden sm:block">
                        EKATVA
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {PRIMARY_NAV.map((item) => {
                        const isActive = isNavActive(item.href, pathname ?? '/')

                        // Editions Dropdown (Horizontal Mega Menu)
                        if (item.type === 'dropdown') {
                            return (
                                <div
                                    key={item.href}
                                    ref={dropdownRef}
                                    className="relative"
                                    onMouseEnter={() => setEditionsOpen(true)}
                                    onMouseLeave={() => setEditionsOpen(false)}
                                >
                                    <button
                                        className="relative px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 rounded-lg hover:bg-white/5"
                                        style={{
                                            color: isActive ? '#5CE6C9' : 'rgba(255, 255, 255, 0.7)'
                                        }}
                                        onClick={() => setEditionsOpen(!editionsOpen)}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-200 ${editionsOpen ? 'rotate-180' : ''}`}
                                        />
                                        {isActive && (
                                            <motion.div
                                                layoutId="activePage"
                                                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ekatva-teal"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </button>

                                    {/* World-Class Premium Editions Mega Menu */}
                                    <AnimatePresence>
                                        {editionsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="fixed left-0 right-0 flex justify-center"
                                                style={{
                                                    top: '108px', // Tweaked for perfect gap spacing
                                                    zIndex: 100,
                                                }}
                                            >
                                                <div className="relative max-w-6xl w-full mx-4">
                                                    {/* VISUAL ANCHOR SYSTEM */}

                                                    {/* 1. The Beam: Full-width top gradient line to separate from Secondary Nav */}
                                                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-ekatva-teal/50 to-transparent shadow-[0_0_15px_rgba(92,230,201,0.3)]" />

                                                    {/* 2. The Keystone: Center thick anchor passing through */}
                                                    <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-32 h-[3px] bg-ekatva-teal rounded-full shadow-[0_0_20px_rgba(92,230,201,0.6)] z-20" />

                                                    {/* Main Container - Glass & Spotlight */}
                                                    <div
                                                        className="relative rounded-2xl overflow-hidden"
                                                        style={{
                                                            background: 'linear-gradient(180deg, rgba(18, 18, 18, 0.98) 0%, rgba(8, 8, 8, 0.99) 100%)', // Deep moody dark
                                                            backdropFilter: 'blur(40px)',
                                                            WebkitBackdropFilter: 'blur(40px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                                            boxShadow: `
                                                                0 20px 50px -10px rgba(0, 0, 0, 0.8),
                                                                inset 0 1px 0 rgba(255, 255, 255, 0.1)
                                                            `,
                                                        }}
                                                    >
                                                        {/* Spotlight Effect Top Center */}
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-ekatva-teal/5 blur-[80px] rounded-full pointer-events-none" />

                                                        {/* Decorative Tech Corners */}
                                                        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
                                                        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20" />
                                                        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20" />
                                                        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20" />

                                                        <div className="relative px-8 py-8">
                                                            {/* Header Row */}
                                                            <div className="flex items-end justify-between mb-8">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-1 h-12 bg-gradient-to-b from-ekatva-teal to-transparent rounded-full" />
                                                                    <div>
                                                                        <h3 className="text-white font-serif text-3xl tracking-wide leading-none">Editions</h3>
                                                                        <p className="text-white/40 text-sm mt-1.5 font-light tracking-wide">10 cities by 2030 — one fest at a time</p>
                                                                    </div>
                                                                </div>
                                                                <Link
                                                                    href="/editions"
                                                                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                                                                    onClick={() => setEditionsOpen(false)}
                                                                >
                                                                    <span className="text-ekatva-teal text-xs font-bold uppercase tracking-widest">View All</span>
                                                                    <span className="text-ekatva-teal group-hover:translate-x-1 transition-transform">→</span>
                                                                </Link>
                                                            </div>

                                                            {/* Cards Grid - Visual Hierarchy */}
                                                            <div className="grid grid-cols-4 gap-6">
                                                                {/* Featured: Hyderabad */}
                                                                <Link
                                                                    href="/editions/hyderabad-2025"
                                                                    className="group relative p-6 rounded-xl border border-ekatva-teal/20 transition-all duration-300 overflow-hidden"
                                                                    onClick={() => setEditionsOpen(false)}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.borderColor = 'rgba(92, 230, 201, 0.6)'
                                                                        e.currentTarget.style.background = 'rgba(92, 230, 201, 0.03)'
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.borderColor = 'rgba(92, 230, 201, 0.2)'
                                                                        e.currentTarget.style.background = 'transparent'
                                                                    }}
                                                                >
                                                                    {/* Card Glow */}
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-ekatva-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                                    <div className="relative z-10">
                                                                        <div className="flex items-start justify-between mb-4">
                                                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-ekatva-teal text-oneness-black">
                                                                                Completed
                                                                            </span>
                                                                            <span className="text-ekatva-teal opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                                                                ↗
                                                                            </span>
                                                                        </div>
                                                                        <h4 className="text-white font-serif text-2xl group-hover:text-ekatva-teal transition-colors">Hyderabad</h4>
                                                                        <div className="flex items-center gap-2 mt-2 text-white/50 text-sm">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-ekatva-teal/50" />
                                                                            Feb 2025
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                                {/* Upcoming: Delhi */}
                                                                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                                                                    <div className="flex items-start justify-between mb-4">
                                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-ekatva-gold/20 text-ekatva-gold border border-ekatva-gold/30">
                                                                            Coming Soon
                                                                        </span>
                                                                    </div>
                                                                    <h4 className="text-white/80 font-serif text-2xl">Delhi</h4>
                                                                    <div className="flex items-center gap-2 mt-2 text-white/40 text-sm">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-ekatva-gold/50" />
                                                                        Q2 2025
                                                                    </div>
                                                                </div>

                                                                {/* Planned: Bangalore */}
                                                                <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                                                                    <div className="flex items-start justify-between mb-4">
                                                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 text-white/40">
                                                                            Planned
                                                                        </span>
                                                                    </div>
                                                                    <h4 className="text-white/40 font-serif text-2xl">Bangalore</h4>
                                                                    <div className="flex items-center gap-2 mt-2 text-white/30 text-sm">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                                        Q4 2025
                                                                    </div>
                                                                </div>

                                                                {/* CTA Card */}
                                                                <Link
                                                                    href="/editions/bring-ekatva-to-your-city"
                                                                    className="group relative p-6 rounded-xl border border-dashed border-white/20 hover:border-ekatva-gold/60 transition-all bg-white/[0.01] hover:bg-ekatva-gold/5 flex flex-col justify-end"
                                                                    onClick={() => setEditionsOpen(false)}
                                                                >
                                                                    <div className="mb-auto">
                                                                        <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform origin-left">🎯</span>
                                                                    </div>
                                                                    <h4 className="text-white font-medium text-lg group-hover:text-ekatva-gold transition-colors leading-tight">
                                                                        Bring EKATVA to Your City
                                                                    </h4>
                                                                    <p className="text-white/40 text-xs uppercase tracking-wider mt-2 group-hover:text-ekatva-gold/70">Host a regional fest</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        }

                        // Regular Links
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative px-4 py-2 text-sm uppercase tracking-wider font-medium transition-colors rounded-lg hover:bg-white/5"
                                style={{
                                    color: isActive ? '#5CE6C9' : 'rgba(255, 255, 255, 0.7)'
                                }}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activePage"
                                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ekatva-teal"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <a
                    href="https://www.instagram.com/ekatva_iitm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex px-6 py-2.5 bg-ekatva-teal rounded-full text-oneness-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(92,230,201,0.5)] transition-all"
                >
                    Follow Us
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white hover:text-ekatva-teal transition-colors"
                    onClick={onMobileMenuToggle}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    )
}
