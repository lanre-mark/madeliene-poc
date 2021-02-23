import React, { Component, ErrorInfo } from "react";

import {Props, State} from '../../common/types';

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: _ };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Use fall back component instead of h1 message
      return <this.props.FallbackComponent error={this.state.error} />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;