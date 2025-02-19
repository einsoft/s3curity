"use client";

import { Component, ReactNode } from "react";
import { IconAlertOctagon } from "@tabler/icons-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Don't show error UI for AbortError
    if (error.name === "AbortError") {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log errors that aren't AbortError
    if (error.name !== "AbortError") {
      console.error("Error Boundary caught:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="container mx-auto text-center">
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h2 className="text-red-700 font-medium flex items-center justify-center gap-2">
                <IconAlertOctagon /> Oops...
              </h2>
              {this.state.error && (
                <p className="text-red-600 text-sm mt-2">
                  {this.state.error.message}
                </p>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
