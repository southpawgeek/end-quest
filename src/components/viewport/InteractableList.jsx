import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import Interactable from '../Interactable'

/**
 * Component that renders all interactables in a room
 */
const InteractableList = memo(({ interactables, onInteraction }) => {
  if (!interactables || interactables.length === 0) {
    return null
  }

  const interactableElements = useMemo(() => 
    interactables.map((interactable) => (
      <Interactable
        key={interactable.name}
        interactable={interactable}
        handler={onInteraction}
      />
    )), [interactables, onInteraction]
  )

  return <>{interactableElements}</>
})

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

InteractableList.displayName = 'InteractableList'

export default InteractableList
