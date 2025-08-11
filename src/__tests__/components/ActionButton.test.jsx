import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionButton from '../../components/actions/ActionButton'

describe('ActionButton', () => {
  const defaultProps = {
    action: 'examine',
    isActive: false,
    isEnabled: true,
    onClick: jest.fn(),
    onCancel: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with correct text', () => {
    render(<ActionButton {...defaultProps} />)
    expect(screen.getByText('examine')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    render(<ActionButton {...defaultProps} />)
    fireEvent.click(screen.getByText('examine'))
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    render(<ActionButton {...defaultProps} />)
    fireEvent.keyDown(screen.getByText('examine'), { key: 'Enter' })
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    render(<ActionButton {...defaultProps} />)
    fireEvent.keyDown(screen.getByText('examine'), { key: ' ' })
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('shows cancel button when active', () => {
    render(<ActionButton {...defaultProps} isActive={true} />)
    expect(screen.getByText('[x]')).toBeInTheDocument()
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(<ActionButton {...defaultProps} isActive={true} />)
    fireEvent.click(screen.getByText('[x]'))
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when Enter key is pressed on cancel button', () => {
    render(<ActionButton {...defaultProps} isActive={true} />)
    fireEvent.keyDown(screen.getByText('[x]'), { key: 'Enter' })
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  it('applies disabled class when not enabled', () => {
    render(<ActionButton {...defaultProps} isEnabled={false} />)
    const button = screen.getByText('examine')
    expect(button).toHaveClass('disabled')
  })

  it('does not call onClick when disabled', () => {
    render(<ActionButton {...defaultProps} isEnabled={false} />)
    fireEvent.click(screen.getByText('examine'))
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<ActionButton {...defaultProps} className="custom-class" />)
    const button = screen.getByText('examine')
    expect(button).toHaveClass('custom-class')
  })

  it('renders children instead of action when provided', () => {
    render(
      <ActionButton {...defaultProps}>
        Custom Text
      </ActionButton>
    )
    expect(screen.getByText('Custom Text')).toBeInTheDocument()
    expect(screen.queryByText('examine')).not.toBeInTheDocument()
  })
})
