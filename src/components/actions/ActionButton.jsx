import React, { useCallback, memo } from 'react'
import PropTypes from 'prop-types'

/**
 * Reusable action button component
 */
const ActionButton = memo(({ 
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
  
  const handleClick = useCallback(() => {
    if (onClick) onClick()
  }, [onClick])
  
  const handleCancel = useCallback(() => {
    if (onCancel) onCancel()
  }, [onCancel])
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (onClick) onClick()
    }
  }, [onClick])
  
  const handleCancelKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (onCancel) onCancel()
    }
  }, [onCancel])
  
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
          onClick={handleCancel}
          role="button"
          tabIndex={0}
          onKeyDown={handleCancelKeyDown}
        >
          [x]
        </span>
      </>
    )
  }

  return (
    <span
      className={finalClass}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children || action}
    </span>
  )
})

ActionButton.propTypes = {
  action: PropTypes.string,
  isActive: PropTypes.bool,
  isEnabled: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
}

ActionButton.displayName = 'ActionButton'

export default ActionButton
