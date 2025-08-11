import React, { memo } from 'react'
import { useGameProvider } from "../hooks/useGameProvider"
import ActionList from "./actions/ActionList"

/**
 * Main Actions component that manages the action interface
 */
const Actions = memo(() => {
  const {
    currentRoom,
    actions,
    currentAction,
    taskPercentage,
    handleCancelAction,
    handleLeaveAction,
    handleSelectAction,
  } = useGameProvider()

  return (
    <div id="actions">
      <h2>Actions</h2>
      <hr />
      <ActionList
        actions={actions}
        currentAction={currentAction}
        taskPercentage={taskPercentage}
        currentRoomKey={currentRoom.key}
        onActionSelect={handleSelectAction}
        onActionCancel={handleCancelAction}
        onLeaveAction={handleLeaveAction}
      />
    </div>
  )
})

Actions.displayName = 'Actions'

export default Actions
