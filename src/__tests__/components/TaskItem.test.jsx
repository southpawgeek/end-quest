import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskItem from '../../components/tasks/TaskItem'

describe('TaskItem', () => {
  const defaultProps = {
    task: {
      key: 'test-task',
      name: 'Test Task'
    },
    isCompleted: false
  }

  it('renders task name', () => {
    render(<TaskItem {...defaultProps} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('applies completed class when task is completed', () => {
    render(<TaskItem {...defaultProps} isCompleted={true} />)
    const taskElement = screen.getByText('Test Task')
    expect(taskElement).toHaveClass('task-completed')
  })

  it('does not apply completed class when task is not completed', () => {
    render(<TaskItem {...defaultProps} isCompleted={false} />)
    const taskElement = screen.getByText('Test Task')
    expect(taskElement).not.toHaveClass('task-completed')
  })

  it('applies custom className', () => {
    render(<TaskItem {...defaultProps} className="custom-class" />)
    const taskElement = screen.getByText('Test Task')
    expect(taskElement).toHaveClass('custom-class')
  })

  it('renders as list item', () => {
    render(<TaskItem {...defaultProps} />)
    const taskElement = screen.getByText('Test Task')
    expect(taskElement.tagName).toBe('LI')
  })
})
