import { useGameProvider } from "../hooks/useGameProvider"
import TaskList from "./tasks/TaskList"

/**
 * Main Tasks component that manages the task interface
 */
const Tasks = () => {
  const { tasks, visitedRooms } = useGameProvider()

  return (
    <div id="tasks">
      <h2>Tasks</h2>
      <hr />
      <TaskList
        tasks={tasks}
        visitedRooms={visitedRooms}
      />
    </div>
  )
}

export default Tasks
