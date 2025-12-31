import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe('Card Component', () => {
    it('renders children correctly', () => {
        render(<Card>Test Content</Card>)
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies gradient class when gradient prop is true', () => {
        render(<Card gradient>Test Content</Card>)
        const card = screen.getByText('Test Content').parentElement
        expect(card).toHaveClass('bg-gradient-to-br')
    })

    it('renders with motion component when hover is true', () => {
        render(<Card hover>Test Content</Card>)
        // motion.div still renders a div, but we can check if it rendered successfully
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies additional className', () => {
        render(<Card className="test-class">Test Content</Card>)
        const card = screen.getByText('Test Content').parentElement
        expect(card).toHaveClass('test-class')
    })
})
