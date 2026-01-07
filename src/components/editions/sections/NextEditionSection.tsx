'use client'

/**
 * NEXT EDITION SECTION - EDITION PAGE
 * 
 * Next edition CTA with:
 * - Preview of next city
 * - CTA to explore
 * - Generic "Bring EKATVA" fallback
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Target } from 'lucide-react'
import type { NextEditionData } from '@/types/edition'

interface NextEditionSectionProps {
    data: NextEditionData
    currentCity: string
}

export function NextEditionSection({ data, currentCity }: NextEditionSectionProps) {
    return (
        <section className="next-edition-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                The Journey Continues
            </motion.h2>

            {data.city ? (
                <motion.div
                    className="next-edition-card"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Next up: EKATVA {data.city}</h3>
                    {data.date && <p className="next-date">{data.date}</p>}
                    <Link href={data.ctaLink} className="next-cta">
                        {data.ctaText || 'Explore Next Edition'}
                        <ArrowRight
                            size={18}
                            style={{ marginLeft: 8, verticalAlign: 'middle' }}
                        />
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    className="generic-cta-card"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Target size={48} color="#FFCF96" style={{ marginBottom: 24 }} />
                    <h3>Want EKATVA in Your City?</h3>
                    <p>
                        We&apos;re expanding to 10 cities across India.
                        <br />
                        Your city could be next.
                    </p>
                    <Link href={data.ctaLink} className="generic-cta">
                        {data.ctaText || 'Bring EKATVA to Your City'}
                        <ArrowRight
                            size={18}
                            style={{ marginLeft: 8, verticalAlign: 'middle' }}
                        />
                    </Link>
                </motion.div>
            )}
        </section>
    )
}

export default NextEditionSection
