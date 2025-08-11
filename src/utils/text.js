/**
 * Utility functions for text handling and localization
 */

/**
 * Interpolates variables into a string template
 * @param {string} template - String template with {variable} placeholders
 * @param {object} variables - Object containing variable values
 * @returns {string} - Interpolated string
 */
export const interpolateText = (template, variables) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match
  })
}

/**
 * Gets UI text from the game config with parameter substitution
 * @param {Object} config - Game configuration object
 * @param {string} key - UI text key
 * @param {Object} params - Parameters to substitute in the text
 * @returns {string} The localized text with parameters substituted
 */
export const getUIText = (config, key, params = {}) => {
  if (!config?.ui?.[key]) {
    console.warn(`UI text key "${key}" not found in config`)
    return key
  }
  
  let text = config.ui[key]
  
  // Substitute parameters in the text
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(new RegExp(`{${param}}`, 'g'), value)
  })
  
  return text
}

/**
 * Gets a formatted task completion message
 * @param {number} completed - Number of completed tasks
 * @param {number} total - Total number of tasks
 * @param {Object} config - Game configuration object
 * @returns {string} Formatted task completion message
 */
export const getTaskCompletionText = (completed, total, config) => {
  if (!config?.ui) {
    return `${completed} of ${total} tasks completed.`
  }
  
  const baseText = getUIText(config, 'tasksDescription', { completed, total })
  
  if (completed === total) {
    return `${baseText} ${getUIText(config, 'tasksAllCompleted')}`
  }
  
  return baseText
}

/**
 * Gets a formatted leave button text
 * @param {number} taskPercentage - Task completion percentage
 * @param {Object} config - Game configuration object
 * @returns {string} Formatted leave button text
 */
export const getLeaveButtonText = (taskPercentage, config) => {
  if (!config?.ui) {
    return taskPercentage === 100 
      ? "Leave the house (all tasks completed)"
      : `Leave the house (${taskPercentage}% of tasks completed, need 100%)`
  }
  
  if (taskPercentage === 100) {
    return getUIText(config, 'leaveButtonEnabled')
  }
  
  return getUIText(config, 'leaveButtonDisabled', { percentage: taskPercentage })
}
