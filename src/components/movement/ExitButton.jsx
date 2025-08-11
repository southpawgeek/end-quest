import PropTypes from 'prop-types'

/**
 * Individual exit button component
 */
const ExitButton = ({ exit, onClick, className = "" }) => {
  const exitName = exit?.name || "N/A"
  
  return (
    <td
      className={`exit ${className}`.trim()}
      data-exit={exitName}
    >
      <button 
        onClick={() => onClick(exit)}
        aria-label={`Exit to ${exitName}`}
      />
    </td>
  )
}

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
