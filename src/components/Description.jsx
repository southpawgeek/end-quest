import { ReactTyped } from "react-typed"
import { useGameProvider } from "../hooks/useGameProvider"
const Description = () => {
  const { currentRoom, currentDescription } = useGameProvider()
  return (
    <div id="description">
      <h1>{currentRoom.name}</h1>
      <hr />
      <p>
        <ReactTyped
          strings={currentDescription}
          typeSpeed={1}
          showCursor={false}
        />
      </p>
    </div>
  )
}

export default Description
