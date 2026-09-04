import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-3 font-bold text-4xl text-gray-900">Post Not Found</h1>
      <p className="mb-2 text-gray-600">
        The blog post you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mb-8 text-gray-500 text-sm">
        This is the nested posts not-found page.
      </p>
      <div className="flex gap-3">
        <Link
          href="/posts"
          className="rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800"
        >
          Browse Posts
        </Link>
        <Link
          href="/"
          className="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}