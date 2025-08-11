import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'
import LeaveButton from './LeaveButton'

/**
 * Component that renders a list of available actions with enhanced accessibility
 */
const ActionList = memo(({ 
  actions, 
  currentAction, 
  taskPercentage, 
  currentRoomKey,
  onActionSelect, 
  onActionCancel, 
  onLeaveAction,
  config = {}
}) => {
  const actionButtons = useMemo(() => 
    actions.map((action) => (
      <li key={action}>
        <ActionButton
          action={action}
          isActive={action === currentAction}
          onClick={() => onActionSelect(action)}
          onCancel={onActionCancel}
          config={config}
        />
      </li>
    )), [actions, currentAction, onActionSelect, onActionCancel, config]
  )

  const ui = config.ui || {}

  return (
    <ul role="listbox" aria-label={ui.availableActionsLabel || "Available actions"} aria-describedby="actions-description">
      {actionButtons}
      <li>
        <LeaveButton
          taskPercentage={taskPercentage}
          isVisible={currentRoomKey !== "epilogue"}
          onClick={onLeaveAction}
          config={config}
        />
      </li>
      <span id="actions-description" className="sr-only">
        {ui.actionsDescription || "Select an action to perform on objects in the current room."}
        {currentAction !== "default" && ` Currently selected: ${currentAction}`}
      </span>
    </ul>
  )
})

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAction: PropTypes.string.isRequired,
  taskPercentage: PropTypes.number.isRequired,
  currentRoomKey: PropTypes.string.isRequired,
  onActionSelect: PropTypes.func.isRequired,
  onActionCancel: PropTypes.func.isRequired,
  onLeaveAction: PropTypes.func.isRequired,
  config: PropTypes.object
}

export default ActionList
