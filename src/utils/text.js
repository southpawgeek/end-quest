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
 * Gets a UI text string from the game config
 * @param {object} config - Game configuration object
 * @param {string} key - Text key (e.g., 'actionPrompt', 'cannotLeaveMessage')
 * @param {object} variables - Variables for interpolation
 * @returns {string} - Interpolated text string
 */
export const getUIText = (config, key, variables = {}) => {
  const text = config.ui?.[key]
  if (!text) {
    console.warn(`UI text key '${key}' not found in config`)
    return key
  }
  return interpolateText(text, variables)
}
