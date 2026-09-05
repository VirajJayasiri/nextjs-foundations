import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchPostDataParallel } from '../data'

/**
 * PostContent Component
 *
 * Demonstrates Query Performance Patterns:
 * - Fetches post first (needs authorId and postId)
 * - Then fetches author and comments IN PARALLEL using Promise.all()
 * - Shows server timing logs in console to demonstrate performance
 */
async function PostContent(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const data = await fetchPostDataParallel(params.slug)

  if (!data) {
    notFound()
  }

  const { post, author, comments } = data

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link href="/posts" className="text-blue-600 hover:underline">
        ← Back to posts
      </Link>

      {/* Post Header */}
      <article className="mt-8">
        <h1 className="mb-2 font-bold text-4xl">{post.title}</h1>
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span>{post.createdAt.toLocaleDateString()}</span>
          {author && <span>•</span>}
          {author && <span>By {author.name}</span>}
        </div>

        {/* Post Content */}
        <div className="prose mb-8 max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>

        {/* Author Card */}
        {author && (
          <div className="mb-8 border-l-4 border-blue-500 bg-blue-50 p-4">
            <h2 className="font-semibold">About the Author</h2>
            <p className="mt-1 text-sm text-gray-700">{author.name}</p>
            <p className="text-sm text-gray-500">{author.email}</p>
          </div>
        )}

        {/* Comments Section */}
        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Comments ({comments.length})
          </h2>

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <strong className="text-gray-900">
                      {comment.authorName}
                    </strong>
                    <span className="text-xs text-gray-500">
                      {comment.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </section>

        {/* Performance Pattern Info */}
        <div className="mt-8 border-t pt-8">
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer font-semibold hover:text-gray-900">
              📊 Query Performance Pattern
            </summary>
            <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded font-mono text-xs leading-relaxed">
              <p>
                <strong>What happened:</strong>
              </p>
              <p>1. Post was fetched first (300ms)</p>
              <p>
                2. Author and comments were fetched{' '}
                <strong>in parallel</strong> using Promise.all()
              </p>
              <p>
                3. Total time: ~550ms (instead of ~750ms with sequential
                approach)
              </p>
              <p className="mt-2">
                ✅ <strong>Check your server console logs</strong> to see the
                timing breakdown!
              </p>
            </div>
          </details>
        </div>
      </article>
    </main>
  )
}

export default function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-2xl p-8">Loading post...</main>}
    >
      <PostContent params={props.params} />
    </Suspense>
  )
}