import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 p-4">
        <h2 className="mb-4 font-bold text-lg">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="rounded px-3 py-2 hover:bg-gray-200">
            Overview
          </Link>
          <Link
            href="/dashboard/analytics"
            className="rounded px-3 py-2 hover:bg-gray-200"
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded px-3 py-2 hover:bg-gray-200"
          >
            Settings
          </Link>
        </nav>
        <Link href="/" className="mt-8 block text-gray-500 text-sm hover:text-gray-900">
          Back to site
        </Link>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
