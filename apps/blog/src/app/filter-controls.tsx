'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function FilterControls() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: 'category' | 'sort', value?: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.delete('page')
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('sort')
    params.delete('page')
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <nav aria-label="Blog filters" className="flex flex-wrap gap-2">
      <button type="button" onClick={() => updateFilter('category')}>
        All
      </button>
      <button type="button" onClick={() => updateFilter('category', 'tech')}>
        Tech
      </button>
      <button type="button" onClick={() => updateFilter('category', 'general')}>
        General
      </button>
      <button type="button" onClick={() => updateFilter('sort', 'title')}>
        Sort by title
      </button>
      <button type="button" onClick={clearFilters}>
        Clear filters
      </button>
    </nav>
  )
}