import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ActionList from '../../components/actions/ActionList'

describe('ActionList', () => {
  const mockActions = ['examine', 'use', 'hit']
  const mockCurrentAction = 'examine'
  const mockOnActionSelect = jest.fn()
  const mockOnActionCancel = jest.fn()
  const mockOnLeaveAction = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all actions', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={null}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    expect(screen.getByText('examine')).toBeInTheDocument()
    expect(screen.getByText('use')).toBeInTheDocument()
    expect(screen.getByText('hit')).toBeInTheDocument()
  })

  it('calls onActionSelect when action is clicked', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={null}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    fireEvent.click(screen.getByText('examine'))
    expect(mockOnActionSelect).toHaveBeenCalledWith('examine')
  })

  it('shows active action with cancel button', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={mockCurrentAction}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    expect(screen.getByText('[x]')).toBeInTheDocument()
  })

  it('calls onActionCancel when cancel button is clicked', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={mockCurrentAction}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    fireEvent.click(screen.getByText('[x]'))
    expect(mockOnActionCancel).toHaveBeenCalled()
  })

  it('renders as unordered list', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={null}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    const list = screen.getByRole('listbox')
    expect(list.tagName).toBe('UL')
  })

  it('renders Leave button when not in epilogue room', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={null}
        taskPercentage={50}
        currentRoomKey="beginning"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    expect(screen.getByText('Leave?')).toBeInTheDocument()
  })

  it('does not render Leave button when in epilogue room', () => {
    render(
      <ActionList
        actions={mockActions}
        currentAction={null}
        taskPercentage={50}
        currentRoomKey="epilogue"
        onActionSelect={mockOnActionSelect}
        onActionCancel={mockOnActionCancel}
        onLeaveAction={mockOnLeaveAction}
      />
    )
    expect(screen.queryByText('Leave?')).not.toBeInTheDocument()
  })
})
