import type { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
    title: 'About EKATVA | Our Story & Philosophy',
    description: 'EKATVA (एकत्व) means Oneness. A movement uniting 34,000+ IITM BS students across India — one city, one fest, one community at a time. Discover our story, philosophy, and vision for 2030.',
    keywords: ['EKATVA', 'IITM BS', 'student community', 'oneness', 'regional fests', 'student movement'],
    openGraph: {
        title: 'About EKATVA | The Movement for Oneness',
        description: 'A movement uniting 34,000+ IITM BS students across India. Learn about our philosophy, journey, and vision.',
        type: 'website',
        url: '/about',
        images: [
            {
                url: '/og/about-ekatva.jpg',
                width: 1200,
                height: 630,
                alt: 'EKATVA - Oneness'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About EKATVA',
        description: 'A movement uniting 34,000+ IITM BS students across India.',
    }
}

export default function AboutPage() {
    return <AboutPageContent />
}
