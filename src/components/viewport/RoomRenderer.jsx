import PropTypes from 'prop-types'
import RoomSprite from '../RoomSprite'
import DeathRoom from '../DeathRoom'

/**
 * Component that renders the appropriate room type
 */
const RoomRenderer = ({ currentRoom }) => {
  if (!currentRoom) {
    return null
  }

  if (currentRoom.isDeath) {
    return <DeathRoom currentRoom={currentRoom} />
  }

  return <RoomSprite currentRoom={currentRoom} />
}

RoomRenderer.propTypes = {
  currentRoom: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    isDeath: PropTypes.bool,
    exits: PropTypes.object,
    interactables: PropTypes.array
  })
}

export default RoomRenderer
