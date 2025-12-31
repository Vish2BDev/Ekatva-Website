import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/HeroSection'

// Mock animation to avoid issues in test environment
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
        h1: ({ children, className, ...props }: any) => <h1 className={className} {...props}>{children}</h1>,
        h2: ({ children, className, ...props }: any) => <h2 className={className} {...props}>{children}</h2>,
        p: ({ children, className, ...props }: any) => <p className={className} {...props}>{children}</p>,
        button: ({ children, className, onClick, ...props }: any) => <button className={className} onClick={onClick} {...props}>{children}</button>,
    },
    useInView: () => true,
}))

describe('HeroSection', () => {
    it('renders the main tagline', () => {
        render(<HeroSection />)
        expect(screen.getByText('Unite.')).toBeInTheDocument()
        expect(screen.getByText('Inspire.')).toBeInTheDocument()
        expect(screen.getByText('Celebrate.')).toBeInTheDocument()
    })

    it('renders the brand name', () => {
        render(<HeroSection />)
        expect(screen.getByText('EKATVA')).toBeInTheDocument()
    })

    it('renders the scroll indicator button', () => {
        render(<HeroSection />)
        expect(screen.getByRole('button', { name: /scroll down to explore/i })).toBeInTheDocument()
    })

    // Note: We cannot easily test the video vs image logic without mocking window.innerWidth and events,
    // but testing the content is a good baseline.
})
