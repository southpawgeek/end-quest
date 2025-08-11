import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import { getTaskCompletionText } from '../../utils/text'

/**
 * Component that renders a list of tasks with enhanced accessibility
 */
const TaskList = memo(({ tasks, visitedRooms, className = "", config = {} }) => {
  const taskItems = useMemo(() => 
    tasks.map((task) => (
      <TaskItem
        key={task.key}
        task={task}
        isCompleted={visitedRooms.includes(task.key)}
      />
    )), [tasks, visitedRooms]
  )

  const completedCount = useMemo(() => 
    tasks.filter(task => visitedRooms.includes(task.key)).length, 
    [tasks, visitedRooms]
  )

  const taskDescription = getTaskCompletionText(completedCount, tasks.length, config)
  const ui = config.ui || {}

  return (
    <ul 
      className={className}
      role="list"
      aria-label={ui.gameTasksLabel || "Game tasks"}
      aria-describedby="tasks-description"
    >
      {taskItems}
      <span id="tasks-description" className="sr-only">
        {taskDescription}
      </span>
    </ul>
  )
})

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  visitedRooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  config: PropTypes.object
}

export default TaskList
