import React from 'react'
import PropTypes from 'prop-types'

/**
 * Error boundary for room-specific errors
 */
class RoomErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Room Error Boundary caught an error:', error, errorInfo)
    this.setState({ error })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="room-error">
          <h3>Room Loading Error</h3>
          <p>There was a problem loading this room.</p>
          <button onClick={this.handleRetry}>
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>Error Details (Development)</summary>
              {this.state.error && this.state.error.toString()}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

RoomErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default RoomErrorBoundary
