'use client'

/**
 * TEAM SECTION - EDITION PAGE
 * 
 * Team credits with:
 * - Organizing committee
 * - Partner societies/sponsors
 * - Volunteer recognition
 * - Join team CTA for upcoming
 */

import { motion } from 'framer-motion'
import type { TeamData, EditionStatus } from '@/types/edition'

interface TeamSectionProps {
    data: TeamData
    status: EditionStatus
    city: string
}

export function TeamSection({ data, status, city }: TeamSectionProps) {
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

    return (
        <section className="team-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {status === 'completed'
                    ? 'The Team Behind the Magic'
                    : 'Meet the Organizing Team'}
            </motion.h2>

            {/* Organizing Committee */}
            {data.organizers.length > 0 && (
                <motion.div
                    className="organizers-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Organizing Committee</h3>
                    <motion.div
                        className="organizers-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {data.organizers.map((organizer, index) => (
                            <motion.div
                                key={index}
                                className="organizer-card"
                                variants={itemVariants}
                            >
                                {organizer.photo ? (
                                    <img
                                        src={organizer.photo}
                                        alt={organizer.name}
                                        className="organizer-photo"
                                    />
                                ) : (
                                    <div
                                        className="organizer-photo"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 40,
                                        }}
                                    >
                                        👤
                                    </div>
                                )}
                                <h4 className="organizer-name">{organizer.name}</h4>
                                <p className="organizer-role">{organizer.role}</p>
                                {organizer.studentBody && (
                                    <span className="organizer-society">{organizer.studentBody}</span>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* Partner Societies */}
            {data.partners.length > 0 && (
                <motion.div
                    className="partners-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>Partner Societies & Sponsors</h3>
                    <div className="partners-grid">
                        {data.partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                className={`partner-logo ${partner.type}`}
                                whileHover={{ scale: 1.05 }}
                                title={partner.name}
                            >
                                <img src={partner.logo} alt={partner.name} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Volunteers - Completed */}
            {status === 'completed' && data.volunteers.count > 0 && (
                <motion.div
                    className="volunteers-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>{data.volunteers.count}+ Volunteers Made It Possible</h3>
                    {data.volunteers.photos && data.volunteers.photos.length > 0 && (
                        <div className="volunteers-photos">
                            {data.volunteers.photos.map((photo, index) => (
                                <img key={index} src={photo} alt="Volunteers" />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {/* Volunteer CTA - Upcoming */}
            {status === 'upcoming' && (
                <motion.div
                    className="volunteers-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>Want to Join the Team?</h3>
                    <p>We&apos;re looking for volunteers to help organize EKATVA {city}.</p>
                    <a href="/volunteer" className="volunteer-cta-btn">
                        Sign Up to Volunteer
                    </a>
                </motion.div>
            )}
        </section>
    )
}

export default TeamSection
