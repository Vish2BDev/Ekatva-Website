'use client'

import { motion } from 'framer-motion'
import { cities, STATUS_COLORS } from '@/data/cities'

/**
 * CityLegend - Interactive City List Component
 * 
 * Features:
 * - Displays all 9 cities with status indicators
 * - Hover syncs with map marker highlight
 * - Click navigates/opens interest form
 */
interface CityLegendProps {
    isAnimating: boolean
    hoveredCity: string | null
    onHover: (cityId: string | null) => void
    onClick: (cityId: string) => void
    isMobile: boolean
}

export default function CityLegend({
    isAnimating,
    hoveredCity,
    onHover,
    onClick,
    isMobile
}: CityLegendProps) {
    const completedCities = cities.filter(c => c.status === 'completed')
    const confirmedCities = cities.filter(c => c.status === 'confirmed')
    const exploringCities = cities.filter(c => c.status === 'exploring')

    const statusGroups = [
        { label: 'Completed', cities: completedCities, color: STATUS_COLORS.completed },
        { label: 'Confirmed', cities: confirmedCities, color: STATUS_COLORS.confirmed },
        { label: 'Exploring', cities: exploringCities, color: STATUS_COLORS.exploring }
    ]

    // Mobile: Horizontal scrolling pills
    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimating ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="w-full overflow-x-auto hide-scrollbar"
            >
                <div className="flex gap-2 pb-2 px-1 min-w-max">
                    {cities.map((city) => (
                        <button
                            key={city.id}
                            onClick={() => onClick(city.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
                            style={{
                                backgroundColor: hoveredCity === city.id
                                    ? 'rgba(255, 255, 255, 0.15)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${hoveredCity === city.id ? STATUS_COLORS[city.status] : 'rgba(255,255,255,0.1)'}`
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{
                                    backgroundColor: STATUS_COLORS[city.status],
                                    boxShadow: `0 0 8px ${STATUS_COLORS[city.status]}80`
                                }}
                            />
                            <span className="text-xs text-white/80 whitespace-nowrap">
                                {city.name}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        )
    }

    // Desktop: Grouped vertical list
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isAnimating ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-4"
        >
            {statusGroups.map((group) => (
                <div key={group.label} className="space-y-1.5">
                    <h4
                        className="text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: group.color }}
                    >
                        {group.label}
                    </h4>
                    <div className="space-y-1">
                        {group.cities.map((city) => (
                            <motion.button
                                key={city.id}
                                onMouseEnter={() => onHover(city.id)}
                                onMouseLeave={() => onHover(null)}
                                onClick={() => onClick(city.id)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200"
                                style={{
                                    backgroundColor: hoveredCity === city.id
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'transparent'
                                }}
                                whileHover={{ x: 4 }}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{
                                        backgroundColor: group.color,
                                        boxShadow: hoveredCity === city.id
                                            ? `0 0 12px ${group.color}`
                                            : `0 0 6px ${group.color}60`
                                    }}
                                />
                                <span
                                    className="text-sm transition-colors duration-200"
                                    style={{
                                        color: hoveredCity === city.id ? '#fff' : 'rgba(255,255,255,0.7)'
                                    }}
                                >
                                    {city.name}
                                </span>
                                {city.status === 'completed' && city.studentCount && (
                                    <span className="ml-auto text-xs text-white/40">
                                        {city.studentCount}+ students
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    )
}
