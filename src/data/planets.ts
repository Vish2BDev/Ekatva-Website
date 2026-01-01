import { Music, Cpu, Trophy, LucideIcon } from 'lucide-react'

/**
 * Planet configuration for the orbital system
 * Each planet represents a pillar of EKATVA
 */
export interface PlanetConfig {
    id: string
    name: string
    devanagari: string
    orbital: {
        radius: number
        angle: number // Initial angle in radians
        speed: number // Radians per second
        eccentricity: number // 0 = circle, 0.3 = ellipse
    }
    appearance: {
        baseColor: string
        glowColor: string
        size: number
        glowRadius: number
        icon: LucideIcon
    }
    content: {
        headline: string
        description: string
        activities: string[]
        stats: { value: string; label: string }[]
    }
}

export const PLANET_CONFIGS: PlanetConfig[] = [
    {
        id: 'socio-cultural',
        name: 'Socio-Cultural',
        devanagari: 'सामाजिक-सांस्कृतिक',
        orbital: {
            radius: 280,
            angle: 0,
            speed: 0.15,
            eccentricity: 0.2,
        },
        appearance: {
            baseColor: '#5CE6C9',
            glowColor: 'rgba(92, 230, 201, 0.4)',
            size: 100,
            glowRadius: 30,
            icon: Music,
        },
        content: {
            headline: 'Where Culture Comes Alive',
            description:
                'Music, dance, drama, and art that celebrate the diverse heritage of India. From classical performances to contemporary expressions.',
            activities: ['Live Music', 'Dance Performances', 'Drama', 'Art Exhibition', 'Fashion Show'],
            stats: [
                { value: '12+', label: 'Events' },
                { value: '200+', label: 'Performers' },
                { value: '5', label: 'Stages' },
            ],
        },
    },
    {
        id: 'techno-cultural',
        name: 'Techno-Cultural',
        devanagari: 'तकनीकी-सांस्कृतिक',
        orbital: {
            radius: 320,
            angle: (2 * Math.PI) / 3, // 120 degrees
            speed: 0.12,
            eccentricity: 0.25,
        },
        appearance: {
            baseColor: '#FFCF96',
            glowColor: 'rgba(255, 207, 150, 0.4)',
            size: 100,
            glowRadius: 30,
            icon: Cpu,
        },
        content: {
            headline: 'Innovation Meets Creativity',
            description:
                'Hackathons, coding battles, robotics, and tech showcases that push the boundaries of what IITM BS students can create.',
            activities: ['Hackathon', 'Coding Battle', 'Robotics', 'AI/ML Contest', 'Tech Talks'],
            stats: [
                { value: '8+', label: 'Competitions' },
                { value: '50+', label: 'Projects' },
                { value: '₹2L+', label: 'Prizes' },
            ],
        },
    },
    {
        id: 'sports',
        name: 'Sports',
        devanagari: 'खेल',
        orbital: {
            radius: 260,
            angle: (4 * Math.PI) / 3, // 240 degrees
            speed: 0.18,
            eccentricity: 0.15,
        },
        appearance: {
            baseColor: '#FF6B6B',
            glowColor: 'rgba(255, 107, 107, 0.4)',
            size: 100,
            glowRadius: 30,
            icon: Trophy,
        },
        content: {
            headline: 'Champions Rise Here',
            description:
                'Cricket, football, basketball, and more. Compete, cheer, and celebrate the spirit of sportsmanship with fellow students.',
            activities: ['Cricket', 'Football', 'Basketball', 'Badminton', 'Chess'],
            stats: [
                { value: '6+', label: 'Sports' },
                { value: '100+', label: 'Athletes' },
                { value: '20+', label: 'Matches' },
            ],
        },
    },
]

// Helper to get planet by ID
export const getPlanetById = (id: string): PlanetConfig | undefined =>
    PLANET_CONFIGS.find((p) => p.id === id)
