import { useGameProvider } from "../hooks/useGameProvider"
import { GAME_CONSTANTS } from "../constants/game"

const MoveGrid = () => {
  const { rooms, currentRoom, handleExit } = useGameProvider()
  const exits = currentRoom.exits

  const Exit = ({ exitName }) => {
    const exit = rooms[exitName]
    return (
      <td
        className="exit"
        data-exit={rooms[exitName]?.name || "N/A"}
      >
        <button onClick={() => handleExit(exit)} />
      </td>
    )
  }
  const NoExit = () => <td className="no-exit"></td>

  // 3x3 movement grid
  const rows = [
    [GAME_CONSTANTS.GRID_COORDINATES.A1, GAME_CONSTANTS.GRID_COORDINATES.A2, GAME_CONSTANTS.GRID_COORDINATES.A3],
    [GAME_CONSTANTS.GRID_COORDINATES.B1, GAME_CONSTANTS.GRID_COORDINATES.B2, GAME_CONSTANTS.GRID_COORDINATES.B3],
    [GAME_CONSTANTS.GRID_COORDINATES.C1, GAME_CONSTANTS.GRID_COORDINATES.C2, GAME_CONSTANTS.GRID_COORDINATES.C3],
  ]

  return (
    <div id="move-grid">
      <h2>Exits</h2>
      <table>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) =>
                exits?.[cell] ? (
                  <Exit
                    key={cell}
                    exitName={exits[cell]}
                  />
                ) : (
                  <NoExit key={cell} />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MoveGrid
