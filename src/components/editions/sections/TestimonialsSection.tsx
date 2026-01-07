'use client'

/**
 * TESTIMONIALS SECTION - EDITION PAGE
 * 
 * Student testimonials with:
 * - Quote cards with photos
 * - Attribution (name, society, role)
 * - Fallback to Hyderabad testimonials for upcoming editions
 */

import { motion } from 'framer-motion'
import type { Testimonial, EditionStatus } from '@/types/edition'

// Fallback testimonials from Hyderabad
const HYDERABAD_TESTIMONIALS: Testimonial[] = [
    {
        name: 'Priya Sharma',
        quote: 'EKATVA made me realize I\'m not alone in this journey. Found my study group and lifelong friends here.',
        photo: '/images/editions/hyderabad/testimonial-1.jpg',
        studentBody: 'Pravāha',
        role: 'Attendee'
    },
    {
        name: 'Rahul Menon',
        quote: 'The speed conversations were genius. I made 10 genuine connections in just 30 minutes!',
        photo: '/images/editions/hyderabad/testimonial-2.jpg',
        studentBody: 'Paradox',
        role: 'Attendee'
    },
    {
        name: 'Ananya Reddy',
        quote: 'From nervous introvert to dancing at DJ night - that\'s what EKATVA did to me. No judgment, just vibes.',
        photo: '/images/editions/hyderabad/testimonial-3.jpg',
        studentBody: 'Akord',
        role: 'Volunteer'
    }
]

interface TestimonialsSectionProps {
    data: Testimonial[]
    status: EditionStatus
    city: string
    ctaLink?: string
}

export function TestimonialsSection({ data, status, city, ctaLink }: TestimonialsSectionProps) {
    const testimonials = status === 'completed' && data.length > 0 ? data : HYDERABAD_TESTIMONIALS

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    }

    return (
        <section className="testimonials-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                In Their Own Words
            </motion.h2>

            {status === 'upcoming' && (
                <motion.p
                    className="testimonials-intro"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Here&apos;s what students said about EKATVA Hyderabad.
                    <br />
                    Join us to create similar memories in {city}.
                </motion.p>
            )}

            <motion.div
                className="testimonials-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="testimonial-card"
                        variants={itemVariants}
                    >
                        {testimonial.photo && (
                            <img
                                src={testimonial.photo}
                                alt={testimonial.name}
                                className="testimonial-photo"
                            />
                        )}

                        <blockquote className="testimonial-quote">
                            {testimonial.quote}
                        </blockquote>

                        <cite className="testimonial-attribution">
                            <strong>{testimonial.name}</strong>
                            {testimonial.studentBody && ` • ${testimonial.studentBody}`}
                            {testimonial.role && (
                                <span style={{ display: 'block', marginTop: 4, opacity: 0.7 }}>
                                    {testimonial.role}
                                </span>
                            )}
                        </cite>
                    </motion.div>
                ))}
            </motion.div>

            {status === 'upcoming' && ctaLink && (
                <motion.a
                    href={ctaLink}
                    className="testimonials-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    Be Part of {city} 2025 →
                </motion.a>
            )}
        </section>
    )
}

export default TestimonialsSection
