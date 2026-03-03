import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LeadForm } from '@/components/forms/LeadForm'

// Mock fetch for submission
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Success' })
    })
) as jest.Mock;

describe('LeadForm', () => {
    it('should render all required fields', () => {
        render(<LeadForm productType="virtual_office" />)

        expect(screen.getByLabelText(/nama/i)).toBeInTheDocument() // Adjusted regex to match Indonesia 'Nama Lengkap' usually
        expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /kirim/i })).toBeInTheDocument() // Adjusted 'Submit' to 'Kirim' likely
    })

    it('should validate required fields', async () => {
        render(<LeadForm productType="virtual_office" />)

        const submitButton = screen.getByRole('button', { name: /kirim/i })
        fireEvent.click(submitButton)

        await waitFor(() => {
            // Expect some error message
            expect(screen.getByText(/wajib diisi|required/i)).toBeInTheDocument()
        })
    })

    it('should validate phone format', async () => {
        render(<LeadForm productType="virtual_office" />)

        const phoneInput = screen.getByLabelText(/whatsapp/i)
        fireEvent.change(phoneInput, { target: { value: 'invalid' } })

        const submitButton = screen.getByRole('button', { name: /kirim/i })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/invalid|format/i)).toBeInTheDocument()
        })
    })
})
