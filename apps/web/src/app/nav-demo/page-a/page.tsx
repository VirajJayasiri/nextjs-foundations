import Link from "next/link";

export default function PageA() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 font-bold text-2xl">Page A</h1>
      <p className="mb-6 text-gray-600">
        You navigated here without a full page reload.
      </p>
      <nav className="flex flex-wrap gap-4" aria-label="Page navigation">
        <Link
          href="/nav-demo"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back to Demo
        </Link>
        <Link
          href="/nav-demo/page-b"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Page B
        </Link>
      </nav>
    </main>
  );
}