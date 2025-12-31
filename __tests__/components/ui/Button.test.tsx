import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/ui/Button'

describe('Button Component', () => {
    it('renders with primary variant by default', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toHaveClass('bg-ekatva-teal')
    })

    it('renders with secondary variant when specified', () => {
        render(<Button variant="secondary">Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toHaveClass('bg-unity-gold')
    })

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeDisabled()
    })
})
