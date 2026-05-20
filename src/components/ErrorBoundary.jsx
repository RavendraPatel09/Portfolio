import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: '#0a0a0f',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ color: '#00FF9D', marginBottom: '1rem' }}>Portfolio failed to load</h1>
          <p style={{ color: '#A0AEC0', marginBottom: '1rem' }}>
            Run <code style={{ color: '#00B4FF' }}>npm run dev</code> or{' '}
            <code style={{ color: '#00B4FF' }}>npm start</code> — do not open raw HTML without Vite.
          </p>
          <pre
            style={{
              background: '#111',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '13px',
              color: '#f88',
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
