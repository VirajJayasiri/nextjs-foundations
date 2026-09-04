import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const supportedMetrics = new Set(['CLS', 'INP', 'LCP']);

export async function POST(request: NextRequest) {
  const metric: unknown = await request.json();

  if (!isValidMetric(metric)) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  // biome-ignore lint/suspicious/noConsole: intentional for lesson measurement
  console.log('Web Vital:', metric);

  return NextResponse.json({ received: true });
}

function isValidMetric(value: unknown): value is {
  id: string;
  name: string;
  value: number;
} {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const metric = value as Record<string, unknown>;

  return (
    typeof metric.id === 'string' &&
    typeof metric.name === 'string' &&
    supportedMetrics.has(metric.name) &&
    typeof metric.value === 'number' &&
    Number.isFinite(metric.value)
  );
}
