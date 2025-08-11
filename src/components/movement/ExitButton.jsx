import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

/**
 * Individual exit button component with enhanced accessibility
 */
const ExitButton = memo(({ exit, onClick, className = "", config = {} }) => {
  const exitName = exit?.name || "N/A"
  
  const handleClick = useCallback(() => {
    onClick(exit)
  }, [onClick, exit])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(exit)
    }
  }, [onClick, exit])

  const ui = config.ui || {}
  const exitLabel = (ui.exitToLabel || "Exit to {name}").replace('{name}', exitName)
  const exitDescription = (ui.exitDescription || "Press Enter or Space to exit to {name}").replace('{name}', exitName)
  
  return (
    <td
      className={`exit ${className}`.trim()}
      data-exit={exitName}
    >
      <button 
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={exitLabel}
        aria-describedby={`exit-${exitName}-desc`}
        tabIndex={0}
      >
        <span className="sr-only">{exitLabel}</span>
      </button>
      <span id={`exit-${exitName}-desc`} className="sr-only">
        {exitDescription}
      </span>
    </td>
  )
})

ExitButton.propTypes = {
  exit: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  config: PropTypes.object
}

export default ExitButton
