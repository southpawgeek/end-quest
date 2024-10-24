import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
import { Stage } from "@pixi/react"
import RoomSprite from "./RoomSprite"

const Viewport = () => {
  const { currentRoom, currentAction, handleActionClick } = useGameProvider()

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
        cursor: ${currentCursor};
      `}
    >
      {/* <table id="actions-grid">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => (
                <td
                  key={cell}
                  onClick={() => handleActionClick(cell)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}

      <Stage
        width={495}
        height={495}
      >
        <RoomSprite currentRoom={currentRoom} />
      </Stage>
    </div>
  )

  // return (
  //   <div
  //     id="viewport"
  //     className={css`
  //       background: url(./images/${currentRoom?.image}?t=241005);
  //       background-size: cover;
  //       cursor: ${currentCursor};
  //     `}
  //   >
  //     <table id="actions-grid">
  //       <tbody>
  //         {rows.map((row, rowIndex) => (
  //           <tr key={rowIndex}>
  //             {row.map((cell) => (
  //               <td
  //                 key={cell}
  //                 onClick={() => handleActionClick(cell)}
  //               >
  //                 {cell}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}

export default Viewport
