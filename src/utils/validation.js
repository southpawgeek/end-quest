// Runtime validation for game cartridge data

/**
 * Validates that a value is a string
 */
const isString = (value) => typeof value === 'string'

/**
 * Validates that a value is an array
 */
const isArray = (value) => Array.isArray(value)

/**
 * Validates that a value is an object
 */
const isObject = (value) => typeof value === 'object' && value !== null && !isArray(value)

/**
 * Validates that a value is a number
 */
const isNumber = (value) => typeof value === 'number'

/**
 * Validates that a value is a boolean
 */
const isBoolean = (value) => typeof value === 'boolean'

/**
 * Validates the game configuration
 */
const validateConfig = (config) => {
  const errors = []
  
  if (!isObject(config)) {
    errors.push('Config must be an object')
    return errors
  }
  
  if (!isArray(config.actions)) {
    errors.push('Config.actions must be an array')
  } else {
    config.actions.forEach((action, index) => {
      if (!isString(action)) {
        errors.push(`Config.actions[${index}] must be a string`)
      }
    })
  }
  
  if (!isString(config.startingRoom)) {
    errors.push('Config.startingRoom must be a string')
  }
  
  if (!isString(config.epilogueRoom)) {
    errors.push('Config.epilogueRoom must be a string')
  }
  
  // Validate UI text if present
  if (config.ui !== undefined) {
    if (!isObject(config.ui)) {
      errors.push('Config.ui must be an object')
    } else {
      if (config.ui.actionPrompt !== undefined && !isString(config.ui.actionPrompt)) {
        errors.push('Config.ui.actionPrompt must be a string')
      }
      if (config.ui.cannotLeaveMessage !== undefined && !isString(config.ui.cannotLeaveMessage)) {
        errors.push('Config.ui.cannotLeaveMessage must be a string')
      }
    }
  }
  
  return errors
}

/**
 * Validates an action set
 */
const validateActionSet = (actionSet, actionSetName) => {
  const errors = []
  
  if (!isObject(actionSet)) {
    errors.push(`ActionSet ${actionSetName} must be an object`)
    return errors
  }
  
  // Check each action in the action set
  Object.entries(actionSet).forEach(([actionName, actionData]) => {
    if (!isObject(actionData)) {
      errors.push(`ActionSet ${actionSetName}.${actionName} must be an object`)
      return
    }
    
    // Validate description if present
    if (actionData.description !== undefined) {
      if (!isArray(actionData.description)) {
        errors.push(`ActionSet ${actionSetName}.${actionName}.description must be an array`)
      } else {
        actionData.description.forEach((desc, index) => {
          if (!isString(desc)) {
            errors.push(`ActionSet ${actionSetName}.${actionName}.description[${index}] must be a string`)
          }
        })
      }
    }
    
    // Validate nextRoom if present
    if (actionData.nextRoom !== undefined && !isString(actionData.nextRoom)) {
      errors.push(`ActionSet ${actionSetName}.${actionName}.nextRoom must be a string`)
    }
  })
  
  return errors
}

/**
 * Validates action sets
 */
const validateActionSets = (actionSets) => {
  const errors = []
  
  if (!isObject(actionSets)) {
    errors.push('ActionSets must be an object')
    return errors
  }
  
  Object.entries(actionSets).forEach(([actionSetName, actionSet]) => {
    const actionSetErrors = validateActionSet(actionSet, actionSetName)
    errors.push(...actionSetErrors)
  })
  
  return errors
}

/**
 * Validates an interactable
 */
const validateInteractable = (interactable, interactableName) => {
  const errors = []
  
  if (!isObject(interactable)) {
    errors.push(`Interactable ${interactableName} must be an object`)
    return errors
  }
  
  if (!isString(interactable.name)) {
    errors.push(`Interactable ${interactableName}.name must be a string`)
  }
  
  if (!isNumber(interactable.x)) {
    errors.push(`Interactable ${interactableName}.x must be a number`)
  }
  
  if (!isNumber(interactable.y)) {
    errors.push(`Interactable ${interactableName}.y must be a number`)
  }
  
  if (!isNumber(interactable.width)) {
    errors.push(`Interactable ${interactableName}.width must be a number`)
  }
  
  if (!isNumber(interactable.height)) {
    errors.push(`Interactable ${interactableName}.height must be a number`)
  }
  
  if (!isObject(interactable.actions)) {
    errors.push(`Interactable ${interactableName}.actions must be an object`)
  }
  
  return errors
}

