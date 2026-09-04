import { fetchPosts, fetchStats, fetchUser } from "./data";

async function fetchParallel() {
  const startTime = performance.now();
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchStats(),
  ]);
  const duration = Math.round(performance.now() - startTime);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      // biome-ignore lint/suspicious/noConsole: demonstrate server-side monitoring
      console.error(`Fetch ${index} failed:`, result.reason);
    }
  });

  return {
    user:
      results[0].status === "fulfilled"
        ? results[0].value
        : { name: "Guest", email: "" },
    posts: results[1].status === "fulfilled" ? results[1].value : [],
    stats:
      results[2].status === "fulfilled"
        ? results[2].value
        : { views: 0, likes: 0 },
    duration,
  };
}

export default async function DataDemoPage() {
  const { user, posts, stats, duration } = await fetchParallel();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 font-bold text-3xl">
        Data Fetching Without Waterfalls
      </h1>

      <div className="mb-6 rounded-lg border-2 border-green-200 bg-green-50 p-4">
        <h2 className="font-semibold text-green-800">Performance Result</h2>
        <p className="text-green-700">
          Parallel fetch completed in{" "}
          <span className="font-bold font-mono">{duration}ms</span>
        </p>
        <p className="mt-2 text-green-600 text-sm">
          Sequential: ~750ms. Parallel: ~300ms, the duration of the slowest
          request.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4">
          <h2 className="mb-2 font-semibold">User (200ms fetch)</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email || "Unavailable"}</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-2 font-semibold">Posts (300ms fetch)</h2>
          <ul className="list-inside list-disc">
            {posts.length > 0 ? (
              posts.map((post) => <li key={post.id}>{post.title}</li>)
            ) : (
              <li>Posts unavailable</li>
            )}
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-2 font-semibold">Stats (250ms fetch)</h2>
          <p>Views: {stats.views.toLocaleString()}</p>
          <p>Likes: {stats.likes.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8 rounded bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">Key Takeaway</h2>
        <pre className="overflow-x-auto font-mono text-sm">
          {`// Sequential: 200 + 300 + 250 = 750ms
const user = await fetchUser();
const posts = await fetchPosts();
const stats = await fetchStats();

// Parallel: max(200, 300, 250) = 300ms
const [user, posts, stats] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchStats(),
]);`}
        </pre>
      </div>
    </main>
  );
}