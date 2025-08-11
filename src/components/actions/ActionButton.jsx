import PropTypes from 'prop-types'

/**
 * Reusable action button component
 */
const ActionButton = ({ 
  action, 
  isActive, 
  isEnabled = true, 
  onClick, 
  onCancel,
  className = "",
  children 
}) => {
  const baseClass = isActive ? "active-action" : "inactive-action"
  const finalClass = `${baseClass} ${className}`.trim()
  
  if (!isEnabled) {
    return (
      <span className={`${finalClass} disabled`}>
        {children || action}
      </span>
    )
  }

  if (isActive) {
    return (
      <>
        <span className={finalClass}>{children || action}</span>
        &nbsp;
        <span
          className="active-cancel"
          onClick={onCancel}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onCancel()
            }
          }}
        >
          [x]
        </span>
      </>
    )
  }

  return (
    <span
      className={finalClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {children || action}
    </span>
  )
}

ActionButton.propTypes = {
  action: PropTypes.string,
  isActive: PropTypes.bool,
  isEnabled: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

export default ActionButton
