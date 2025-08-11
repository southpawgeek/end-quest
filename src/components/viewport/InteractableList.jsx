import PropTypes from 'prop-types'
import Interactable from '../Interactable'

/**
 * Component that renders all interactables in a room
 */
const InteractableList = ({ interactables, onInteraction }) => {
  if (!interactables || interactables.length === 0) {
    return null
  }

  return (
    <>
      {interactables.map((interactable) => (
        <Interactable
          key={interactable.name}
          interactable={interactable}
          handler={onInteraction}
        />
      ))}
    </>
  )
}

InteractableList.propTypes = {
  interactables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      actions: PropTypes.object.isRequired,
      image: PropTypes.string
    })
  ),
  onInteraction: PropTypes.func.isRequired
}

export default InteractableList
