import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { GAME_CONSTANTS } from "../../constants/game"
import ExitButton from './ExitButton'

/**
 * 3x3 movement grid component
 */
const MovementGrid = memo(({ exits, rooms, onExitClick, className = "" }) => {
  // 3x3 movement grid layout
  const rows = useMemo(() => [
    [GAME_CONSTANTS.GRID_COORDINATES.A1, GAME_CONSTANTS.GRID_COORDINATES.A2, GAME_CONSTANTS.GRID_COORDINATES.A3],
    [GAME_CONSTANTS.GRID_COORDINATES.B1, GAME_CONSTANTS.GRID_COORDINATES.B2, GAME_CONSTANTS.GRID_COORDINATES.B3],
    [GAME_CONSTANTS.GRID_COORDINATES.C1, GAME_CONSTANTS.GRID_COORDINATES.C2, GAME_CONSTANTS.GRID_COORDINATES.C3],
  ], [])

  const NoExit = memo(() => <td className="no-exit"></td>)

  const gridRows = useMemo(() => 
    rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell) =>
          exits?.[cell] ? (
            <ExitButton
              key={cell}
              exit={rooms[exits[cell]]}
              onClick={onExitClick}
            />
          ) : (
            <NoExit key={cell} />
          )
        )}
      </tr>
    )), [rows, exits, rooms, onExitClick]
  )

  return (
    <table className={className}>
      <tbody>
        {gridRows}
      </tbody>
    </table>
  )
})

MovementGrid.propTypes = {
  exits: PropTypes.object,
  rooms: PropTypes.object.isRequired,
  onExitClick: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default MovementGrid
