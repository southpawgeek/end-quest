import { useGameProvider } from "../hooks/useGameProvider"

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
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
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
