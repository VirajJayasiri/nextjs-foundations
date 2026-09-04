import Link from "next/link";
import { connection } from "next/server";

import { NavigationButtons } from "./navigation-buttons";

export default async function NavDemoPage() {
  await connection();

  const serverTimestamp = Date.now();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 font-bold text-3xl">Navigation Demo</h1>

      <div className="space-y-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-xl">Soft Navigation with Link</h2>
          <p className="mb-4 text-gray-600">
            These links use next/link for client-side transitions. The browser
            does not perform a full page reload.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Soft navigation examples">
            <Link
              href="/nav-demo/page-a"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Go to Page A
            </Link>
            <Link
              href="/nav-demo/page-b"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Go to Page B
            </Link>
          </nav>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-xl">Hard Navigation Comparison</h2>
          <p className="mb-4 text-gray-600">
            This link intentionally uses a plain anchor. It performs a full
            browser navigation.
          </p>
          <a
            href="/nav-demo/page-a"
            className="inline-block rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Hard nav to Page A
          </a>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-xl">Programmatic Navigation</h2>
          <p className="mb-4 text-gray-600">
            These buttons demonstrate useRouter navigation from a Client Component.
          </p>
          <NavigationButtons />
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-xl">Server-Side Navigation</h2>
          <p className="mb-4 text-gray-600">
            This route demonstrates redirect() running on the server.
          </p>
          <Link
            href="/nav-demo/server-redirect"
            className="inline-block rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Test server redirect()
          </Link>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-semibold text-xl">Navigation Timestamp</h2>
          <p className="text-gray-600 text-sm">Server timestamp:</p>
          <code className="font-mono text-sm">{serverTimestamp}</code>
          <p className="mt-2 text-gray-500 text-sm">
            Use this with browser navigation and the Network tab to compare soft
            and hard navigations.
          </p>
        </section>
      </div>

      <section className="mt-8 rounded bg-gray-100 p-4">
        <h2 className="mb-2 font-semibold">Key Concepts</h2>
        <ul className="list-inside list-disc space-y-1 text-gray-600 text-sm">
          <li>Link: declarative client-side navigation</li>
          <li>Plain anchor: full browser navigation</li>
          <li>router.push(): adds a history entry</li>
          <li>router.replace(): replaces the current history entry</li>
          <li>router.back(): returns through browser history</li>
          <li>redirect(): server-side navigation</li>
        </ul>
      </section>
    </main>
  );
}