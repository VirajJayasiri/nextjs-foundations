/**
 * Query Performance Patterns - Data Layer
 *
 * This demonstrates the difference between:
 * - SLOW: Sequential fetching (fetch post → fetch author → fetch comments)
 * - BETTER: Parallel fetching (fetch post → then fetch author & comments together)
 */

// ============================================================================
// MOCK DATA
// ============================================================================

export interface Post {
  id: string
  slug: string
  title: string
  content: string
  authorId: string
  createdAt: Date
}

export interface Author {
  id: string
  name: string
  email: string
}

export interface Comment {
  id: string
  postId: string
  authorName: string
  text: string
  createdAt: Date
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    slug: 'hello-world',
    title: 'Hello World',
    content: 'This is the first post. Welcome to the blog!',
    authorId: 'author-1',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'post-2',
    slug: 'nextjs-tips',
    title: 'Next.js Tips',
    content:
      'Here are some tips for building with Next.js... Learn about Server Components, App Router, and more!',
    authorId: 'author-2',
    createdAt: new Date('2024-01-15'),
  },
]

const mockAuthors: Author[] = [
  {
    id: 'author-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
  },
  {
    id: 'author-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
  },
]

const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    authorName: 'Charlie',
    text: 'Great post! Very helpful.',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    authorName: 'Diana',
    text: 'Thanks for sharing this!',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: 'comment-3',
    postId: 'post-2',
    authorName: 'Eve',
    text: 'I learned so much from this article.',
    createdAt: new Date('2024-01-16'),
  },
]

// ============================================================================
// SIMULATED ASYNC FETCHING WITH ARTIFICIAL DELAYS
// ============================================================================

/**
 * Simulate fetching a post from a database
 * Artificial delay: 300ms
 */
export async function getPost(slug: string): Promise<Post | null> {
  console.log(`[⏱️  Query] Starting fetch post: ${slug}`)
  const start = Date.now()

  await new Promise((resolve) => setTimeout(resolve, 300))

  const post = mockPosts.find((p) => p.slug === slug)
  const duration = Date.now() - start

  console.log(
    `[✅ Query] Completed fetch post: ${slug} (${duration}ms)`
  )

  return post || null
}

/**
 * Simulate fetching an author from a database
 * Artificial delay: 200ms
 */
export async function getAuthor(authorId: string): Promise<Author | null> {
  console.log(`[⏱️  Query] Starting fetch author: ${authorId}`)
  const start = Date.now()

  await new Promise((resolve) => setTimeout(resolve, 200))

  const author = mockAuthors.find((a) => a.id === authorId)
  const duration = Date.now() - start

  console.log(
    `[✅ Query] Completed fetch author: ${authorId} (${duration}ms)`
  )

  return author || null
}

/**
 * Simulate fetching comments for a post
 * Artificial delay: 250ms
 */
export async function getComments(postId: string): Promise<Comment[]> {
  console.log(`[⏱️  Query] Starting fetch comments for post: ${postId}`)
  const start = Date.now()

  await new Promise((resolve) => setTimeout(resolve, 250))

  const comments = mockComments.filter((c) => c.postId === postId)
  const duration = Date.now() - start

  console.log(
    `[✅ Query] Completed fetch comments for post: ${postId} (${duration}ms)`
  )

  return comments
}

// ============================================================================
// PERFORMANCE COMPARISON FUNCTIONS
// ============================================================================

/**
 * SLOW APPROACH: Sequential fetching
 * 1. Fetch post (300ms)
 * 2. Fetch author (200ms)
 * 3. Fetch comments (250ms)
 * Total: ~750ms
 */
export async function fetchPostDataSequential(slug: string) {
  const start = Date.now()
  console.log('\n🐢 SEQUENTIAL APPROACH (SLOW)')
  console.log('post → (wait) → author → (wait) → comments')
  console.log('─'.repeat(60))

  const post = await getPost(slug)

  if (!post) {
    return null
  }

  // Must wait for author to finish before fetching comments
  const author = await getAuthor(post.authorId)
  const comments = await getComments(post.id)

  const totalTime = Date.now() - start
  console.log(`🐢 Sequential Total: ${totalTime}ms`)
  console.log('─'.repeat(60))

  return { post, author, comments }
}

/**
 * BETTER APPROACH: Parallel fetching after post
 * 1. Fetch post (300ms)
 * 2. Fetch author + comments in parallel (max 250ms, not 450ms)
 * Total: ~550ms
 */
export async function fetchPostDataParallel(slug: string) {
  const start = Date.now()
  console.log('\n🚀 PARALLEL APPROACH (BETTER)')
  console.log('post → author + comments (together)')
  console.log('─'.repeat(60))

  const post = await getPost(slug)

  if (!post) {
    return null
  }

  // After post is fetched, fetch author and comments in parallel
  const [author, comments] = await Promise.all([
    getAuthor(post.authorId),
    getComments(post.id),
  ])

  const totalTime = Date.now() - start
  console.log(`🚀 Parallel Total: ${totalTime}ms`)
  console.log('─'.repeat(60))

  return { post, author, comments }
}
