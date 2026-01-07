import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EditionPage } from '@/components/editions'
import { getEditionBySlug, EDITIONS_DATA } from '@/data/editions'

interface EditionPageProps {
    params: Promise<{ slug: string }>
}

/**
 * Generate static params for all known editions
 */
export async function generateStaticParams() {
    return Object.keys(EDITIONS_DATA).map((slug) => ({
        slug,
    }))
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
    const { slug } = await params
    const edition = getEditionBySlug(slug)

    if (!edition) {
        return {
            title: 'Edition Not Found | EKATVA',
        }
    }

    return {
        title: edition.seo.metaTitle,
        description: edition.seo.metaDescription,
        keywords: edition.seo.keywords,
        openGraph: {
            title: edition.seo.metaTitle,
            description: edition.seo.metaDescription,
            images: [edition.seo.ogImage],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: edition.seo.metaTitle,
            description: edition.seo.metaDescription,
            images: [edition.seo.ogImage],
        },
    }
}

/**
 * Dynamic Edition Page
 * /editions/[slug]
 */
export default async function EditionSlugPage({ params }: EditionPageProps) {
    const { slug } = await params
    const edition = getEditionBySlug(slug)

    if (!edition) {
        notFound()
    }

    return <EditionPage edition={edition} />
}
