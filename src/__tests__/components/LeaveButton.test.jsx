import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import LeaveButton from '../../components/actions/LeaveButton'

describe('LeaveButton', () => {
  const defaultProps = {
    taskPercentage: 50,
    onClick: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders "Leave?" text', () => {
    render(<LeaveButton {...defaultProps} />)
    expect(screen.getByText('Leave?')).toBeInTheDocument()
  })

  it('calls onClick when clicked and enabled', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={100} />)
    fireEvent.click(screen.getByText('Leave?'))
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={50} />)
    fireEvent.click(screen.getByText('Leave?'))
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })

  it('applies glow class when enabled', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={100} />)
    const button = screen.getByText('Leave?')
    expect(button).toHaveClass('glow')
  })

  it('applies inactive-action class when disabled', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={50} />)
    const button = screen.getByText('Leave?')
    expect(button).toHaveClass('inactive-action')
  })

  it('does not render when not visible', () => {
    render(<LeaveButton {...defaultProps} isVisible={false} />)
    expect(screen.queryByText('Leave?')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={100} className="custom-class" />)
    const button = screen.getByText('Leave?')
    expect(button).toHaveClass('custom-class')
  })

  it('is enabled when task percentage is 100', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={100} />)
    const button = screen.getByText('Leave?')
    expect(button).not.toHaveClass('disabled')
  })

  it('is disabled when task percentage is less than 100', () => {
    render(<LeaveButton {...defaultProps} taskPercentage={99} />)
    const button = screen.getByText('Leave?')
    expect(button).toHaveClass('disabled')
  })
})
