import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error);
    console.log('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Lo sentimos, algo salió mal.</h2>
          <p>Por favor, actualice la página o contacte con soporte si el problema persiste.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
