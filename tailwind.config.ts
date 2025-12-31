import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                'ekatva-teal': '#5CE6C9',
                'unity-gold': '#FFCF96',
                'oneness-black': '#050505',

                // Secondary Colors
                'deep-teal': '#1F4F59',
                'gradient-dark': '#0E2F36',
                'accent-turquoise': '#3FD4B6',

                // Neutral Colors
                'off-white': '#F8F8F8',
                'light-gray': '#AAAAAA',
                'mid-gray': '#666666',
                'divider-gray': '#333333',
                'near-black': '#1A1A1A',
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'Arial', 'Helvetica', 'sans-serif'],
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
            },
            spacing: {
                'micro': '8px',
                'small': '16px',
                'medium': '24px',
                'large': '40px',
                'hero': '80px',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-in-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-teal-dark': 'linear-gradient(135deg, #1F4F59 0%, #0E2F36 100%)',
                'gradient-hero-overlay': 'linear-gradient(135deg, rgba(31,79,89,0.6) 0%, rgba(5,5,5,0.8) 100%)',
            },
        },
    },
    plugins: [],
}
export default config
