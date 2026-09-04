'use client'

import { useState } from 'react'

export default function ErrorDemoPage() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('This is a demo error triggered by the button!')
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 font-bold text-3xl">Error Boundary Demo</h1>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Trigger Error
      </button>
    </main>
  )
}