import { ElementType, HTMLAttributes, ReactNode, createElement } from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: 'h1-hero' | 'h1-section' | 'h2' | 'h3' | 'body' | 'caption' | 'cta'
    component?: ElementType
    children: ReactNode
}

export default function Typography({
    variant = 'body',
    component,
    className,
    children,
    ...props
}: TypographyProps) {
    const tag = component ||
        (variant.startsWith('h1') ? 'h1' :
            variant === 'h2' ? 'h2' :
                variant === 'h3' ? 'h3' : 'p')

    const styles: Record<string, string> = {
        'h1-hero': 'text-5xl md:text-6xl font-bold leading-tight',
        'h1-section': 'text-4xl md:text-5xl font-bold leading-tight',
        'h2': 'text-2xl md:text-3xl font-semibold leading-snug',
        'h3': 'text-lg md:text-xl font-semibold leading-normal',
        'body': 'text-base font-normal leading-relaxed',
        'caption': 'text-xs font-normal leading-snug',
        'cta': 'text-sm font-bold uppercase tracking-wide',
    }

    return createElement(
        tag,
        { className: cn(styles[variant], className), ...props },
        children
    )
}

