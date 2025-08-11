import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ExitButton from '../../../components/movement/ExitButton'

describe('ExitButton', () => {
  const mockConfig = {
    ui: {
      exitToLabel: 'Exit to {name}',
      exitDescription: 'Press Enter or Space to exit to {name}'
    }
  }

  const defaultProps = {
    exit: {
      key: 'north',
      name: 'north',
      description: ['Go north to the kitchen']
    },
    onClick: jest.fn(),
    config: mockConfig
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders exit button with exit name', () => {
    render(<ExitButton {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    render(<ExitButton {...defaultProps} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.exit)
  })

  it('applies custom className', () => {
    render(<ExitButton {...defaultProps} className="custom-exit" />)
    const td = screen.getByRole('button').parentElement
    expect(td).toHaveClass('custom-exit')
  })

  it('renders as button element', () => {
    render(<ExitButton {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('has correct aria-label', () => {
    render(<ExitButton {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Exit to north')
  })

  it('handles missing exit gracefully', () => {
    render(<ExitButton exit={null} onClick={jest.fn()} config={mockConfig} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Exit to N/A')
  })

  it('renders as table cell', () => {
    render(<ExitButton {...defaultProps} />)
    const td = screen.getByRole('button').parentElement
    expect(td.tagName).toBe('TD')
  })
})
