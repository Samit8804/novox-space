"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function MoonError({
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
        <div className="text-8xl font-display font-bold text-white/10 mb-6">404</div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">Moon not found</h1>
        <p className="text-white/50 mb-8">
          This moon has drifted out of range or failed to load.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            <span>Try Again</span>
          </button>
          <Link href="/solar-system" className="btn-secondary">
            View Solar System
          </Link>
        </div>
      </div>
    </div>
  );
}
