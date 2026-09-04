import { cacheLife } from 'next/cache';

/**
 * Server Component that demonstrates Cache Components
 *
 * This component uses `cacheLife()` to control how long
 * component data is cached between renders.
 *
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/cache-life
 */

// Simulate fetching fresh data
async function getTimestamp() {
  // Call cacheLife() at the top of your async function
  // to set caching behavior for this component's data
  cacheLife({
    stale: 60, // Serve stale for up to 60 seconds
    revalidate: 10, // Revalidate in background every 10 seconds
    expire: 3600, // Cache expires after 1 hour
  });

  // Simulate a data fetch
  return {
    timestamp: new Date().toLocaleTimeString(),
    message: 'This data is cached with cacheLife()',
  };
}

async function CacheComponentsDemo() {
  const data = await getTimestamp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Cache Components Demo</h1>
        <p className="text-gray-600 mb-4">
          This page demonstrates Next.js 16.1+ Cache Components feature.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">What are Cache Components?</h2>
        <p className="text-sm text-gray-700 mb-3">
          Cache Components allow you to control how long component-level data is cached.
          This enables you to build pages that are both:
        </p>
        <ul className="text-sm text-gray-700 space-y-2 ml-4">
          <li>• <strong>Instant:</strong> Serve cached data immediately to users</li>
          <li>• <strong>Fresh:</strong> Revalidate data in the background</li>
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Current Time (Cached)</h2>
        <p className="text-2xl font-mono font-bold text-green-700">
          {data.timestamp}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {data.message}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">How cacheLife() Works</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <div>
            <strong>stale: 60</strong> - Server serves cached data for up to 60 seconds
          </div>
          <div>
            <strong>revalidate: 10</strong> - Revalidate (refetch) in background every 10 seconds
          </div>
          <div>
            <strong>expire: 3600</strong> - Cache completely expires after 1 hour
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
        <ul className="text-sm text-gray-700 space-y-2 ml-4">
          <li>✓ Faster page loads with cached data</li>
          <li>✓ Automatic background revalidation keeps data fresh</li>
          <li>✓ Granular control per component</li>
          <li>✓ Works seamlessly with Server Components</li>
        </ul>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        <p className="text-sm text-gray-700 mb-3">
          To use Cache Components in your own components:
        </p>
        <ol className="text-sm text-gray-700 space-y-2 ml-4">
          <li>1. Import: <code className="bg-white px-2 py-1 rounded">import {'{ cacheLife }'} from 'next/cache'</code></li>
          <li>2. Call early in async function: <code className="bg-white px-2 py-1 rounded">cacheLife({'{...}'});</code></li>
          <li>3. Configure stale, revalidate, and expire times</li>
          <li>4. Build your instant & fresh pages!</li>
        </ol>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This demo uses Next.js 16.1.1. The <code>cacheComponents</code> configuration 
          is now enabled in your <code>next.config.ts</code>.
        </p>
      </div>
    </div>
  );
}

export default CacheComponentsDemo;
