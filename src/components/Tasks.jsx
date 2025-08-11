import React, { memo } from 'react'
import { useGameProvider } from "../hooks/useGameProvider"
import TaskList from "./tasks/TaskList"

/**
 * Main Tasks component that manages the task interface
 */
const Tasks = memo(() => {
  const { tasks, visitedRooms, config } = useGameProvider()

  return (
    <div id="tasks">
      <h2>{config.ui.tasksHeader}</h2>
      <hr />
      <TaskList
        tasks={tasks}
        visitedRooms={visitedRooms}
        config={config}
      />
    </div>
  )
})

Tasks.displayName = 'Tasks'

export default Tasks
