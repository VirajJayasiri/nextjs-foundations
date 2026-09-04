import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    content: 'This is the first post. Welcome to the blog!',
  },
  {
    slug: 'nextjs-tips',
    title: 'Next.js Tips',
    content: 'Here are some tips for building with Next.js...',
  },
]

export default async function PostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = posts.find((candidate) => candidate.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link href="/posts" className="text-blue-600 hover:underline">
        Back to posts
      </Link>
      <h1 className="mt-6 mb-4 font-bold text-3xl">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
    </main>
  )
}