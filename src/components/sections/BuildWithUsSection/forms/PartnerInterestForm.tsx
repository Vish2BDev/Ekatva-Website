'use client'

import { useState } from 'react'
import { Building, User, Mail, Phone } from 'lucide-react'
import {
    FormField,
    SubmitButton,
    FormSuccess,
    FormError,
    CloseButton,
    FormHeader,
    formInputStyles,
    formTextareaStyles
} from './FormComponents'

// ============================================================================
// FORM 1: PARTNER INTEREST FORM
// Quick interest capture from student societies
// ============================================================================

interface PartnerInterestData {
    societyName: string
    contactName: string
    email: string
    phone: string
    message: string
}

interface PartnerInterestFormProps {
    onClose: () => void
}

export function PartnerInterestForm({ onClose }: PartnerInterestFormProps) {
    const [formData, setFormData] = useState<PartnerInterestData>({
        societyName: '',
        contactName: '',
        email: '',
        phone: '',
        message: ''
    })
    const [errors, setErrors] = useState<Partial<PartnerInterestData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const validate = (): boolean => {
        const newErrors: Partial<PartnerInterestData> = {}

        if (!formData.societyName.trim()) {
            newErrors.societyName = 'Society name is required'
        }
        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Your name is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^[\d\s+\-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // TODO: Replace with actual API endpoint
            const response = await fetch('/api/partner-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitStatus('success')
                setTimeout(() => onClose(), 3000)
            } else {
                setSubmitStatus('error')
            }
        } catch {
            // For now, simulate success since API doesn't exist yet
            console.log('Form data:', formData)
            setSubmitStatus('success')
            setTimeout(() => onClose(), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const updateField = (field: keyof PartnerInterestData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    if (submitStatus === 'success') {
        return (
            <FormSuccess
                title="Thank You!"
                message="We'll reach out within 48 hours with partnership details."
                subMessage={`We've noted your interest from ${formData.societyName}.`}
            />
        )
    }

    return (
        <div className="relative">
            <CloseButton onClick={onClose} />

            <FormHeader
                title="Express Partnership Interest"
                description="Quick form to let us know you're interested. We'll follow up with the full partnership pitch within 48 hours."
                accentColor="#FFCF96"
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Society/House Name" required error={errors.societyName}>
                    <div className="relative">
                        <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            value={formData.societyName}
                            onChange={(e) => updateField('societyName', e.target.value)}
                            placeholder="e.g., Pravāha Dance Society"
                            className={`${formInputStyles} pl-11`}
                        />
                    </div>
                </FormField>

                <FormField label="Contact Person Name" required error={errors.contactName}>
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            value={formData.contactName}
                            onChange={(e) => updateField('contactName', e.target.value)}
                            placeholder="Your name"
                            className={`${formInputStyles} pl-11`}
                        />
                    </div>
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Email Address" required error={errors.email}>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder="your.email@example.com"
                                className={`${formInputStyles} pl-11`}
                            />
                        </div>
                    </FormField>

                    <FormField label="Phone Number" required error={errors.phone}>
                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                                className={`${formInputStyles} pl-11`}
                            />
                        </div>
                    </FormField>
                </div>

                <FormField
                    label="Why do you want to partner with EKATVA?"
                    hint="Optional - Tell us what excites you about this partnership"
                >
                    <textarea
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                        className={formTextareaStyles}
                    />
                </FormField>

                {submitStatus === 'error' && (
                    <FormError message="Something went wrong. Please try again." />
                )}

                <SubmitButton
                    isSubmitting={isSubmitting}
                    text="Submit Interest"
                    loadingText="Submitting..."
                    color="gold"
                />
            </form>
        </div>
    )
}
