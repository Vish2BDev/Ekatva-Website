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

// City Data - EXACT coordinates from @/data/cities.ts (viewBox 612x696)
const CITIES = [
    {
        id: 1,
        name: 'Hyderabad',
        state: 'Telangana',
        status: 'completed',
        date: 'Feb 2025',
        students: '230+',
        rating: '4.4/5',
        position: { x: 215, y: 485 },  // Exact from cities.ts
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
        position: { x: 192, y: 205 },  // Exact from cities.ts
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
        position: { x: 95, y: 430 },   // Exact from cities.ts
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
        position: { x: 175, y: 575 },  // Exact from cities.ts
        color: '#FFCF96',
        description: "India's tech capital meets EKATVA's community spirit."
    },
    {
        id: 5,
        name: 'Chennai',
        state: 'Tamil Nadu',
        status: 'future',
        date: '2026',
        students: 'TBD',
        rating: null,
        position: { x: 250, y: 600 },  // South-east coast (estimated)
        color: 'rgba(255, 255, 255, 0.4)',
        description: "Coming home to IIT Madras BS's birthplace."
    },
    {
        id: 6,
        name: 'Kolkata',
        state: 'West Bengal',
        status: 'future',
        date: '2026',
        students: 'TBD',
        rating: null,
        position: { x: 430, y: 350 },  // Exact from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Expanding to Eastern India.'
    },
    {
        id: 7,
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
        id: 8,
        name: 'Ahmedabad',
        state: 'Gujarat',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 85, y: 335 },   // Exact from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Western India expansion.'
    },
    {
        id: 9,
        name: 'Jaipur',
        state: 'Rajasthan',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 150, y: 285 },  // Exact from cities.ts
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'Bringing EKATVA to Rajasthan.'
    },
    {
        id: 10,
        name: 'Lucknow',
        state: 'Uttar Pradesh',
        status: 'future',
        date: '2027',
        students: 'TBD',
        rating: null,
        position: { x: 290, y: 265 },  // North-central (east of Delhi)
        color: 'rgba(255, 255, 255, 0.4)',
        description: 'North India expansion continues.'
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
                    {/* India Map SVG */}
                    <motion.div
                        className="india-map"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <IndiaMapSVG cities={CITIES} selectedCity={selectedCity} onCityClick={setSelectedCity} />
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
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                <p className="expansion-timeline">
                    <strong>Expansion Strategy:</strong> 2-3 cities per year. Opportunity-driven, quality-first.
                    Founder involvement for first 5 cities.
                </p>
            </div>

            {/* PART B: SCALING BLUEPRINT */}
            <div className="blueprint-section">
                <motion.h3
                    className="blueprint-headline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    One Vision, Many Cities: The Hub-Spoke Model
                </motion.h3>

                <div className="blueprint-principles">
                    {BLUEPRINT_PRINCIPLES.map((principle, index) => (
                        <motion.div
                            key={index}
                            className="principle-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="principle-icon">{principle.icon}</div>
                            <h4 className="principle-headline">{principle.headline}</h4>
                            <p className="principle-text">{principle.text}</p>
                        </motion.div>
                    ))}
                </div>
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

// India Map SVG Component using @svg-maps/india
function IndiaMapSVG({
    cities,
    selectedCity,
    onCityClick
}: {
    cities: typeof CITIES;
    selectedCity: typeof CITIES[0];
    onCityClick: (city: typeof CITIES[0]) => void;
}) {
    return (
        <svg
            viewBox={india.viewBox}
            className="india-map-svg"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Render all Indian states from @svg-maps/india */}
            {india.locations.map((location) => (
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
            {cities.slice(1, 4).map((city) => (
                <line
                    key={`line-${city.id}`}
                    x1={cities[0].position.x}
                    y1={cities[0].position.y}
                    x2={city.position.x}
                    y2={city.position.y}
                    stroke="rgba(92, 230, 201, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                />
            ))}

            {/* City Markers */}
            {cities.map((city) => (
                <g
                    key={city.id}
                    className={`city-marker ${selectedCity.id === city.id ? 'active' : ''}`}
                    data-status={city.status}
                    onClick={() => onCityClick(city)}
                    style={{ cursor: 'pointer' }}
                >
                    {/* Pulse rings for selected city */}
                    {selectedCity.id === city.id && (
                        <>
                            <circle
                                cx={city.position.x}
                                cy={city.position.y}
                                r={22}
                                fill="none"
                                stroke={city.color}
                                strokeWidth="1"
                                opacity="0.2"
                            />
                            <circle
                                cx={city.position.x}
                                cy={city.position.y}
                                r={16}
                                fill="none"
                                stroke={city.color}
                                strokeWidth="1.5"
                                opacity="0.4"
                            />
                        </>
                    )}

                    {/* Main Marker */}
                    <circle
                        cx={city.position.x}
                        cy={city.position.y}
                        r={selectedCity.id === city.id ? 10 : 7}
                        fill={city.color}
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth={selectedCity.id === city.id ? 2.5 : 1.5}
                    />

                    {/* City Name Label */}
                    <text
                        x={city.position.x}
                        y={city.position.y - 16}
                        textAnchor="middle"
                        fill={selectedCity.id === city.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'}
                        fontSize={selectedCity.id === city.id ? '13' : '11'}
                        fontWeight={selectedCity.id === city.id ? '600' : '500'}
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                    >
                        {city.name}
                    </text>
                </g>
            ))}

            {/* Legend */}
            <g transform="translate(40, 660)">
                <circle cx="0" cy="0" r="5" fill="#5CE6C9" />
                <text x="12" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Completed</text>

                <circle cx="95" cy="0" r="5" fill="#FFCF96" />
                <text x="107" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Planned 2025</text>

                <circle cx="205" cy="0" r="5" fill="rgba(255, 255, 255, 0.4)" />
                <text x="217" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="11">Future</text>
            </g>
        </svg>
    );
}

export default Section6B;
