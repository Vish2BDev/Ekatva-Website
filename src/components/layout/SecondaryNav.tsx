'use client'

/**
 * SecondaryNav - Section-Level Navigation (Light Pill Layer)
 * 
 * Tomorrowland-inspired design:
 * - Light/white pill container
 * - Page identifier on the left
 * - Section links with scroll-spy active tracking
 * - Smooth scroll on click
 */

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { getSecondaryNav, getPageLabel, hasSecondaryNav, SectionLink } from './navigation-config'

export default function SecondaryNav() {
    const pathname = usePathname()
    const [activeSection, setActiveSection] = useState<string>('')
    const [isVisible, setIsVisible] = useState(true)

    const sections = getSecondaryNav(pathname ?? '/')
    const pageLabel = getPageLabel(pathname ?? '/')
    const showNav = hasSecondaryNav(pathname ?? '/')

    // Scroll spy - track active section
    useEffect(() => {
        if (!showNav || sections.length === 0) return

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                const targetId = section.target.replace('#', '')
                const element = document.getElementById(targetId)

                if (element) {
                    const { offsetTop } = element
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(section.target)
                        break
                    }
                }
            }
        }

        // Initial check
        handleScroll()

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections, showNav])

    // Smooth scroll handler
    const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault()
        const targetId = target.replace('#', '')
        const element = document.getElementById(targetId)

        if (element) {
            // Offset for the navigation height
            const navHeight = 140 // Approximate height of both navbars
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - navHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    if (!showNav || sections.length === 0) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex justify-center px-4"
        >
            <nav
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full"
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }}
                role="navigation"
                aria-label="Page sections"
            >
                {/* Page Label */}
                <span
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-oneness-black/70 border-r border-black/10 whitespace-nowrap"
                >
                    {pageLabel}
                </span>

                {/* Section Links */}
                <div className="flex items-center gap-0.5 px-1">
                    {sections.map((section) => {
                        const isActive = activeSection === section.target

                        return (
                            <a
                                key={section.target}
                                href={section.target}
                                onClick={(e) => handleSectionClick(e, section.target)}
                                className={`relative px-3 py-2 text-xs font-medium transition-all duration-200 rounded-full whitespace-nowrap ${isActive
                                        ? 'text-oneness-black'
                                        : 'text-oneness-black/60 hover:text-oneness-black hover:bg-black/5'
                                    }`}
                            >
                                {section.label}

                                {/* Active Background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-ekatva-teal/20 rounded-full -z-10"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        )
                    })}
                </div>
            </nav>
        </motion.div>
    )
}
