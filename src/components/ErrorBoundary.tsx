
import React from 'react';
import { X } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error.message || String(error) };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-6 text-center">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-6">
              <X size={32} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">糟糕，出错了</h2>
            <p className="text-stone-500 text-sm mb-8">
              系统遇到了一些问题。请尝试刷新页面或联系我们。
            </p>
            {this.state.errorInfo && (
              <pre className="text-[10px] bg-stone-100 p-4 rounded-xl text-left overflow-auto max-h-40 mb-8">
                {this.state.errorInfo}
              </pre>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-stone-800 text-white rounded-full text-sm font-bold shadow-lg"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
