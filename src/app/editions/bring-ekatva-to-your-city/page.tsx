import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Target, Users, MapPin, Calendar } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Bring EKATVA to Your City | EKATVA',
    description: 'Want to organize EKATVA in your city? Submit your proposal and help us expand the EKATVA movement across India.',
}

/**
 * Bring EKATVA to Your City - CTA Page
 * /editions/bring-ekatva-to-your-city
 */
export default function BringEkatvaPage() {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#050505',
                color: '#FFFFFF',
                padding: '120px 20px 80px',
            }}
        >
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Back Link */}
                <Link
                    href="/editions/hyderabad-2025"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        marginBottom: 40,
                        fontSize: 14,
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Editions
                </Link>

                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <Target size={64} color="#FFCF96" style={{ marginBottom: 24 }} />
                    <h1
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            marginBottom: 16,
                            lineHeight: 1.2,
                        }}
                    >
                        Bring EKATVA to Your City
                    </h1>
                    <p
                        style={{
                            fontSize: 18,
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: 1.7,
                            maxWidth: 600,
                            margin: '0 auto',
                        }}
                    >
                        Want to organize EKATVA in your city? We&apos;ll help you make it happen.
                        Submit your proposal and join the movement.
                    </p>
                </div>

                {/* Coming Soon Notice */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, rgba(92, 230, 201, 0.1) 0%, rgba(255, 207, 150, 0.1) 100%)',
                        border: '1px solid rgba(92, 230, 201, 0.3)',
                        borderRadius: 20,
                        padding: 48,
                        textAlign: 'center',
                        marginBottom: 60,
                    }}
                >
                    <h2
                        style={{
                            fontSize: 28,
                            fontWeight: 600,
                            color: '#5CE6C9',
                            marginBottom: 16,
                        }}
                    >
                        🚀 Proposal Form Coming Soon
                    </h2>
                    <p
                        style={{
                            fontSize: 16,
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: 32,
                            lineHeight: 1.7,
                        }}
                    >
                        We&apos;re building a streamlined proposal system. In the meantime,
                        reach out to us directly.
                    </p>
                    <a
                        href="mailto:ekatva@iitm.ac.in?subject=Bring%20EKATVA%20to%20My%20City"
                        style={{
                            display: 'inline-block',
                            padding: '16px 40px',
                            background: '#5CE6C9',
                            color: '#050505',
                            fontSize: 16,
                            fontWeight: 600,
                            borderRadius: 8,
                            textDecoration: 'none',
                        }}
                    >
                        Email Us Your Proposal
                    </a>
                </div>

                {/* What We Need */}
                <div style={{ marginBottom: 60 }}>
                    <h3
                        style={{
                            fontSize: 24,
                            fontWeight: 600,
                            marginBottom: 32,
                            textAlign: 'center',
                        }}
                    >
                        What We&apos;ll Need From You
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 24,
                        }}
                    >
                        {[
                            {
                                icon: Users,
                                title: 'Your Team',
                                description: 'Do you have an organizing team? Which departments can you lead?',
                            },
                            {
                                icon: MapPin,
                                title: 'City Details',
                                description: 'Estimated attendance, venue ideas, and available resources.',
                            },
                            {
                                icon: Calendar,
                                title: 'Timeline',
                                description: 'Preferred month/quarter and how soon you can start planning.',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: 16,
                                    padding: 32,
                                    textAlign: 'center',
                                }}
                            >
                                <item.icon
                                    size={32}
                                    color="#5CE6C9"
                                    style={{ marginBottom: 16 }}
                                />
                                <h4
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 600,
                                        marginBottom: 12,
                                    }}
                                >
                                    {item.title}
                                </h4>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: 40,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <p
                        style={{
                            fontSize: 14,
                            color: 'rgba(255, 255, 255, 0.6)',
                        }}
                    >
                        Questions? Follow us on{' '}
                        <a
                            href="https://www.instagram.com/ekatva_iitm/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#5CE6C9' }}
                        >
                            Instagram
                        </a>{' '}
                        or email{' '}
                        <a
                            href="mailto:ekatva@iitm.ac.in"
                            style={{ color: '#5CE6C9' }}
                        >
                            ekatva@iitm.ac.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
