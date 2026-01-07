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

                                    {/* Horizontal Mega Menu - Fixed Position to avoid overlap */}
                                    <AnimatePresence>
                                        {editionsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                                className="fixed left-0 right-0 mt-4 mx-4"
                                                style={{
                                                    top: '100%',
                                                    zIndex: 60,
                                                }}
                                            >
                                                <div
                                                    className="max-w-7xl mx-auto rounded-2xl border border-white/10 overflow-hidden"
                                                    style={{
                                                        background: 'rgba(10, 10, 10, 0.95)',
                                                        backdropFilter: 'blur(24px)',
                                                        WebkitBackdropFilter: 'blur(24px)',
                                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                                                    }}
                                                >
                                                    {/* Mega Menu Header */}
                                                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-white font-serif text-lg">EKATVA Editions</h3>
                                                            <p className="text-white/50 text-sm">10 cities by 2030 — one fest at a time</p>
                                                        </div>
                                                        <Link
                                                            href="/editions"
                                                            className="text-sm text-ekatva-teal hover:underline flex items-center gap-1"
                                                            onClick={() => setEditionsOpen(false)}
                                                        >
                                                            View All →
                                                        </Link>
                                                    </div>

                                                    {/* Horizontal City Cards Grid */}
                                                    <div className="p-4 grid grid-cols-5 gap-3">
                                                        {EDITIONS_NAV.map((edition) => (
                                                            <Link
                                                                key={edition.slug}
                                                                href={`/editions/${edition.slug}`}
                                                                className="group p-4 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-ekatva-teal/30"
                                                                onClick={() => setEditionsOpen(false)}
                                                            >
                                                                {/* Status Badge */}
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${edition.status === 'completed'
                                                                            ? 'bg-ekatva-teal/20 text-ekatva-teal'
                                                                            : edition.status === 'upcoming'
                                                                                ? 'bg-ekatva-gold/20 text-ekatva-gold'
                                                                                : 'bg-white/10 text-white/40'
                                                                        }`}>
                                                                        {edition.status === 'completed' ? '✓ Completed' : edition.status === 'upcoming' ? '🔥 Soon' : 'Planned'}
                                                                    </span>
                                                                </div>

                                                                {/* City Name */}
                                                                <h4 className="text-white font-medium text-lg group-hover:text-ekatva-teal transition-colors">
                                                                    {edition.name}
                                                                </h4>

                                                                {/* Date */}
                                                                <p className="text-white/50 text-sm mt-1">
                                                                    {edition.date}
                                                                </p>
                                                            </Link>
                                                        ))}
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
