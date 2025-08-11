import PropTypes from 'prop-types'
import ActionButton from './ActionButton'
import LeaveButton from './LeaveButton'

/**
 * Component that renders a list of available actions
 */
const ActionList = ({ 
  actions, 
  currentAction, 
  taskPercentage, 
  currentRoomKey,
  onActionSelect, 
  onActionCancel, 
  onLeaveAction 
}) => {
  return (
    <ul>
      {actions.map((action) => (
        <li key={action}>
          <ActionButton
            action={action}
            isActive={action === currentAction}
            onClick={() => onActionSelect(action)}
            onCancel={onActionCancel}
          />
        </li>
      ))}
      <li>
        <LeaveButton
          taskPercentage={taskPercentage}
          isVisible={currentRoomKey !== "epilogue"}
          onClick={onLeaveAction}
        />
      </li>
    </ul>
  )
}

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAction: PropTypes.string.isRequired,
  taskPercentage: PropTypes.number.isRequired,
  currentRoomKey: PropTypes.string.isRequired,
  onActionSelect: PropTypes.func.isRequired,
  onActionCancel: PropTypes.func.isRequired,
  onLeaveAction: PropTypes.func.isRequired
}

export default ActionList
