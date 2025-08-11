import PropTypes from 'prop-types'
import ActionButton from './ActionButton'

/**
 * Specialized leave button component
 */
const LeaveButton = ({ 
  taskPercentage, 
  isVisible = true, 
  onClick,
  className = "" 
}) => {
  if (!isVisible) {
    return null
  }

  const isEnabled = taskPercentage === 100
  const finalClass = isEnabled ? "glow" : "inactive-action"
  
  return (
    <ActionButton
      action="Leave?"
      isActive={false}
      isEnabled={isEnabled}
      onClick={onClick}
      className={`${finalClass} ${className}`.trim()}
    >
      Leave?
    </ActionButton>
  )
}

LeaveButton.propTypes = {
  taskPercentage: PropTypes.number.isRequired,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default LeaveButton
