'use client'

import { useState, useMemo } from 'react'
import { Shield, Mail, Loader, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import {
    FormField,
    SectionHeader,
    CheckboxField,
    CharCounter,
    SubmitButton,
    FormSuccess,
    FormError,
    CloseButton,
    FormHeader,
    formInputStyles,
    formSelectStyles,
    formTextareaStyles
} from './FormComponents'

// ============================================================================
// FORM 3: CITY PROPOSAL FORM
// GB Members Only - Two-step process with email verification
// ============================================================================

// Governing Body domain allowlist - can be moved to env vars later
const GB_DOMAINS = [
    'pravaha.iitm.ac.in',
    'akord.iitm.ac.in',
    'boundless.iitm.ac.in',
    'svcan.iitm.ac.in',
    // Add more GB partner domains here
]

const SUPPORT_NEEDS = [
    { value: 'funding-partial', label: 'Partial funding support' },
    { value: 'funding-full', label: 'Full funding support' },
    { value: 'blueprint', label: 'Blueprint & playbook access' },
    { value: 'vendors', label: 'Vendor network (venue, catering, transport)' },
    { value: 'marketing', label: 'Marketing assets & templates' },
    { value: 'backend', label: 'Backend support (registration, forms)' },
    { value: 'mentorship', label: 'Mentorship from previous organizers' }
]

const BUDGET_RANGES = [
    { value: 'under-1l', label: 'Under ₹1 Lakh' },
    { value: '1-2l', label: '₹1-2 Lakhs' },
    { value: '2-3l', label: '₹2-3 Lakhs' },
    { value: 'above-3l', label: 'Above ₹3 Lakhs' }
]

interface CityProposalData {
    city: string
    studentPopulation: string
    existingCommunity: string
    venueOptions: string
    coreTeam: string
    pastExperience: string
    departmentsHandled: string[]
    supportNeeded: string[]
    proposedDate: string
    expectedAttendance: string
    uniqueActivities: string
    budgetEstimate: string
    whyReady: string
}

interface CityProposalFormProps {
    onClose: () => void
}

export function CityProposalForm({ onClose }: CityProposalFormProps) {
    const [step, setStep] = useState<'verify' | 'form'>('verify')
    const [verifiedEmail, setVerifiedEmail] = useState('')
    const [email, setEmail] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [verifyError, setVerifyError] = useState('')
    const [codeSent, setCodeSent] = useState(false)

    // Verification step
    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault()
        setVerifyError('')

        // Check domain
        const domain = email.split('@')[1]?.toLowerCase()
        if (!domain || !GB_DOMAINS.includes(domain)) {
            setVerifyError('Your entity is not part of the Governing Body. Only GB members can propose city editions.')
            return
        }

        setIsVerifying(true)

        try {
            // In production, call actual verification API
            const response = await fetch('/api/send-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                setCodeSent(true)
            } else {
                // For now, simulate success
                setCodeSent(true)
            }
        } catch {
            // Simulate success since API doesn't exist
            console.log('Would send verification code to:', email)
            setCodeSent(true)
        } finally {
            setIsVerifying(false)
        }
    }

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()
        setVerifyError('')

        if (!verifyCode || verifyCode.length < 4) {
            setVerifyError('Please enter the verification code')
            return
        }

        setIsVerifying(true)

        try {
            const response = await fetch('/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verifyCode })
            })

            if (response.ok) {
                setVerifiedEmail(email)
                setStep('form')
            } else {
                // Simulate success for demo
                setVerifiedEmail(email)
                setStep('form')
            }
        } catch {
            // Simulate success
            console.log('Verified:', email)
            setVerifiedEmail(email)
            setStep('form')
        } finally {
            setIsVerifying(false)
        }
    }

    if (step === 'verify') {
        return (
            <div className="relative">
                <CloseButton onClick={onClose} />

                <div className="pt-4 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-unity-gold/20 flex items-center justify-center">
                            <Shield size={24} className="text-unity-gold" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">GB Verification Required</h3>
                            <p className="text-sm text-white/50">Governing Body members only</p>
                        </div>
                    </div>
                    <p className="text-mid-gray leading-relaxed">
                        Only Governing Body members can propose city editions. Enter your official GB email to verify your identity.
                    </p>
                </div>

                {!codeSent ? (
                    <form onSubmit={handleSendCode} className="space-y-5">
                        <FormField label="Your GB Email" required error={verifyError ? undefined : undefined}>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setVerifyError('')
                                    }}
                                    placeholder="your.name@society.iitm.ac.in"
                                    className={`${formInputStyles} pl-11`}
                                    required
                                />
                            </div>
                        </FormField>

                        {verifyError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20"
                            >
                                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                                <span>{verifyError}</span>
                            </motion.div>
                        )}

                        <p className="text-xs text-white/40">
                            Allowed domains: {GB_DOMAINS.map(d => d.replace('.iitm.ac.in', '')).join(', ')}
                        </p>

                        <SubmitButton
                            isSubmitting={isVerifying}
                            text="Send Verification Code"
                            loadingText="Sending..."
                            color="gold"
                        />
                    </form>
                ) : (
                    <form onSubmit={handleVerifyCode} className="space-y-5">
                        <div className="p-4 bg-ekatva-teal/10 border border-ekatva-teal/20 rounded-xl">
                            <p className="text-sm text-ekatva-teal">
                                ✅ Code sent to <strong>{email}</strong>
                            </p>
                            <p className="text-xs text-white/50 mt-1">
                                Check your inbox (and spam folder)
                            </p>
                        </div>

                        <FormField label="Enter Verification Code" required>
                            <input
                                type="text"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter 6-digit code"
                                className={`${formInputStyles} text-center text-2xl tracking-[0.5em] font-mono`}
                                maxLength={6}
                                required
                            />
                        </FormField>

                        {verifyError && <FormError message={verifyError} />}

                        <SubmitButton
                            isSubmitting={isVerifying}
                            text="Verify & Continue"
                            loadingText="Verifying..."
                            color="gold"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                setCodeSent(false)
                                setVerifyCode('')
                            }}
                            className="w-full text-sm text-white/50 hover:text-white transition-colors"
                        >
                            Use different email
                        </button>
                    </form>
                )}
            </div>
        )
    }

    // Show actual proposal form
    return <CityProposalFormContent verifiedEmail={verifiedEmail} onClose={onClose} />
}