/**
 * Validates a room
 */
const validateRoom = (room, roomName) => {
  const errors = []
  
  if (!isObject(room)) {
    errors.push(`Room ${roomName} must be an object`)
    return errors
  }
  
  if (!isString(room.key)) {
    errors.push(`Room ${roomName}.key must be a string`)
  }
  
  if (!isString(room.name)) {
    errors.push(`Room ${roomName}.name must be a string`)
  }
  
  if (!isString(room.image)) {
    errors.push(`Room ${roomName}.image must be a string`)
  }
  
  if (!isArray(room.description)) {
    errors.push(`Room ${roomName}.description must be an array`)
  } else {
    room.description.forEach((desc, index) => {
      if (!isString(desc)) {
        errors.push(`Room ${roomName}.description[${index}] must be a string`)
      }
    })
  }
  
  if (room.exits !== undefined && !isObject(room.exits)) {
    errors.push(`Room ${roomName}.exits must be an object`)
  }
  
  if (room.interactables !== undefined) {
    if (!isArray(room.interactables)) {
      errors.push(`Room ${roomName}.interactables must be an array`)
    } else {
      room.interactables.forEach((interactable, index) => {
        const interactableErrors = validateInteractable(interactable, `${roomName}.interactables[${index}]`)
        errors.push(...interactableErrors)
      })
    }
  }
  
  if (room.isDeath !== undefined && !isBoolean(room.isDeath)) {
    errors.push(`Room ${roomName}.isDeath must be a boolean`)
  }
  
  return errors
}

/**
 * Validates rooms
 */
const validateRooms = (rooms) => {
  const errors = []
  
  if (!isObject(rooms)) {
    errors.push('Rooms must be an object')
    return errors
  }
  
  Object.entries(rooms).forEach(([roomName, room]) => {
    const roomErrors = validateRoom(room, roomName)
    errors.push(...roomErrors)
  })
  
  return errors
}

/**
 * Validates tasks
 */
const validateTasks = (tasks) => {
  const errors = []
  
  if (!isArray(tasks)) {
    errors.push('Tasks must be an array')
    return errors
  }
  
  tasks.forEach((task, index) => {
    if (!isObject(task)) {
      errors.push(`Task[${index}] must be an object`)
      return
    }
    
    if (!isString(task.key)) {
      errors.push(`Task[${index}].key must be a string`)
    }
    
    if (!isString(task.name)) {
      errors.push(`Task[${index}].name must be a string`)
    }
  })
  
  return errors
}

/**
 * Validates the complete game cartridge
 */
export const validateCartridge = (cartridge) => {
  const errors = []
  
  if (!isObject(cartridge)) {
    errors.push('Cartridge must be an object')
    return errors
  }
  
  // Validate config
  if (!isObject(cartridge.config)) {
    errors.push('Cartridge.config must be an object')
  } else {
    const configErrors = validateConfig(cartridge.config)
    errors.push(...configErrors)
  }
  
  // Validate content
  if (!isObject(cartridge.content)) {
    errors.push('Cartridge.content must be an object')
  } else {
    const content = cartridge.content
    
    // Validate actionSets
    if (!isObject(content.actionSets)) {
      errors.push('Cartridge.content.actionSets must be an object')
    } else {
      const actionSetErrors = validateActionSets(content.actionSets)
      errors.push(...actionSetErrors)
    }
    
    // Validate rooms
    if (!isObject(content.rooms)) {
      errors.push('Cartridge.content.rooms must be an object')
    } else {
      const roomErrors = validateRooms(content.rooms)
      errors.push(...roomErrors)
    }
    
    // Validate tasks
    if (!isArray(content.tasks)) {
      errors.push('Cartridge.content.tasks must be an array')
    } else {
      const taskErrors = validateTasks(content.tasks)
      errors.push(...taskErrors)
    }
  }
  
  return errors
}

/**
 * Validates and logs any errors found in the cartridge
 * This is called by the game engine to ensure cartridge integrity
 */
export const validateAndLogCartridge = (cartridge) => {
  const errors = validateCartridge(cartridge)
  
  if (errors.length > 0) {
    console.error('🚨 Game Engine: Cartridge validation failed!')
    console.error('The cartridge data contains errors that may cause the game to malfunction:')
    errors.forEach(error => console.error(`  - ${error}`))
    console.error('Please fix these errors in your cartridge data before running the game.')
    return false
  }
  
  console.log('✅ Game Engine: Cartridge validation passed!')
  return true
}
