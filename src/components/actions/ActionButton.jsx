import React, { useCallback, memo } from 'react'
import PropTypes from 'prop-types'

/**
 * Reusable action button component with enhanced accessibility
 */
const ActionButton = memo(({ 
  action, 
  isActive, 
  isEnabled = true, 
  onClick, 
  onCancel,
  className = "",
  children,
  config = {}
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

  const buttonText = children || action
  
  // Provide fallback values for config.ui properties
  const ui = config.ui || {}
  const ariaLabel = isActive 
    ? (ui.actionActiveLabel || `${buttonText} (active - press to cancel)`).replace('{action}', buttonText)
    : (ui.actionSelectLabel || `${buttonText} (press to select)`).replace('{action}', buttonText)
  
  if (!isEnabled) {
    return (
      <span 
        className={`${finalClass} disabled`}
        aria-label={(ui.actionDisabledLabel || `${buttonText} (disabled)`).replace('{action}', buttonText)}
        role="button"
        aria-disabled="true"
      >
        {buttonText}
      </span>
    )
  }

  if (isActive) {
    return (
      <>
        <span 
          className={finalClass}
          aria-label={ariaLabel}
          role="button"
          aria-pressed="true"
        >
          {buttonText}
        </span>
        &nbsp;
        <span
          className="active-cancel"
          onClick={handleCancel}
          role="button"
          tabIndex={0}
          onKeyDown={handleCancelKeyDown}
          aria-label={(ui.cancelActionLabel || `Cancel ${buttonText} action`).replace('{action}', buttonText)}
          aria-describedby={`cancel-${action}-desc`}
        >
          [x]
        </span>
        <span id={`cancel-${action}-desc`} className="sr-only">
          {(ui.cancelActionDescription || `Press to cancel the ${buttonText} action`).replace('{action}', buttonText)}
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
      aria-label={ariaLabel}
      aria-pressed="false"
      aria-describedby={`${action}-desc`}
    >
      {buttonText}
      <span id={`${action}-desc`} className="sr-only">
        {(ui.actionDescription || `Press Enter or Space to select ${buttonText} action`).replace('{action}', buttonText)}
      </span>
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
  children: PropTypes.node,
  config: PropTypes.object
}

ActionButton.displayName = 'ActionButton'

export default ActionButton
