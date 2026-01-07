'use client'

/**
 * FAQ SECTION
 * 
 * Premium FAQ accordion inspired by Flowfest but adapted to EKATVA's
 * dark glassmorphic aesthetic. Features:
 * - Split-layout with event image (left) + FAQ list (right)
 * - Multi-expand capability (not traditional accordion)
 * - Smooth CSS grid animations
 * - Full keyboard accessibility
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import './faq.css'

// FAQ Data - Curated questions addressing common concerns
const FAQ_DATA = [
    {
        id: 1,
        question: "What exactly happens at an EKATVA fest?",
        answer: "EKATVA is a full-day experience designed for connection. You'll participate in speed conversations (10 new connections in 30 minutes!), team activities, cultural performances, open mic sessions, and a DJ night finale. Everything is designed to help you find your people in the IITM BS community."
    },
    {
        id: 2,
        question: "Is EKATVA only for extroverts?",
        answer: "Absolutely not! EKATVA is built for everyone. Our activities are designed with introverts in mind — structured ice-breakers remove awkward small talk, team activities give you a role, and there's zero pressure to perform. Many of our most enthusiastic attendees started as nervous first-timers."
    },
    {
        id: 3,
        question: "How much does it cost to attend?",
        answer: "EKATVA is heavily subsidized to ensure cost is never a barrier. Registration typically covers your full-day experience including meals, activities, and transport (where available). Exact pricing varies by city — check your specific edition page for details."
    },
    {
        id: 4,
        question: "Will there be transport provided?",
        answer: "Yes! We arrange bus routes from key pickup points across the city. In Hyderabad, we transported 171 students across 3 routes. Transport is included in your registration, so you can focus on the experience, not logistics."
    },
    {
        id: 5,
        question: "I don't know anyone — will I feel left out?",
        answer: "This is exactly why EKATVA exists. Most attendees come solo! Our Speed Conversations activity guarantees you'll meet 10+ people in your first hour. By lunch, strangers become friends. By DJ night, those friends are dancing together. You're never alone at EKATVA."
    },
    {
        id: 6,
        question: "How is EKATVA different from college fests?",
        answer: "Traditional fests are spectator events — you watch performances and leave. EKATVA flips this: you're an active participant from minute one. There are no elimination games (everyone plays), no hierarchies (seniors and juniors mix freely), and the goal isn't competition — it's connection."
    },
    {
        id: 7,
        question: "Can I bring friends who aren't IITM BS students?",
        answer: "EKATVA is exclusively for IIT Madras BS students — that's what makes it special. The shared context of our unique program creates instant common ground. However, if you have friends in IITM BS, absolutely bring them! Group registrations are encouraged."
    },
    {
        id: 8,
        question: "How do I stay connected after the fest?",
        answer: "EKATVA creates the spark; community groups keep it alive. After each edition, attendees join city-specific WhatsApp communities, study groups form, and local meetups continue. Many friendships from Hyderabad 2025 are still going strong — and we're just getting started."
    }
]

// Individual FAQ Item Component
interface FAQItemProps {
    question: string
    answer: string
    id: number
    index: number
}

function FAQItem({ question, answer, id, index }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            className={`faq-item ${isOpen ? 'is-open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <button
                className="faq-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <h3 className="faq-question">{question}</h3>
                <span className="faq-icon" aria-hidden="true">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
            <div
                className="faq-answer-wrapper"
                id={`faq-answer-${id}`}
                role="region"
                aria-labelledby={`faq-question-${id}`}
            >
                <div className="faq-answer">
                    <p>{answer}</p>
                </div>
            </div>
        </motion.div>
    )
}

// Main FAQ Section Component
export function FAQSection() {
    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">
                {/* Left: Visual Element */}
                <motion.div
                    className="faq-visual"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="faq-image-wrapper">
                        <Image
                            src="/images/about/hero-group.jpg"
                            alt="EKATVA community moments - students connecting and celebrating"
                            fill
                            className="faq-image"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="faq-image-overlay" />
                    </div>

                    {/* Stats Badge */}
                    <div className="faq-stats-badge">
                        <span className="stats-number">230+</span>
                        <span className="stats-label">Questions Answered<br />at Hyderabad</span>
                    </div>
                </motion.div>

                {/* Right: FAQ Content */}
                <div className="faq-content">
                    <motion.div
                        className="faq-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="faq-label">Got Questions?</span>
                        <h2 className="faq-title">
                            We've Got <span className="highlight">Answers</span>
                        </h2>
                        <p className="faq-subtitle">
                            Everything you need to know before your first EKATVA experience.
                        </p>
                    </motion.div>

                    <div className="faq-list">
                        {FAQ_DATA.map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                id={faq.id}
                                question={faq.question}
                                answer={faq.answer}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQSection
