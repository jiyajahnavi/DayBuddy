import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("DayBuddy ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#F4F7F5',
            color: '#0D233A',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '550px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '2px solid #F87171'
            }}
          >
            <AlertTriangle size={56} style={{ color: '#DC2626', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Oops! Something unexpected happened.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#52657A', marginBottom: '1.5rem' }}>
              Don't worry, Margaret! DayBuddy AI can safely reset and restore your session.
            </p>
            <button 
              className="btn-pill"
              onClick={this.handleReload}
              style={{
                background: '#0D9488',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                fontSize: '1.2rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={22} />
              <span>Tap Here to Reload DayBuddy</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
