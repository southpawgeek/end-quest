import React, { memo } from 'react'
import PropTypes from 'prop-types'

/**
 * Individual task item component
 */
const TaskItem = memo(({ task, isCompleted, className = "" }) => {
  const taskClass = isCompleted ? "task-completed" : ""
  const finalClass = `${taskClass} ${className}`.trim()
  
  return (
    <li className={finalClass}>
      {task.name}
    </li>
  )
})

TaskItem.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  isCompleted: PropTypes.bool,
  className: PropTypes.string
}

TaskItem.displayName = 'TaskItem'

export default TaskItem
