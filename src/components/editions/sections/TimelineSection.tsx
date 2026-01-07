'use client'

/**
 * TIMELINE SECTION - EDITION PAGE
 * 
 * Hour-by-hour event timeline with:
 * - Vertical timeline connector
 * - Time markers
 * - Event descriptions and photos
 * - Highlight markers for key moments
 */

import { motion } from 'framer-motion'
import type { TimelineEvent, EditionStatus } from '@/types/edition'

interface TimelineSectionProps {
    data: TimelineEvent[]
    status: EditionStatus
    city: string
}

export function TimelineSection({ data, status, city }: TimelineSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    }

    return (
        <section className="timeline-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {status === 'completed' ? 'How the Day Unfolded' : "What's Planned"}
            </motion.h2>

            <motion.div
                className="timeline"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {data.map((event, index) => (
                    <motion.div
                        key={index}
                        className={`timeline-item ${event.highlight ? 'highlight' : ''}`}
                        variants={itemVariants}
                    >
                        <div className="timeline-time">{event.time}</div>
                        <h3 className="timeline-title">{event.title}</h3>
                        <p className="timeline-description">{event.description}</p>
                        {event.photo && (
                            <img
                                src={event.photo}
                                alt={event.title}
                                className="timeline-photo"
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {status === 'upcoming' && (
                <motion.p
                    className="timeline-note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    *Schedule subject to change. Final timeline will be shared 1 week before the event.
                </motion.p>
            )}
        </section>
    )
}

export default TimelineSection
