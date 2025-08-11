import React from 'react'
import PropTypes from 'prop-types'

/**
 * Error boundary for game-specific errors
 */
class GameErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Game Error Boundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    // Optionally reload the page or reset game state
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const { config = {} } = this.props
      const ui = config.ui || {}
      
      return (
        <div className="error-boundary">
          <h2>{ui.gameError || "Something went wrong with the game."}</h2>
          <p>{ui.gameErrorMessage || "The game encountered an unexpected error and needs to restart."}</p>
          <button onClick={this.handleReset}>
            {ui.restartGame || "Restart Game"}
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>{ui.errorDetails || "Error Details (Development)"}</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

GameErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object
}

export default GameErrorBoundary
