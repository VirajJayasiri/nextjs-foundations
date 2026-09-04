import { fetchPostBySlug, fetchPosts } from '@repo/api/blog'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await fetchPosts(10)

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex flex-col gap-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to posts
      </Link>

      <article className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{post.title}</h1>

          <p className="text-sm text-gray-500">
            {post.category} · {post.readingTime} min read
          </p>

          <p className="text-sm text-gray-500">
            By {post.author.name}
          </p>
        </header>

        <div className="prose max-w-none">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  )
}