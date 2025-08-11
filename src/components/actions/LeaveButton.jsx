import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'
import { getLeaveButtonText } from '../../utils/text'

/**
 * Specialized leave button component with enhanced accessibility
 */
const LeaveButton = memo(({ 
  taskPercentage, 
  isVisible = true, 
  onClick,
  className = "",
  config = {}
}) => {
  if (!isVisible) {
    return null
  }

  const isEnabled = taskPercentage === 100
  const finalClass = isEnabled ? "glow" : "inactive-action"
  
  const ariaLabel = getLeaveButtonText(taskPercentage, config)
  const ui = config.ui || {}
  
  return (
    <ActionButton
      action={ui.leaveButton || "Leave?"}
      isActive={false}
      isEnabled={isEnabled}
      onClick={onClick}
      className={`${finalClass} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {ui.leaveButton || "Leave?"}
    </ActionButton>
  )
})

LeaveButton.propTypes = {
  taskPercentage: PropTypes.number.isRequired,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  config: PropTypes.object
}

export default LeaveButton
