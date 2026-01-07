'use client'

/**
 * TAKEAWAYS SECTION - EDITION PAGE
 * 
 * Key learnings and insights:
 * - What worked well
 * - Challenges overcome
 * - Key metrics
 * - Expectations for upcoming
 */

import { motion } from 'framer-motion'
import type { TakeawaysData, EditionStatus } from '@/types/edition'

interface TakeawaysSectionProps {
    data: TakeawaysData
    status: EditionStatus
    city: string
}

// Default expectations for upcoming editions
const EXPECTATIONS = [
    {
        icon: '🤝',
        title: 'Real Connections',
        description: 'Speed conversations ensure you meet 10+ new people in the first hour.',
    },
    {
        icon: '🎯',
        title: 'Inclusive Activities',
        description: 'No talent barriers, no eliminations — just pure fun.',
    },
    {
        icon: '🎭',
        title: 'Cultural Pride',
        description: 'Performances that celebrate our diversity and unity.',
    },
    {
        icon: '🚌',
        title: 'Free Everything',
        description: 'Transport, food, memories — all covered by EKATVA.',
    },
]

export function TakeawaysSection({ data, status, city }: TakeawaysSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    }

    // Completed edition with real takeaways
    if (status === 'completed' && data.sections.length > 0) {
        return (
            <section className="takeaways-section">
                <motion.h2
                    className="section-headline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {data.headline || 'What We Learned'}
                </motion.h2>

                <motion.div
                    className="takeaways-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {data.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="takeaway-block"
                            variants={itemVariants}
                        >
                            <h3 className="takeaway-title">{section.title}</h3>
                            <ul className="takeaway-list">
                                {section.points.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Key Metrics */}
                {data.metrics && data.metrics.length > 0 && (
                    <motion.div
                        className="takeaway-metrics"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>Key Metrics</h3>
                        <div className="metrics-grid">
                            {data.metrics.map((metric, index) => (
                                <div key={index} className="metric-card">
                                    <div className="metric-label">{metric.label}</div>
                                    <div className="metric-value">{metric.value}</div>
                                    <p className="metric-insight">{metric.insight}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>
        )
    }

    // Upcoming edition - expectations
    return (
        <section className="takeaways-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                What to Expect at EKATVA {city}
            </motion.h2>

            <motion.p
                className="takeaways-intro"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                Based on Hyderabad&apos;s success, here&apos;s what makes EKATVA special:
            </motion.p>

            <motion.div
                className="expectations-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {EXPECTATIONS.map((item, index) => (
                    <motion.div
                        key={index}
                        className="expectation-card"
                        variants={itemVariants}
                    >
                        <span className="expectation-icon">{item.icon}</span>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default TakeawaysSection
