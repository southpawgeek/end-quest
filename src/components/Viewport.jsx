import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
import useSound from "use-sound"
import soundDead from "../sounds/dead.wav"
import { useState } from "react"

const Viewport = () => {
  const {
    rooms,
    currentRoom,
    setCurrentRoom,
    addVisitedRoom,
    currentAction,
    setCurrentAction,
    setCurrentDescription,
  } = useGameProvider()

  const actions = currentRoom.actions

  let currentCursor = "default"

  if (currentAction === "examine") {
    currentCursor = "help"
  }
  if (currentAction === "use") {
    currentCursor = "pointer"
  }
  if (currentAction === "take") {
    currentCursor = "grab"
  }
  if (currentAction === "hit") {
    currentCursor = "grabbing"
  }

  const [playbackRate, setPlaybackRate] = useState(1.2)
  const [dead] = useSound(soundDead, { playbackRate })

  const handleAction = (sector) => {
    if (actions?.[sector]?.[currentAction]?.description) {
      setCurrentDescription(actions[sector][currentAction].description)
      setCurrentAction("")
    }

    if (actions?.[sector]?.[currentAction]?.nextRoom) {
      const nextRoom = rooms[actions[sector][currentAction].nextRoom]
      setCurrentRoom(nextRoom)
      addVisitedRoom(nextRoom.key)
      setCurrentDescription(nextRoom.description)
      setCurrentAction("")
      // if it's a death room, play the sound
      if (nextRoom.key.includes("death")) {
        dead()
        setPlaybackRate(playbackRate - 0.1)
      }
    }
  }

  // 9x9 action grid
  const rows = [
    ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"],
    ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"],
    ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
    ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"],
    ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9"],
    ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"],
    ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"],
    ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9"],
    ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"],
  ]

  return (
    <div
      id="viewport"
      className={css`
        background: url(./images/${currentRoom?.image});
        background-size: cover;
        cursor: ${currentCursor};
      `}
    >
      <table id="actions-grid">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => (
                <td
                  key={cell}
                  onClick={() => handleAction(cell)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Viewport
