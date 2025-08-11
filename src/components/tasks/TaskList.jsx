import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

/**
 * Component that renders a list of tasks
 */
const TaskList = memo(({ tasks, visitedRooms, className = "" }) => {
  const taskItems = useMemo(() => 
    tasks.map((task) => (
      <TaskItem
        key={task.key}
        task={task}
        isCompleted={visitedRooms.includes(task.key)}
      />
    )), [tasks, visitedRooms]
  )

  return (
    <ul className={className}>
      {taskItems}
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
  className: PropTypes.string
}

export default TaskList
