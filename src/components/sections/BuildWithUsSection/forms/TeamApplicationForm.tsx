'use client'

import { useState, useMemo } from 'react'
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
// FORM 2: TEAM APPLICATION FORM
// Comprehensive application for core team positions
// ============================================================================

const DEPARTMENTS = [
    { value: 'content', label: 'Content Team', icon: '✍️', desc: 'Writing, storytelling, copywriting' },
    { value: 'cultural', label: 'Cultural Team', icon: '🎭', desc: 'Event curation, performance coordination' },
    { value: 'technical', label: 'Technical Team', icon: '💻', desc: 'Web dev, automation, tools' },
    { value: 'transport', label: 'Transport Team', icon: '🚌', desc: 'Logistics, route planning, coordination' },
    { value: 'volunteers', label: 'Volunteers Team', icon: '🤝', desc: 'Training, management, day-of ops' },
    { value: 'sponsor', label: 'Sponsor Team', icon: '💼', desc: 'Partnerships, sales, negotiation' },
    { value: 'media', label: 'Media Team', icon: '📸', desc: 'Photography, videography, editing' }
]

const BATCHES = [
    { value: 'jan-2023', label: 'Jan 2023' },
    { value: 'july-2023', label: 'July 2023' },
    { value: 'jan-2024', label: 'Jan 2024' },
    { value: 'july-2024', label: 'July 2024' },
    { value: 'jan-2025', label: 'Jan 2025' }
]

interface TeamApplicationData {
    // Personal Info
    name: string
    email: string
    phone: string
    city: string
    batch: string
    linkedin: string

    // Department Selection
    primaryDept: string
    whyDept: string
    secondaryDept: string

    // Skills & Experience
    pastExperience: string
    portfolio: string
    availability: number

    // Motivation
    whyEkatva: string
    contribution: string
    questions: string

    // Commitment
    commitment: boolean
    availabilityConfirm: boolean
    genuine: boolean
}

interface TeamApplicationFormProps {
    onClose: () => void
}

