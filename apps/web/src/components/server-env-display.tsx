export function ServerEnvDisplay() {
  return (
    <div className="rounded border p-4">
      <h3 className="font-bold">Server Component</h3>
      <p>
        Public:{' '}
        {process.env.NEXT_PUBLIC_APP_NAME ? 'configured' : 'not configured'}
      </p>
      <p>
        Server-only:{' '}
        {process.env.INTERNAL_CONFIG ? 'configured' : 'not configured'}
      </p>
    </div>
  );
}
