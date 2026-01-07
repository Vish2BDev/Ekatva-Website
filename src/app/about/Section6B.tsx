'use client'

/**
 * SECTION 6B: THE VISION (WHERE WE'RE GOING)
 * 
 * Components:
 * - 10-City Expansion Map (Interactive)
 * - Scaling Blueprint (Hub-Spoke Model)
 * - Beyond Fests (Evolution Areas)
 * - The 2030 Dream (Cinematic Quote)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import india from '@svg-maps/india';
import './section6b.css';

// Map viewBox dimensions (from @svg-maps/india) - used for percentage calculations
const MAP_VIEWBOX = { width: 612, height: 696 };

// City Data - Using PROVEN coordinates from cities.ts (viewBox 612x696)
// These coordinates are verified to work correctly in RippleSection
const CITIES = [
    {
        id: 1,
        name: 'Hyderabad',
        state: 'Telangana',
        status: 'completed',
        date: 'Feb 2025',
        students: '230+',
        rating: '4.4/5',
        position: { x: 215, y: 485 },  // PROVEN from cities.ts
        color: '#5CE6C9',
        description: 'The inaugural edition that proved EKATVA works at scale.',
        link: '/editions/hyderabad'
    },
    {
        id: 2,
        name: 'Delhi',
        state: 'Delhi NCR',
        status: 'planned',
        date: 'Q2 2025',
        students: '300+ expected',
        rating: null,
        position: { x: 192, y: 205 },  // PROVEN from cities.ts
        color: '#FFCF96',
        description: "Bringing EKATVA to North India's largest BS community."
    },
    {
        id: 3,
        name: 'Mumbai',
        state: 'Maharashtra',
        status: 'planned',
        date: 'Q3 2025',
        students: '250+ expected',
        rating: null,
        position: { x: 95, y: 430 },   // PROVEN from cities.ts
        color: '#FFCF96',
        description: 'Connecting students across Mumbai and Pune regions.'
    },
    {
        id: 4,
        name: 'Bangalore',
        state: 'Karnataka',
        status: 'planned',
        date: 'Q4 2025',
        students: '280+ expected',
        rating: null,
        position: { x: 175, y: 575 },  // PROVEN from cities.ts
        color: '#FFCF96',
        description: "India's tech capital meets EKATVA's community spirit."
    },
    {
        id: 5,
        name: 'Patna',
        state: 'Bihar',
        status: 'planned',
        date: 'Q2 2025',
        students: '200+ expected',
        rating: null,
        position: { x: 370, y: 290 },  // PROVEN from cities.ts
        color: '#FFCF96',
        description: 'Expanding EKATVA to Eastern India.'
    },
    {
        id: 6,
        name: 'Chennai',
        state: 'Tamil Nadu',
        status: 'future',
        date: '2026',
        students: 'TBD',
        rating: null,
        position: { x: 240, y: 590 },  // Southeast coast, below Bangalore
        color: 'rgba(255, 255, 255, 0.4)',
        description: "Coming home to IIT Madras BS's birthplace."
    },
    {
        id: 7,
        name: 'Kolkata',
        state: 'West Bengal',
        status: 'future',
        date: '2026',
        students: 'TBD',
        rating: null,
        position: { x: 430, y: 350 },  // PROVEN from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Expanding to Eastern India.'
    },
    {
        id: 8,
        name: 'Pune',
        state: 'Maharashtra',
        status: 'future',
        date: '2026',
        students: 'TBD',
        rating: null,
        position: { x: 115, y: 460 },  // South of Mumbai
        color: 'rgba(255, 255, 255, 0.4)',
        description: "Maharashtra's educational hub joins EKATVA."
    },
    {
        id: 9,
        name: 'Ahmedabad',
        state: 'Gujarat',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 85, y: 335 },   // PROVEN from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Western India expansion.'
    },
    {
        id: 10,
        name: 'Jaipur',
        state: 'Rajasthan',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 150, y: 285 },  // PROVEN from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Bringing EKATVA to Rajasthan.'
    },
    {
        id: 11,
        name: 'Nagpur',
        state: 'Maharashtra',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 200, y: 395 },  // PROVEN from cities.ts - Central India
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Central India expansion.'
    }
];


// Blueprint Principles
const BLUEPRINT_PRINCIPLES = [
    {
        icon: '🎯',
        headline: 'Centralized Brand, Decentralized Execution',
        text: 'EKATVA Central owns the vision, brand, standards, and blueprint. City Chapters own execution, logistics, regional decisions, and on-ground leadership. This ensures local relevance without fragmenting identity.'
    },
    {
        icon: '📋',
        headline: 'Blueprint System',
        text: 'Each city follows a centralized EKATVA Blueprint: event structure, activity design philosophy, cultural programming balance, budgeting principles, risk playbooks. Cities adapt contextually, but quality is non-negotiable.'
    },
    {
        icon: '🤝',
        headline: 'Governing Body as Talent Backbone',
        text: 'Need a video editor? GB provides one. Need designers, content strategists, PR leads? GB supports. This creates cross-city collaboration, skill sharing, and quality uplift across regions.'
    }
];

// Evolution Areas
const EVOLUTION_AREAS = [
    {
        icon: <img src="/assets/icons/academic.png" alt="Academic Support" />,
        headline: 'Academic Support & Growth',
        text: 'Study groups, peer learning, knowledge sharing'
    },
    {
        icon: <img src="/assets/icons/career.png" alt="Career Mentorship" />,
        headline: 'Career Exploration & Mentorship',
        text: 'Industry connections, guidance, opportunities'
    },
    {
        icon: <img src="/assets/icons/culture.png" alt="Cultural Platforms" />,
        headline: 'Cultural Expression Platforms',
        text: 'Showcasing talent across cities, building reach'
    },
    {
        icon: <img src="/assets/icons/belonging.png" alt="Emotional Belonging" />,
        headline: 'Emotional Belonging & Community',
        text: 'No student feels alone in their BS journey'
    },
    {
        icon: <img src="/assets/icons/travel.png" alt="Travel Coordination" />,
        headline: 'Travel Coordination (EKATVA Express)',
        text: '80 seats booked together — no one goes alone'
    },
    {
        icon: <img src="/assets/icons/connect.png" alt="Collaborative Projects" />,
        headline: 'Collaborative Projects Across Cities',
        text: 'Inter-city initiatives, shared learning, unity'
    }
];

interface Section6BProps {
    className?: string;
}

export function Section6B({ className = '' }: Section6BProps) {
    const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Default: Hyderabad

    return (
        <section className={`section-6b ${className}`} id="the-vision">
            {/* Section Header */}
            <div className="section-6b-header">
                <motion.h2
                    className="section-6b-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Where We're Going
                </motion.h2>
                <motion.p
                    className="section-6b-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    From one city to ten. From regional fests to a student unity movement.
                </motion.p>
            </div>

            {/* PART A: 10-CITY EXPANSION MAP */}
            <div className="expansion-section">
                <motion.h3
                    className="expansion-headline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    One Movement, Ten Cities, 34,000+ Students
                </motion.h3>
                <motion.p
                    className="expansion-subheadline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Hyderabad was the beginning. Delhi, Mumbai, Bangalore are next.
                    The movement is just getting started.
                </motion.p>

                <div className="map-container">
                    {/* India Map with Overlay Markers (RippleSection approach) */}
                    <motion.div
                        className="india-map"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Base Map SVG - just the map paths */}
                        <div className="map-wrapper">
                            <svg
                                viewBox={india.viewBox}
                                className="india-map-svg"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Render all Indian states from @svg-maps/india */}
                                {india.locations.map((location: { id: string; path: string }) => (
                                    <path
                                        key={location.id}
                                        d={location.path}
                                        fill="rgba(255, 255, 255, 0.06)"
                                        stroke="rgba(255, 255, 255, 0.25)"
                                        strokeWidth="0.5"
                                        strokeLinejoin="round"
                                    />
                                ))}

                                {/* Connection Lines from Hyderabad to planned cities */}
                                {CITIES.slice(1, 5).map((city) => (
                                    <line
                                        key={`line-${city.id}`}
                                        x1={CITIES[0].position.x}
                                        y1={CITIES[0].position.y}
                                        x2={city.position.x}
                                        y2={city.position.y}
                                        stroke="rgba(92, 230, 201, 0.25)"
                                        strokeWidth="1.5"
                                        strokeDasharray="6 4"
                                    />
                                ))}

                                {/* Legend inside SVG */}
                                <g transform="translate(40, 660)">
                                    <circle cx="0" cy="0" r="5" fill="#5CE6C9" />
                                    <text x="12" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Completed</text>

                                    <circle cx="95" cy="0" r="5" fill="#FFCF96" />
                                    <text x="107" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Planned 2025</text>

                                    <circle cx="215" cy="0" r="5" fill="rgba(255, 255, 255, 0.4)" />
                                    <text x="227" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Future</text>
                                </g>
                            </svg>

                            {/* City Markers as Overlay (percentage positioning) */}
                            {CITIES.map((city) => {
                                const leftPercent = (city.position.x / MAP_VIEWBOX.width) * 100;
                                const topPercent = (city.position.y / MAP_VIEWBOX.height) * 100;
                                const isSelected = selectedCity.id === city.id;

                                return (
                                    <div
                                        key={city.id}
                                        className={`city-marker-overlay ${isSelected ? 'active' : ''}`}
                                        style={{
                                            left: `${leftPercent}%`,
                                            top: `${topPercent}%`,
                                        }}
                                        onClick={() => setSelectedCity(city)}
                                    >
                                        {/* Pulse ring */}
                                        {isSelected && (
                                            <div
                                                className="marker-pulse"
                                                style={{ borderColor: city.color }}
                                            />
                                        )}
                                        {/* Main dot */}
                                        <div
                                            className="marker-dot"
                                            style={{
                                                backgroundColor: city.color,
                                                width: isSelected ? '16px' : '12px',
                                                height: isSelected ? '16px' : '12px',
                                                boxShadow: `0 0 12px ${city.color}, 0 0 24px ${city.color}60`
                                            }}
                                        />
                                        {/* City name */}
                                        <span
                                            className="marker-label"
                                            style={{
                                                color: city.color,
                                                opacity: isSelected ? 1 : 0.8,
                                                fontWeight: isSelected ? 600 : 500
                                            }}
                                        >
                                            {city.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* City Details Panel */}
                    <motion.div
                        className="city-details-panel"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="city-header">
                                    <h3 className="city-name">{selectedCity.name}</h3>
                                    <span className="city-state">{selectedCity.state}</span>
                                    <span className={`city-status status-${selectedCity.status}`}>
                                        {selectedCity.status === 'completed' && '✅ Completed'}
                                        {selectedCity.status === 'planned' && '📅 Planned'}
                                        {selectedCity.status === 'future' && '🔮 Future'}
                                    </span>
                                </div>

                                <div className="city-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Date</span>
                                        <span className="stat-value">{selectedCity.date}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Students</span>
                                        <span className="stat-value">{selectedCity.students}</span>
                                    </div>
                                    {selectedCity.rating && (
                                        <div className="stat-item">
                                            <span className="stat-label">Rating</span>
                                            <span className="stat-value">{selectedCity.rating}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="city-description">{selectedCity.description}</p>

                                {selectedCity.link && (
                                    <a href={selectedCity.link} className="city-link">
                                        View Full Story →
                                    </a>
                                )}

                                {/* Expansion Strategy - Integrated */}
                                <div className="expansion-strategy-inline">
                                    <span className="strategy-label">📅 Expansion</span>
                                    <span className="strategy-text">2-3 cities/year • Quality-first • Founder-led for first 5</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* 🆕 BLUEPRINT INTEGRATION - ISSUE #6 FIX */}
                <motion.div
                    className="blueprint-integrated"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="blueprint-divider">
                        <span>Built on 3 Principles</span>
                    </div>

                    <div className="blueprint-cards-compact">
                        {BLUEPRINT_PRINCIPLES.map((principle, index) => (
                            <motion.div
                                key={index}
                                className="blueprint-card-mini"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                            >
                                <span className="principle-icon-sm">{principle.icon}</span>
                                <h5>{principle.headline}</h5>
                                <p>{principle.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* PART C+D: EVOLUTION + 2030 DREAM (UNIFIED) */}
            <section className="evolution-and-dream-unified">
                {/* LEFT: Evolution Areas */}
                <motion.div
                    className="evolution-column"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="evolution-title-compact">EKATVA Is Becoming More</h3>
                    <p className="evolution-intro-compact">
                        Not just regional fests. A broader student unity movement.
                    </p>

                    <div className="evolution-grid-duo">
                        {EVOLUTION_AREAS.map((area, index) => (
                            <motion.div
                                key={index}
                                className="evolution-item-compact"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <span className="evo-icon-mini">{area.icon}</span>
                                <div className="evo-content">
                                    <h4>{area.headline}</h4>
                                    <p>{area.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT: 2030 Dream (Sticky) */}
                <div className="dream-column">
                    <motion.div
                        className="dream-card-elevated"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="dream-label-mini">The 2030 Dream</span>

                        <blockquote className="dream-quote-compact">
                            "I want EKATVA to be a reason someone
                            <strong>chooses IIT Madras BS.</strong>"
                        </blockquote>

                        <cite className="dream-attribution-mini">— SVCAN, Co-Founder</cite>

                        {/* Visual Accent */}
                        <div className="dream-visual-accent" aria-hidden="true">
                            <svg width="80" height="80" viewBox="0 0 80 80">
                                <path
                                    d="M40 0L42 38L80 40L42 42L40 80L38 42L0 40L38 38L40 0Z"
                                    fill="#5CE6C9"
                                    opacity="0.2"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="12"
                                    stroke="#5CE6C9"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>
        </section>
    );
}

export default Section6B;
