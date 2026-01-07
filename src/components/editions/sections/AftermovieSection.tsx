'use client'

/**
 * AFTERMOVIE SECTION - EDITION PAGE
 * 
 * Full aftermovie section (different from hero):
 * - Full video with controls
 * - Title and description
 * - Behind-the-scenes photos
 * - Teaser for upcoming editions
 */

import { motion } from 'framer-motion'
import { Download, Play } from 'lucide-react'
import type { AftermovieData, EditionStatus } from '@/types/edition'

interface AftermovieSectionProps {
    data: AftermovieData
    status: EditionStatus
    city: string
    videoPoster?: string
}

export function AftermovieSection({ data, status, city, videoPoster }: AftermovieSectionProps) {
    // Completed edition with aftermovie
    if (status === 'completed' && data.videoUrl) {
        return (
            <section className="aftermovie-section">
                <motion.h2
                    className="section-headline"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {data.title || 'Relive the Magic'}
                </motion.h2>

                <motion.p
                    className="section-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {data.description}
                </motion.p>

                <motion.div
                    className="aftermovie-player"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <video
                        controls
                        poster={videoPoster}
                        className="aftermovie-video"
                        preload="metadata"
                    >
                        <source src={data.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="aftermovie-meta">
                        {data.duration && (
                            <span className="aftermovie-duration">⏱ {data.duration}</span>
                        )}
                        {data.downloadLink && (
                            <a href={data.downloadLink} className="aftermovie-download" download>
                                <Download size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                Download
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Behind the Scenes */}
                {data.behindTheScenes && data.behindTheScenes.length > 0 && (
                    <motion.div
                        className="bts-section"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3>Behind the Scenes</h3>
                        <div className="bts-grid">
                            {data.behindTheScenes.map((item, index) => (
                                <div key={index} className="bts-item">
                                    <img src={item.photo} alt={item.caption} />
                                    <p>{item.caption}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>
        )
    }

    // Upcoming edition - teaser
    return (
        <section className="aftermovie-section">
            <motion.h2
                className="section-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Your City&apos;s Story Starts Here
            </motion.h2>

            <motion.p
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                Every EKATVA edition gets its own aftermovie. Here&apos;s what Hyderabad looked like:
            </motion.p>

            <motion.div
                className="aftermovie-teaser"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                {/* Placeholder video player */}
                <div
                    style={{
                        width: '100%',
                        aspectRatio: '16 / 9',
                        background: 'linear-gradient(135deg, rgba(92, 230, 201, 0.1) 0%, rgba(255, 207, 150, 0.1) 100%)',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                        }}
                    >
                        <div
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'rgba(92, 230, 201, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                border: '2px solid #5CE6C9',
                            }}
                        >
                            <Play size={32} color="#5CE6C9" />
                        </div>
                        <p style={{ opacity: 0.7, fontSize: 14 }}>
                            Watch EKATVA Hyderabad 2025 Aftermovie
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.p
                className="aftermovie-promise"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                In a few months, this section will showcase {city}&apos;s unforgettable moments.
            </motion.p>
        </section>
    )
}

export default AftermovieSection
