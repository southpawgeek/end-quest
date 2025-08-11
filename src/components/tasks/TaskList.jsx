import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

/**
 * Component that renders a list of tasks
 */
const TaskList = ({ tasks, visitedRooms, className = "" }) => {
  return (
    <ul className={className}>
      {tasks.map((task) => (
        <TaskItem
          key={task.key}
          task={task}
          isCompleted={visitedRooms.includes(task.key)}
        />
      ))}
    </ul>
  )
}

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
