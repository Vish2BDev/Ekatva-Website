'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
    { href: '#origin-story', label: 'Our Story' },
    { href: '#identity-reveal', label: 'What is EKATVA' },
    { href: '#ripple', label: 'The Ripple' },
    { href: '#build-with-us', label: 'Join Us' },
]

/**
 * Navbar - Enhanced Navigation (Sprint 2)
 * 
 * Features:
 * - Glass morphism design
 * - Active section tracking via scroll position
 * - Smooth scroll on nav link clicks
 * - Active indicator dot with layoutId animation
 * - Mobile hamburger menu
 */
export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')

    // Show navbar after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.8)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Track active section based on scroll position
    useEffect(() => {
        const sections = ['hero', 'origin-story', 'identity-reveal', 'ripple', 'build-with-us']

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Smooth scroll handler
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const element = document.getElementById(href.substring(1))
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setIsMobileMenuOpen(false)
        }
    }

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
                            background: 'rgba(5, 5, 5, 0.85)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                        }}
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            {/* Logo */}
                            <a
                                href="#hero"
                                onClick={(e) => handleNavClick(e, '#hero')}
                                className="flex items-center gap-3 group"
                            >
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

                            {/* Desktop Nav Links with Active Indicator */}
                            <div className="hidden md:flex items-center gap-8">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href.substring(1)

                                    return (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="relative text-sm uppercase tracking-wider font-medium transition-colors py-2"
                                            style={{
                                                color: isActive ? '#5CE6C9' : 'rgba(255, 255, 255, 0.7)'
                                            }}
                                        >
                                            {link.label}

                                            {/* Active indicator dot */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeSection"
                                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ekatva-teal"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </a>
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
                                        {navLinks.map((link) => {
                                            const isActive = activeSection === link.href.substring(1)

                                            return (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={(e) => handleNavClick(e, link.href)}
                                                    className="uppercase tracking-wider text-sm font-medium py-2 transition-colors flex items-center gap-2"
                                                    style={{
                                                        color: isActive ? '#5CE6C9' : 'rgba(255, 255, 255, 0.7)'
                                                    }}
                                                >
                                                    {isActive && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-ekatva-teal" />
                                                    )}
                                                    {link.label}
                                                </a>
                                            )
                                        })}
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
