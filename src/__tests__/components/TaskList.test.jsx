import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskList from '../../components/tasks/TaskList'

describe('TaskList', () => {
  const mockTasks = [
    { key: 'task1', name: 'Task 1' },
    { key: 'task2', name: 'Task 2' },
    { key: 'task3', name: 'Task 3' }
  ]

  const mockVisitedRooms = ['task1', 'task3']

  it('renders all tasks', () => {
    render(<TaskList tasks={mockTasks} visitedRooms={mockVisitedRooms} />)
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('applies completed class to visited tasks', () => {
    render(<TaskList tasks={mockTasks} visitedRooms={mockVisitedRooms} />)
    const task1Element = screen.getByText('Task 1')
    const task2Element = screen.getByText('Task 2')
    const task3Element = screen.getByText('Task 3')

    expect(task1Element).toHaveClass('task-completed')
    expect(task2Element).not.toHaveClass('task-completed')
    expect(task3Element).toHaveClass('task-completed')
  })

  it('renders empty list when no tasks provided', () => {
    render(<TaskList tasks={[]} visitedRooms={[]} />)
    const list = screen.getByRole('list')
    expect(list.children).toHaveLength(0)
  })

  it('applies custom className', () => {
    render(<TaskList tasks={mockTasks} visitedRooms={mockVisitedRooms} className="custom-list" />)
    const list = screen.getByRole('list')
    expect(list).toHaveClass('custom-list')
  })

  it('renders as unordered list', () => {
    render(<TaskList tasks={mockTasks} visitedRooms={mockVisitedRooms} />)
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('UL')
  })
})
