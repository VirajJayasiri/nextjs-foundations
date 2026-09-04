import { fetchPosts } from '@repo/api/blog';
import Link from 'next/link';
import { Suspense } from 'react';
import FilterControls from './filter-controls';

type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

const TECH_CATEGORIES = [
  'technology',
  'development',
  'engineering',
  'data science',
  'ai/ml',
  'devops',
];

const GENERAL_CATEGORIES = ['business', 'design', 'marketing', 'product'];
 
export default async function BlogHomePage({ searchParams }: Props) {
  const { category, sort, page } = await searchParams;
  const requestedPage = Number.parseInt(page ?? '1', 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;
  const allPosts = await fetchPosts(50);
  const filteredPosts = allPosts.filter((post) => {
    if (category === 'tech') {
      return TECH_CATEGORIES.includes(post.category.toLowerCase());
    }

    if (category === 'general') {
      return GENERAL_CATEGORIES.includes(post.category.toLowerCase());
    }

    return true;
  });
  const posts = sort === 'title'
    ? [...filteredPosts].sort((a, b) => a.title.localeCompare(b.title))
    : filteredPosts;
  const pageSize = 10;
  const pageStart = (currentPage - 1) * pageSize;
  const visiblePosts = posts.slice(pageStart, pageStart + pageSize);
 
  return (
    <main className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Blog</h1>

      <Suspense fallback={null}>
        <FilterControls />
      </Suspense>
 
      <div className="flex flex-col gap-6">
        {visiblePosts.map((post) => (
          <article key={post.id} className="flex flex-col gap-2 border-b pb-6">
            <Link href={`/${post.slug}`} className="hover:underline">
              <h2 className="font-semibold text-2xl">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              {post.category} · {post.readingTime} min read
            </p>
            <p className="text-gray-700">{post.excerpt}</p>
            <Link
              href={`/${post.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}