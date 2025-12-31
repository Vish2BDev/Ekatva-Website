'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
    { href: '#origin-story', label: 'Our Story' },
    { href: '#moments', label: 'Gallery' },
    { href: '#community', label: 'Community' },
]

/**
 * Navbar - Glass morphism header
 * 
 * Features:
 * - Appears after scrolling past hero
 * - Glass blur effect
 * - Smooth slide-in animation
 * - Mobile hamburger menu
 */
export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar after scrolling 80% of viewport height
            setIsVisible(window.scrollY > window.innerHeight * 0.8)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <nav
                        className="mx-4 mt-4 px-6 py-4 rounded-2xl border border-white/10"
                        style={{
                            background: 'rgba(5, 5, 5, 0.8)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            {/* Logo */}
                            <a href="#hero" className="flex items-center gap-3 group">
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
                            </a>

                            {/* Desktop Nav Links */}
                            <div className="hidden md:flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-ekatva-teal transition-colors uppercase tracking-wider font-medium"
                                    >
                                        {link.label}
                                    </a>
                                ))}
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
                                className="md:hidden p-2 text-white"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden overflow-hidden"
                                >
                                    <div className="pt-6 pb-2 flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                className="text-white/70 hover:text-ekatva-teal transition-colors uppercase tracking-wider text-sm font-medium py-2"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                        <a
                                            href="https://www.instagram.com/ekatva_iitm/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-ekatva-teal rounded-full text-oneness-black font-bold text-sm uppercase tracking-wider text-center mt-2"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Follow Us
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    )
}
