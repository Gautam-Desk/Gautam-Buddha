import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Sanctuary Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-temple-950 p-6 text-center text-temple-50">
          <div className="max-w-md rounded-3xl border border-gold-500/30 bg-temple-900/90 p-8 shadow-2xl backdrop-blur-xl">
            <span className="text-4xl text-gold-400">☸</span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-gold-300">
              Peace in the Present Moment
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-temple-100 sm:text-sm">
              All conditioned things are subject to change. A visual element encountered an interruption.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 rounded-full bg-gradient-to-r from-gold-500 to-saffron-500 px-6 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-temple-950 shadow-lg transition hover:brightness-110 active:scale-95"
            >
              Restore Sanctuary
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
