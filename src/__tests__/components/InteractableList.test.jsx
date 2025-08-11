import React from 'react'
import { render, screen } from '@testing-library/react'
import InteractableList from '../../components/viewport/InteractableList'

describe('InteractableList', () => {
  const mockInteractables = [
    {
      name: 'test-object-1',
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      actions: { examine: {} }
    },
    {
      name: 'test-object-2',
      x: 200,
      y: 200,
      width: 50,
      height: 50,
      actions: { use: {} }
    }
  ]
  const mockOnInteraction = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all interactables as PIXI sprites', () => {
    render(
      <InteractableList
        interactables={mockInteractables}
        onInteraction={mockOnInteraction}
      />
    )
    // The Interactable component renders as PIXI sprites with data-testid="pixi-sprite"
    const sprites = screen.getAllByTestId('pixi-sprite')
    expect(sprites).toHaveLength(2)
  })

  it('returns null when no interactables provided', () => {
    const { container } = render(
      <InteractableList
        interactables={[]}
        onInteraction={mockOnInteraction}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('returns null when interactables is null', () => {
    const { container } = render(
      <InteractableList
        interactables={null}
        onInteraction={mockOnInteraction}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('returns null when interactables is undefined', () => {
    const { container } = render(
      <InteractableList
        interactables={undefined}
        onInteraction={mockOnInteraction}
      />
    )
    expect(container.firstChild).toBeNull()
  })
})
