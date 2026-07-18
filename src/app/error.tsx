"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black px-6">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-display font-bold text-white/10 mb-6">500</div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/50 mb-8">
          A stellar anomaly interrupted your journey. Our crew has been notified.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
