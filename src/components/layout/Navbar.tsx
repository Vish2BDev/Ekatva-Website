'use client'

/**
 * Navbar - Dual-Layer Navigation System Orchestrator
 * 
 * Tomorrowland-inspired navigation with:
 * - Primary Nav (Dark): Page-level navigation
 * - Secondary Nav (Light Pill): Section-level navigation
 * - Mobile Nav: Combined hamburger menu
 * 
 * Behavior:
 * - Appears after scrolling 80% of viewport (lets Hero dominate)
 * - Always visible on non-home pages
 * - Secondary nav shows only on pages with sections
 */

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PrimaryNav from './PrimaryNav'
import SecondaryNav from './SecondaryNav'
import MobileNav from './MobileNav'
import { hasSecondaryNav } from './navigation-config'

export default function Navbar() {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Pages that show nav immediately (not scroll-triggered)
    const isHomePage = pathname === '/'
    const showSecondary = hasSecondaryNav(pathname ?? '/')

    // Scroll-triggered visibility
    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                // On homepage, show after scrolling 80% of first viewport
                setIsVisible(window.scrollY > window.innerHeight * 0.8)
            } else {
                // On other pages, show immediately
                setIsVisible(true)
            }
        }

        // Initial check
        handleScroll()

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.header
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="fixed top-0 left-0 right-0 z-50"
                    >
                        {/* Primary Navigation (Dark Glass) */}
                        <div className="mx-4 mt-4">
                            <PrimaryNav
                                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                isMobileMenuOpen={isMobileMenuOpen}
                            />
                        </div>

                        {/* Secondary Navigation (Light Pill) - Desktop Only */}
                        {showSecondary && (
                            <div className="hidden md:block mt-3">
                                <SecondaryNav />
                            </div>
                        )}
                    </motion.header>
                )}
            </AnimatePresence>

            {/* Mobile Navigation Menu */}
            <MobileNav
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    )
}