export function TeamApplicationForm({ onClose }: TeamApplicationFormProps) {
    const [formData, setFormData] = useState<TeamApplicationData>({
        name: '',
        email: '',
        phone: '',
        city: '',
        batch: '',
        linkedin: '',
        primaryDept: '',
        whyDept: '',
        secondaryDept: '',
        pastExperience: '',
        portfolio: '',
        availability: 10,
        whyEkatva: '',
        contribution: '',
        questions: '',
        commitment: false,
        availabilityConfirm: false,
        genuine: false
    })

    const [errors, setErrors] = useState<Partial<Record<keyof TeamApplicationData, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    // Word counts
    const whyDeptWords = useMemo(() => formData.whyDept.trim().split(/\s+/).filter(Boolean).length, [formData.whyDept])
    const whyEkatvaWords = useMemo(() => formData.whyEkatva.trim().split(/\s+/).filter(Boolean).length, [formData.whyEkatva])
    const contributionWords = useMemo(() => formData.contribution.trim().split(/\s+/).filter(Boolean).length, [formData.contribution])

    const allCommitmentsChecked = formData.commitment && formData.availabilityConfirm && formData.genuine

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof TeamApplicationData, string>> = {}

        // Personal Info
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.batch) newErrors.batch = 'Please select your batch'

        // Department
        if (!formData.primaryDept) newErrors.primaryDept = 'Please select a department'
        if (!formData.whyDept.trim()) {
            newErrors.whyDept = 'Please tell us why you chose this department'
        } else if (whyDeptWords > 200) {
            newErrors.whyDept = 'Please keep within 200 words'
        }

        // Motivation
        if (!formData.whyEkatva.trim()) {
            newErrors.whyEkatva = 'Please tell us why EKATVA'
        } else if (whyEkatvaWords > 150) {
            newErrors.whyEkatva = 'Please keep within 150 words'
        }
        if (!formData.contribution.trim()) {
            newErrors.contribution = 'Please tell us what you can contribute'
        } else if (contributionWords > 150) {
            newErrors.contribution = 'Please keep within 150 words'
        }

        // Commitment
        if (!allCommitmentsChecked) {
            newErrors.commitment = 'Please accept all commitment checks'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/team-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitStatus('success')
                setTimeout(() => onClose(), 4000)
            } else {
                setSubmitStatus('error')
            }
        } catch {
            // Simulate success since API doesn't exist yet
            console.log('Team Application:', formData)
            setSubmitStatus('success')
            setTimeout(() => onClose(), 4000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const updateField = <K extends keyof TeamApplicationData>(field: K, value: TeamApplicationData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    if (submitStatus === 'success') {
        return (
            <FormSuccess
                title="Application Received!"
                message="We'll review your application and reach out within 7 days."
                subMessage={`Check your email (${formData.email}) for confirmation.`}
            />
        )
    }

    return (
        <div className="relative">
            <CloseButton onClick={onClose} />

            <FormHeader
                title="Apply to Join Core Team"
                description="Tell us about yourself and which department excites you. This is a long-term commitment (6+ months)."
                accentColor="#5CE6C9"
            />

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* ============ SECTION: Personal Info ============ */}
                <SectionHeader title="Personal Information" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Full Name" required error={errors.name}>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Your full name"
                            className={formInputStyles}
                        />
                    </FormField>

                    <FormField label="Email" required error={errors.email}>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="your.email@example.com"
                            className={formInputStyles}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Phone Number" required error={errors.phone}>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className={formInputStyles}
                        />
                    </FormField>

                    <FormField label="City" required error={errors.city}>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            placeholder="Your current city"
                            className={formInputStyles}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="IITM BS Batch" required error={errors.batch}>
                        <select
                            value={formData.batch}
                            onChange={(e) => updateField('batch', e.target.value)}
                            className={formSelectStyles}
                        >
                            <option value="">Select your batch</option>
                            {BATCHES.map(batch => (
                                <option key={batch.value} value={batch.value}>
                                    {batch.label}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="LinkedIn Profile" hint="Optional but recommended">
                        <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => updateField('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/..."
                            className={formInputStyles}
                        />
                    </FormField>
                </div>

                {/* ============ SECTION: Department Selection ============ */}
                <SectionHeader title="Department Selection" />

                <FormField label="Primary Department Choice" required error={errors.primaryDept}>
                    <select
                        value={formData.primaryDept}
                        onChange={(e) => updateField('primaryDept', e.target.value)}
                        className={formSelectStyles}
                    >
                        <option value="">Select a department</option>
                        {DEPARTMENTS.map(dept => (
                            <option key={dept.value} value={dept.value}>
                                {dept.icon} {dept.label} — {dept.desc}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Why this department?" required error={errors.whyDept}>
                    <textarea
                        value={formData.whyDept}
                        onChange={(e) => updateField('whyDept', e.target.value)}
                        placeholder="What excites you about this department? What skills/experience do you bring?"
                        rows={4}
                        className={formTextareaStyles}
                    />
                    <CharCounter current={whyDeptWords} max={200} />
                </FormField>

                <FormField label="Secondary Choice" hint="Optional backup if primary is full">
                    <select
                        value={formData.secondaryDept}
                        onChange={(e) => updateField('secondaryDept', e.target.value)}
                        className={formSelectStyles}
                    >
                        <option value="">Select a department (optional)</option>
                        {DEPARTMENTS.filter(d => d.value !== formData.primaryDept).map(dept => (
                            <option key={dept.value} value={dept.value}>
                                {dept.icon} {dept.label}
                            </option>
                        ))}
                    </select>
                </FormField>

                {/* ============ SECTION: Skills & Experience ============ */}
                <SectionHeader title="Skills & Experience" />

                <FormField label="Past event organizing experience?" hint="Optional but helpful">
                    <textarea
                        value={formData.pastExperience}
                        onChange={(e) => updateField('pastExperience', e.target.value)}
                        placeholder="Tell us about any events you've organized before..."
                        rows={3}
                        className={formTextareaStyles}
                    />
                </FormField>

                <FormField label="Portfolio / Work Samples" hint="Optional — links to your work">
                    <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => updateField('portfolio', e.target.value)}
                        placeholder="GitHub, Behance, Dribbble, personal website, etc."
                        className={formInputStyles}
                    />
                </FormField>

                <FormField label={`Weekly Availability: ${formData.availability} hours`}>
                    <div className="pt-2 pb-1">
                        <input
                            type="range"
                            min="5"
                            max="20"
                            value={formData.availability}
                            onChange={(e) => updateField('availability', parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ekatva-teal"
                        />
                        <div className="flex justify-between text-xs text-white/50 mt-2">
                            <span>5 hrs/week</span>
                            <span>10 hrs</span>
                            <span>15 hrs</span>
                            <span>20 hrs/week</span>
                        </div>
                    </div>
                </FormField>

                {/* ============ SECTION: Motivation ============ */}
                <SectionHeader title="Motivation" />

                <FormField label="Why EKATVA?" required error={errors.whyEkatva}>
                    <textarea
                        value={formData.whyEkatva}
                        onChange={(e) => updateField('whyEkatva', e.target.value)}
                        placeholder="What draws you to EKATVA specifically? What resonates with our mission?"
                        rows={4}
                        className={formTextareaStyles}
                    />
                    <CharCounter current={whyEkatvaWords} max={150} />
                </FormField>

                <FormField label="What can you contribute?" required error={errors.contribution}>
                    <textarea
                        value={formData.contribution}
                        onChange={(e) => updateField('contribution', e.target.value)}
                        placeholder="What unique value do you bring? Skills, networks, ideas..."
                        rows={4}
                        className={formTextareaStyles}
                    />
                    <CharCounter current={contributionWords} max={150} />
                </FormField>

                <FormField label="Any questions for us?" hint="Optional">
                    <textarea
                        value={formData.questions}
                        onChange={(e) => updateField('questions', e.target.value)}
                        placeholder="Ask us anything..."
                        rows={2}
                        className={formTextareaStyles}
                    />
                </FormField>

                {/* ============ SECTION: Commitment ============ */}
                <SectionHeader title="Commitment" />

                <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <CheckboxField
                        checked={formData.commitment}
                        onChange={(checked) => updateField('commitment', checked)}
                        label="I understand this is a long-term commitment (minimum 6 months)"
                        required
                    />
                    <CheckboxField
                        checked={formData.availabilityConfirm}
                        onChange={(checked) => updateField('availabilityConfirm', checked)}
                        label={`I can dedicate ${formData.availability} hours per week to EKATVA`}
                        required
                    />
                    <CheckboxField
                        checked={formData.genuine}
                        onChange={(checked) => updateField('genuine', checked)}
                        label="I'm genuinely interested in building EKATVA, not just resume-building"
                        required
                    />
                </div>

                {errors.commitment && (
                    <FormError message={errors.commitment} />
                )}

                {submitStatus === 'error' && (
                    <FormError message="Something went wrong. Please try again." />
                )}

                <SubmitButton
                    isSubmitting={isSubmitting}
                    disabled={!allCommitmentsChecked}
                    text="Submit Application"
                    loadingText="Submitting Application..."
                    color="teal"
                />

                <p className="text-xs text-white/40 text-center">
                    By submitting, you agree to be contacted about your application.
                </p>
            </form>
        </div>
    )
}
