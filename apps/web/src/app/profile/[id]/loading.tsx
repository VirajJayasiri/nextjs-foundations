export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="space-y-6">
        {/* Header skeleton */}
        <section className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
        </section>

        {/* Stats skeleton */}
        <section className="flex gap-4">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        </section>

        {/* Activity skeleton */}
        <section className="space-y-3">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </section>
      </div>
    </main>
  );
}
