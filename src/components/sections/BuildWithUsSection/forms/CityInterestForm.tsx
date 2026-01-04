'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import {
    FormField,
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
// FORM 4: CITY INTEREST FORM
// Public form to track interest in bringing EKATVA to new cities
// ============================================================================

interface CityInterestData {
    name: string
    email: string
    city: string
    whyCity: string
    studentCount: string
    activeGroups: string
    willAttend: string
    willHelp: string
    venues: string
}

interface CityInterestFormProps {
    onClose: () => void
}

export function CityInterestForm({ onClose }: CityInterestFormProps) {
    const [formData, setFormData] = useState<CityInterestData>({
        name: '',
        email: '',
        city: '',
        whyCity: '',
        studentCount: '',
        activeGroups: '',
        willAttend: '',
        willHelp: '',
        venues: ''
    })

    const [errors, setErrors] = useState<Partial<CityInterestData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const whyCityWords = formData.whyCity.trim().split(/\s+/).filter(Boolean).length

    const validate = (): boolean => {
        const newErrors: Partial<CityInterestData> = {}

        if (!formData.name.trim()) newErrors.name = 'Your name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.whyCity.trim()) {
            newErrors.whyCity = 'Please tell us why this city needs EKATVA'
        } else if (whyCityWords > 100) {
            newErrors.whyCity = 'Please keep within 100 words'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/city-interest', {
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
            console.log('City Interest:', formData)
            setSubmitStatus('success')
            setTimeout(() => onClose(), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const updateField = (field: keyof CityInterestData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    if (submitStatus === 'success') {
        return (
            <FormSuccess
                title="Interest Recorded!"
                message={`We're tracking interest in ${formData.city}.`}
                subMessage="We'll reach out when we have enough demand to launch there!"
            />
        )
    }

    return (
        <div className="relative">
            <CloseButton onClick={onClose} />

            <FormHeader
                title="Bring EKATVA to Your City"
                description="Let us know your city needs EKATVA. We track demand and reach out when we're ready to launch."
                accentColor="#5CE6C9"
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Your Name" required error={errors.name}>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Your name"
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

                <FormField label="Which city?" required error={errors.city}>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            placeholder="e.g., Pune, Ahmedabad, Chennai"
                            className={`${formInputStyles} pl-11`}
                        />
                    </div>
                </FormField>

                <FormField label="Why does this city need EKATVA?" required error={errors.whyCity}>
                    <textarea
                        value={formData.whyCity}
                        onChange={(e) => updateField('whyCity', e.target.value)}
                        placeholder="Tell us about the student community in your city..."
                        rows={3}
                        className={formTextareaStyles}
                    />
                    <CharCounter current={whyCityWords} max={100} />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Estimated IITM BS students" hint="Optional">
                        <input
                            type="text"
                            value={formData.studentCount}
                            onChange={(e) => updateField('studentCount', e.target.value)}
                            placeholder="e.g., 50-100 students"
                            className={formInputStyles}
                        />
                    </FormField>

                    <FormField label="Active student groups exist?" hint="Optional">
                        <select
                            value={formData.activeGroups}
                            onChange={(e) => updateField('activeGroups', e.target.value)}
                            className={formSelectStyles}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes, there are active groups</option>
                            <option value="some">Some informal meetups</option>
                            <option value="no">No active groups yet</option>
                        </select>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Would you attend if organized?" hint="Optional">
                        <select
                            value={formData.willAttend}
                            onChange={(e) => updateField('willAttend', e.target.value)}
                            className={formSelectStyles}
                        >
                            <option value="">Select</option>
                            <option value="definitely">Definitely!</option>
                            <option value="probably">Probably</option>
                            <option value="maybe">Maybe</option>
                        </select>
                    </FormField>

                    <FormField label="Would you help organize?" hint="Optional">
                        <select
                            value={formData.willHelp}
                            onChange={(e) => updateField('willHelp', e.target.value)}
                            className={formSelectStyles}
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes, I'd love to!</option>
                            <option value="maybe">Maybe, depending on time</option>
                            <option value="no">No, just want to attend</option>
                        </select>
                    </FormField>
                </div>

                <FormField label="Know any good venues?" hint="Optional">
                    <textarea
                        value={formData.venues}
                        onChange={(e) => updateField('venues', e.target.value)}
                        placeholder="Cafes, community spaces, colleges... any suggestions welcome!"
                        rows={2}
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
                    color="teal"
                />
            </form>
        </div>
    )
}
