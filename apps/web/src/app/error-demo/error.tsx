'use client'
 
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
 
export default function ErrorDemoBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const correlationId = useMemo(
    () => `err-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    []
  )

  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: Intentional for error reporting demonstration
    console.error('Error demo boundary caught:', {
      correlationId,
      digest: error.digest,
      message: error.message,
      timestamp: new Date().toISOString(),
      location: '/error-demo',
    })
  }, [correlationId, error])
 
  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-6">
        <h2 className="mb-2 font-bold text-xl text-orange-800">
          Demo Error Caught!
        </h2>
        <p className="mb-4 text-orange-700">
          This error was caught by the nested error boundary in /error-demo.
        </p>
        <p className="mb-4 font-mono text-orange-600 text-sm">
          {error.message}
        </p>
        <p className="mb-4 font-mono text-orange-600 text-sm">
          Correlation ID: {correlationId}
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-orange-500 text-xs">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Try Again
          </button>
          <Link
            href="/error-demo"
            className="rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-100"
          >
            Reload Page
          </Link>
        </div>
      </div>
    </div>
  )
}