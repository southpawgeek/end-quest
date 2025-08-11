import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

/**
 * Individual exit button component
 */
const ExitButton = memo(({ exit, onClick, className = "" }) => {
  const exitName = exit?.name || "N/A"
  
  const handleClick = useCallback(() => {
    onClick(exit)
  }, [onClick, exit])
  
  return (
    <td
      className={`exit ${className}`.trim()}
      data-exit={exitName}
    >
      <button 
        onClick={handleClick}
        aria-label={`Exit to ${exitName}`}
      />
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
  className: PropTypes.string
}

export default ExitButton
