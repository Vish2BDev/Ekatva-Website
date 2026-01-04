'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader, X } from 'lucide-react'

// ============================================================================
// SHARED FORM UI COMPONENTS
// ============================================================================

/**
 * FormField - Reusable form field wrapper with label
 */
export function FormField({
    label,
    required,
    children,
    error,
    hint
}: {
    label: string
    required?: boolean
    children: React.ReactNode
    error?: string
    hint?: string
}) {
    return (
        <div className="form-field">
            <label className="block text-sm font-medium text-white/90 mb-2">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {children}
            {hint && !error && (
                <p className="text-xs text-white/50 mt-1.5">{hint}</p>
            )}
            {error && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}
        </div>
    )
}

/**
 * SectionHeader - Divider with section title for multi-section forms
 */
export function SectionHeader({ title }: { title: string }) {
    return (
        <div className="pt-6 pb-2 border-t border-white/10 first:border-t-0 first:pt-0">
            <h4 className="text-base font-semibold text-ekatva-teal flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ekatva-teal" />
                {title}
            </h4>
        </div>
    )
}

/**
 * CheckboxField - Styled checkbox with label
 */
export function CheckboxField({
    checked,
    onChange,
    label,
    required
}: {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    required?: boolean
}) {
    return (
        <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="peer sr-only"
                    required={required}
                />
                <div className="w-5 h-5 rounded border-2 border-white/30 bg-white/5 peer-checked:bg-ekatva-teal peer-checked:border-ekatva-teal transition-all flex items-center justify-center">
                    {checked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            <CheckCircle size={14} className="text-oneness-black" />
                        </motion.div>
                    )}
                </div>
            </div>
            <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                {label}
            </span>
        </label>
    )
}

/**
 * CharCounter - Word/character counter for textareas
 */
export function CharCounter({ current, max, type = 'words' }: { current: number; max: number; type?: 'words' | 'chars' }) {
    const isOver = current > max
    return (
        <div className={`text-xs text-right mt-1.5 ${isOver ? 'text-red-400' : 'text-white/40'}`}>
            {current} / {max} {type}
        </div>
    )
}

/**
 * SubmitButton - Animated submit button with loading state
 */
export function SubmitButton({
    isSubmitting,
    disabled = false,
    text = 'Submit',
    loadingText = 'Submitting...',
    color = 'teal'
}: {
    isSubmitting: boolean
    disabled?: boolean
    text?: string
    loadingText?: string
    color?: 'teal' | 'gold'
}) {
    const colorClasses = {
        teal: 'bg-ekatva-teal hover:bg-ekatva-teal/90',
        gold: 'bg-unity-gold hover:bg-unity-gold/90'
    }

    return (
        <motion.button
            type="submit"
            disabled={isSubmitting || disabled}
            whileHover={{ scale: disabled ? 1 : 1.01 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`
                w-full py-4 ${colorClasses[color]} text-oneness-black font-semibold rounded-xl
                transition-all disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
            `}
        >
            {isSubmitting ? (
                <>
                    <Loader size={20} className="animate-spin" />
                    {loadingText}
                </>
            ) : (
                text
            )}
        </motion.button>
    )
}

/**
 * FormSuccess - Success state display
 */
export function FormSuccess({
    title,
    message,
    subMessage
}: {
    title: string
    message: string
    subMessage?: string
}) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 30 }}
            >
                <CheckCircle size={64} className="mx-auto text-ekatva-teal mb-4" />
            </motion.div>
            <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
            <p className="text-white/70 mb-2">{message}</p>
            {subMessage && (
                <p className="text-sm text-white/50">{subMessage}</p>
            )}
        </motion.div>
    )
}

/**
 * FormError - Error alert display
 */
export function FormError({ message }: { message: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20"
        >
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{message}</span>
        </motion.div>
    )
}

/**
 * CloseButton - Modal close button
 */
export function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Close modal"
        >
            <X size={24} />
        </button>
    )
}

/**
 * FormHeader - Modal form header with accent bar
 */
export function FormHeader({
    title,
    description,
    accentColor = '#5CE6C9'
}: {
    title: string
    description: string
    accentColor?: string
}) {
    return (
        <div className="pt-4 mb-6">
            <div
                className="w-12 h-1 rounded-full mb-6"
                style={{ backgroundColor: accentColor }}
            />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {title}
            </h3>
            <p className="text-mid-gray leading-relaxed">
                {description}
            </p>
        </div>
    )
}

// ============================================================================
// FORM INPUT STYLES (CSS-in-JS for consistency)
// ============================================================================

export const formInputStyles = `
    w-full px-4 py-3 
    bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-white/40
    focus:outline-none focus:border-ekatva-teal/50 focus:ring-1 focus:ring-ekatva-teal/30
    transition-all
`

export const formSelectStyles = `
    ${formInputStyles}
    appearance-none cursor-pointer
    bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.5)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
    bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]
`

export const formTextareaStyles = `
    ${formInputStyles}
    resize-none min-h-[100px]
`
