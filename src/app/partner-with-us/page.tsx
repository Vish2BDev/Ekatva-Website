import type { Metadata } from 'next'
import PartnershipPageContent from './PartnershipPageContent'

export const metadata: Metadata = {
    title: 'Partner with EKATVA | Student Societies & Houses',
    description: 'Join 10+ partner societies building India\'s regional fest movement for IITM BS students. Co-equal governance, 10-city exposure, real community building.',
    openGraph: {
        title: 'Partner with EKATVA',
        description: 'Bring your society into EKATVA - India\'s regional festival movement',
        url: 'https://ekatva.org/partner-with-us',
        siteName: 'EKATVA',
        type: 'website',
    },
}

export default function PartnerWithUsPage() {
    return <PartnershipPageContent />
}
