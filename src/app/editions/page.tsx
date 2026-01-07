import { redirect } from 'next/navigation'
import { getLatestCompletedEditionSlug } from '@/data/editions'

/**
 * /editions route
 * Redirects to the latest completed edition
 */
export default function EditionsIndex() {
    const latestSlug = getLatestCompletedEditionSlug()
    redirect(`/editions/${latestSlug}`)
}
