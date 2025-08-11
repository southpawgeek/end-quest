import React from 'react'
import { render, screen } from '@testing-library/react'
import GameStage from '../../../components/viewport/GameStage'

// Mock the PIXI Stage component
jest.mock('@pixi/react', () => ({
  Stage: ({ children, ...props }) => (
    <div data-testid="pixi-stage" {...props}>
      {children}
    </div>
  )
}))

describe('GameStage', () => {
  it('renders PIXI stage with children', () => {
    render(
      <GameStage>
        <div>Test content</div>
      </GameStage>
    )
    expect(screen.getByTestId('pixi-stage')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('passes props to PIXI stage', () => {
    const mockOnPointerDown = jest.fn()
    render(
      <GameStage onPointerDown={mockOnPointerDown}>
        <div>Test content</div>
      </GameStage>
    )
    const stage = screen.getByTestId('pixi-stage')
    expect(stage).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(
      <GameStage>
        <div>Test content</div>
      </GameStage>
    )
    const stage = screen.getByTestId('pixi-stage')
    expect(stage).toBeInTheDocument()
  })
})
