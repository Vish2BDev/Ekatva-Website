'use client'

/**
 * EDITIONS DROPDOWN - NAVBAR COMPONENT
 * 
 * Features:
 * - Smart display (recent 3-4 editions + "View All" if >6)
 * - Status-based grouping (Completed/Upcoming)
 * - Active state highlighting
 * - Desktop hover + Mobile full-screen
 * - Tomorrowland-inspired design
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { EDITIONS_LIST } from '@/data/editions'
import '@/styles/EditionsDropdown.css'

interface EditionsDropdownProps {
    isOpen: boolean
    onClose: () => void
}

export function EditionsDropdown({ isOpen, onClose }: EditionsDropdownProps) {
    const pathname = usePathname()
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Group editions by status
    const completedEditions = EDITIONS_LIST.filter((e) => e.status === 'completed')
    const upcomingEditions = EDITIONS_LIST.filter((e) => e.status === 'upcoming')

    // Show "View All" if total > 6
    const shouldShowViewAll = EDITIONS_LIST.length > 6

    // Check if current path matches edition
    const isActive = (slug: string) => pathname?.includes(slug)

    // Animation variants
    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    }

    const mobileVariants = {
        hidden: {
            opacity: 0,
            transition: { duration: 0.2 },
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`editions-dropdown ${isMobile ? 'mobile' : 'desktop'}`}
                    variants={isMobile ? mobileVariants : dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Mobile Header */}
                    {isMobile && (
                        <div className="dropdown-header">
                            <span className="dropdown-title">Editions</span>
                            <button
                                className="dropdown-close-btn"
                                onClick={onClose}
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}

                    {/* Completed Editions */}
                    {completedEditions.length > 0 && (
                        <>
                            <div className="dropdown-section-label">Completed</div>
                            {completedEditions.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/editions/${edition.slug}`}
                                    className={`dropdown-item ${isActive(edition.slug) ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <span className="item-icon completed">✅</span>
                                    <span className="item-text">
                                        {edition.city} {edition.year}
                                    </span>
                                </Link>
                            ))}
                        </>
                    )}

                    {/* Upcoming Editions */}
                    {upcomingEditions.length > 0 && (
                        <>
                            <div className="dropdown-section-label">Upcoming</div>
                            {upcomingEditions.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/editions/${edition.slug}`}
                                    className={`dropdown-item ${isActive(edition.slug) ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <span className="item-icon upcoming">📅</span>
                                    <span className="item-text">
                                        {edition.city} {edition.year}
                                    </span>
                                </Link>
                            ))}
                        </>
                    )}

                    {/* Divider */}
                    <div className="dropdown-divider" />

                    {/* View All Editions (conditional) */}
                    {shouldShowViewAll && (
                        <Link
                            href="/editions/all"
                            className="dropdown-item"
                            onClick={onClose}
                        >
                            <span className="item-icon">🌐</span>
                            <span className="item-text">View All Editions</span>
                        </Link>
                    )}

                    {/* Bring EKATVA to Your City */}
                    <Link
                        href="/editions/bring-ekatva-to-your-city"
                        className="dropdown-item dropdown-cta"
                        onClick={onClose}
                    >
                        <span className="item-icon">🎯</span>
                        <span className="item-text">Bring EKATVA to Your City</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default EditionsDropdown
