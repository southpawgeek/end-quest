import React from 'react'
import { render, screen } from '@testing-library/react'
import MovementGrid from '../../../components/movement/MovementGrid'

describe('MovementGrid', () => {
  const mockRooms = {
    kitchen: { key: 'kitchen', name: 'Kitchen' },
    bathroom: { key: 'bathroom', name: 'Bathroom' },
    basement: { key: 'basement', name: 'Basement' }
  }

  const mockExits = {
    a1: 'kitchen',
    a3: 'bathroom',
    c1: 'basement'
  }

  const mockConfig = {
    ui: {
      movementGridLabel: 'Movement grid',
      noExitAvailable: 'No exit available'
    },
    grid: {
      size: 3,
      width: 3,
      height: 3
    }
  }

  const mockOnExitClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with proper accessibility attributes', () => {
    render(
      <MovementGrid
        exits={mockExits}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={mockConfig}
      />
    )

    const table = screen.getByRole('grid')
    expect(table).toHaveAttribute('aria-label', 'Movement grid')
    expect(table).toHaveAttribute('aria-describedby', 'movement-description')
  })

  it('renders movement description', () => {
    render(
      <MovementGrid
        exits={mockExits}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={mockConfig}
      />
    )

    const description = screen.getByText(/Movement grid with 3 available exits/)
    expect(description).toBeInTheDocument()
  })

  it('renders no-exit cells for unavailable exits', () => {
    render(
      <MovementGrid
        exits={mockExits}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={mockConfig}
      />
    )

    const noExitCells = screen.getAllByText('No exit available')
    expect(noExitCells.length).toBeGreaterThan(0)
  })

  it('handles config without grid configuration', () => {
    const configWithoutGrid = {
      ui: mockConfig.ui
      // No grid config
    }

    render(
      <MovementGrid
        exits={mockExits}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={configWithoutGrid}
      />
    )

    // Should not crash and should render something
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('handles empty exits object', () => {
    render(
      <MovementGrid
        exits={{}}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={mockConfig}
      />
    )

    // Should render description with 0 exits
    const description = screen.getByText(/Movement grid with 0 available exits/)
    expect(description).toBeInTheDocument()
  })

  it('handles undefined exits', () => {
    render(
      <MovementGrid
        exits={undefined}
        rooms={mockRooms}
        onExitClick={mockOnExitClick}
        config={mockConfig}
      />
    )

    // Should render description with 0 exits
    const description = screen.getByText(/Movement grid with 0 available exits/)
    expect(description).toBeInTheDocument()
  })
})