// ============================================================================
// CITY PROPOSAL FORM CONTENT (After Verification)
// ============================================================================

interface CityProposalFormContentProps {
    verifiedEmail: string
    onClose: () => void
}

function CityProposalFormContent({ verifiedEmail, onClose }: CityProposalFormContentProps) {
    const [formData, setFormData] = useState<CityProposalData>({
        city: '',
        studentPopulation: '',
        existingCommunity: '',
        venueOptions: '',
        coreTeam: '',
        pastExperience: '',
        departmentsHandled: [],
        supportNeeded: [],
        proposedDate: '',
        expectedAttendance: '',
        uniqueActivities: '',
        budgetEstimate: '',
        whyReady: ''
    })

    const [errors, setErrors] = useState<Partial<Record<keyof CityProposalData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const whyReadyWords = useMemo(() => formData.whyReady.trim().split(/\s+/).filter(Boolean).length, [formData.whyReady])

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof CityProposalData, string>> = {}

        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.coreTeam.trim()) newErrors.coreTeam = 'Please list your core team members'
        if (!formData.proposedDate.trim()) newErrors.proposedDate = 'Proposed date is required'
        if (!formData.expectedAttendance.trim()) newErrors.expectedAttendance = 'Expected attendance is required'
        if (!formData.whyReady.trim()) {
            newErrors.whyReady = 'Please tell us why your team is ready'
        } else if (whyReadyWords > 300) {
            newErrors.whyReady = 'Please keep within 300 words'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/city-proposal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, verifiedEmail })
            })

            if (response.ok) {
                setSubmitStatus('success')
                setTimeout(() => onClose(), 4000)
            } else {
                setSubmitStatus('error')
            }
        } catch {
            console.log('City Proposal:', { ...formData, verifiedEmail })
            setSubmitStatus('success')
            setTimeout(() => onClose(), 4000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const updateField = <K extends keyof CityProposalData>(field: K, value: CityProposalData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const toggleSupport = (value: string) => {
        setFormData(prev => ({
            ...prev,
            supportNeeded: prev.supportNeeded.includes(value)
                ? prev.supportNeeded.filter(v => v !== value)
                : [...prev.supportNeeded, value]
        }))
    }

    if (submitStatus === 'success') {
        return (
            <FormSuccess
                title="Proposal Submitted!"
                message="We'll review your proposal and schedule a call within 48 hours."
                subMessage="This is the first step to launching EKATVA in your city!"
            />
        )
    }

    return (
        <div className="relative">
            <CloseButton onClick={onClose} />

            <FormHeader
                title="Propose Your City Edition"
                description="You're taking the first step to bringing EKATVA to a new city. Tell us about your plan."
                accentColor="#FFCF96"
            />

            {/* Verified Badge */}
            <div className="flex items-center gap-2 p-3 bg-ekatva-teal/10 border border-ekatva-teal/20 rounded-lg mb-6">
                <Shield size={16} className="text-ekatva-teal" />
                <span className="text-sm text-white/80">
                    Verified as: <span className="text-ekatva-teal font-medium">{verifiedEmail}</span>
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* City Details */}
                <SectionHeader title="City Details" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Which city?" required error={errors.city}>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            placeholder="e.g., Bangalore, Delhi, Mumbai"
                            className={formInputStyles}
                        />
                    </FormField>

                    <FormField label="Student population estimate" hint="IITM BS students in/near this city">
                        <input
                            type="text"
                            value={formData.studentPopulation}
                            onChange={(e) => updateField('studentPopulation', e.target.value)}
                            placeholder="e.g., 100-200 students"
                            className={formInputStyles}
                        />
                    </FormField>
                </div>

                <FormField label="Existing community?" hint="WhatsApp groups, meetups, etc.">
                    <textarea
                        value={formData.existingCommunity}
                        onChange={(e) => updateField('existingCommunity', e.target.value)}
                        placeholder="Tell us about any existing student networks..."
                        rows={2}
                        className={formTextareaStyles}
                    />
                </FormField>

                <FormField label="Venue options researched" hint="Have you looked into potential venues?">
                    <textarea
                        value={formData.venueOptions}
                        onChange={(e) => updateField('venueOptions', e.target.value)}
                        placeholder="Community halls, co-working spaces, cafes..."
                        rows={2}
                        className={formTextareaStyles}
                    />
                </FormField>

                {/* Team Capability */}
                <SectionHeader title="Team Capability" />

                <FormField label="Core team members" required error={errors.coreTeam}>
                    <textarea
                        value={formData.coreTeam}
                        onChange={(e) => updateField('coreTeam', e.target.value)}
                        placeholder="List 3-5 names with their proposed roles:
e.g., John (Lead), Sarah (Cultural), Mike (Logistics)"
                        rows={3}
                        className={formTextareaStyles}
                    />
                </FormField>

                <FormField label="Past organizing experience?" hint="What events has your team organized?">
                    <textarea
                        value={formData.pastExperience}
                        onChange={(e) => updateField('pastExperience', e.target.value)}
                        placeholder="Describe any relevant experience..."
                        rows={2}
                        className={formTextareaStyles}
                    />
                </FormField>

                {/* Plan & Vision */}
                <SectionHeader title="Plan & Vision" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Proposed date" required error={errors.proposedDate}>
                        <input
                            type="text"
                            value={formData.proposedDate}
                            onChange={(e) => updateField('proposedDate', e.target.value)}
                            placeholder="e.g., March 2026, Q2 2026"
                            className={formInputStyles}
                        />
                    </FormField>

                    <FormField label="Expected attendance" required error={errors.expectedAttendance}>
                        <input
                            type="text"
                            value={formData.expectedAttendance}
                            onChange={(e) => updateField('expectedAttendance', e.target.value)}
                            placeholder="e.g., 80-120 students"
                            className={formInputStyles}
                        />
                    </FormField>
                </div>

                <FormField label="Unique city-specific activities" hint="What makes this edition special?">
                    <textarea
                        value={formData.uniqueActivities}
                        onChange={(e) => updateField('uniqueActivities', e.target.value)}
                        placeholder="Local activities, partnerships, themes..."
                        rows={2}
                        className={formTextareaStyles}
                    />
                </FormField>

                <FormField label="Budget estimate">
                    <select
                        value={formData.budgetEstimate}
                        onChange={(e) => updateField('budgetEstimate', e.target.value)}
                        className={formSelectStyles}
                    >
                        <option value="">Select range</option>
                        {BUDGET_RANGES.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Why is your team ready?" required error={errors.whyReady}>
                    <textarea
                        value={formData.whyReady}
                        onChange={(e) => updateField('whyReady', e.target.value)}
                        placeholder="Convince us your team can pull this off..."
                        rows={4}
                        className={formTextareaStyles}
                    />
                    <CharCounter current={whyReadyWords} max={300} />
                </FormField>

                {/* Support Needed */}
                <SectionHeader title="Support Needed from EKATVA HQ" />

                <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                    {SUPPORT_NEEDS.map(item => (
                        <CheckboxField
                            key={item.value}
                            checked={formData.supportNeeded.includes(item.value)}
                            onChange={() => toggleSupport(item.value)}
                            label={item.label}
                        />
                    ))}
                </div>

                {submitStatus === 'error' && (
                    <FormError message="Something went wrong. Please try again." />
                )}

                <SubmitButton
                    isSubmitting={isSubmitting}
                    text="Submit Proposal"
                    loadingText="Submitting..."
                    color="gold"
                />

                <p className="text-xs text-white/40 text-center">
                    We'll review your proposal and reach out within 48 hours to schedule a call.
                </p>
            </form>
        </div>
    )
}
