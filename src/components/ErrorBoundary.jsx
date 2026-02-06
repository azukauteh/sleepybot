import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error caught:', error);
    console.error('Error info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#0f172a', 
          color: 'white', 
          padding: '40px',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#ef4444', fontSize: '32px', marginBottom: '20px' }}>
            🚨 SleepyBot Error
          </h1>
          <div style={{ 
            background: '#1e293b', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #ef4444'
          }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '10px' }}>Error:</h2>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#fca5a5' }}>
              {this.state.error?.toString()}
            </pre>
          </div>
          
          <div style={{ 
            background: '#1e293b', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '10px' }}>Stack Trace:</h2>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#94a3b8' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#6366f1',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
