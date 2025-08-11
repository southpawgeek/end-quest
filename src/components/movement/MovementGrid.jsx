import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { GAME_CONSTANTS } from "../../constants/game"
import ExitButton from './ExitButton'

/**
 * 3x3 movement grid component with enhanced accessibility
 */
const MovementGrid = memo(({ exits, rooms, onExitClick, className = "", config = {} }) => {
  // 3x3 movement grid layout
  const rows = useMemo(() => [
    [GAME_CONSTANTS.GRID_COORDINATES.A1, GAME_CONSTANTS.GRID_COORDINATES.A2, GAME_CONSTANTS.GRID_COORDINATES.A3],
    [GAME_CONSTANTS.GRID_COORDINATES.B1, GAME_CONSTANTS.GRID_COORDINATES.B2, GAME_CONSTANTS.GRID_COORDINATES.B3],
    [GAME_CONSTANTS.GRID_COORDINATES.C1, GAME_CONSTANTS.GRID_COORDINATES.C2, GAME_CONSTANTS.GRID_COORDINATES.C3],
  ], [])

  const ui = config.ui || {}

  const NoExit = memo(() => (
    <td className="no-exit" aria-label={ui.noExitAvailable || "No exit available"}>
      <span className="sr-only">{ui.noExitAvailable || "No exit available"}</span>
    </td>
  ))

  const gridRows = useMemo(() => 
    rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell) =>
          exits?.[cell] ? (
            <ExitButton
              key={cell}
              exit={rooms[exits[cell]]}
              onClick={onExitClick}
              config={config}
            />
          ) : (
            <NoExit key={cell} />
          )
        )}
      </tr>
    )), [rows, exits, rooms, onExitClick, config]
  )

  const availableExits = useMemo(() => 
    Object.keys(exits || {}).length, [exits]
  )

  const movementDescription = (ui.movementDescription || "Movement grid with {count} available exits. Use Tab to navigate between exits, then press Enter or Space to move.").replace('{count}', availableExits)

  return (
    <>
      <table 
        className={className}
        role="grid"
        aria-label={ui.movementGridLabel || "Movement grid"}
        aria-describedby="movement-description"
      >
        <tbody>
          {gridRows}
        </tbody>
      </table>
      <span id="movement-description" className="sr-only">
        {movementDescription}
      </span>
    </>
  )
})

MovementGrid.propTypes = {
  exits: PropTypes.object,
  rooms: PropTypes.object.isRequired,
  onExitClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  config: PropTypes.object
}

export default MovementGrid
