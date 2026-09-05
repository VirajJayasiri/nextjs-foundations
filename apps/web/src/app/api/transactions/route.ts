import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const transactionSchema = z
  .object({
    amount: z.number().finite().positive().max(1_000_000),
    description: z.string().trim().min(1).max(200),
  })
  .strict();

export async function POST(request: NextRequest) {
  if (
    request.headers.get('content-type')?.split(';', 1)[0] !== 'application/json'
  ) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 415 }
    );
  }

  const body = await request.text();
  if (body.length > 10_000) {
    return NextResponse.json(
      { error: 'Request body is too large' },
      { status: 413 }
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON' },
      { status: 400 }
    );
  }

  const result = transactionSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid transaction',
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Mock transaction processing
  return NextResponse.json({
    success: true,
    transactionId: crypto.randomUUID(),
    timestamp: Date.now(),
  });
}

export function GET() {
  // Mock transaction list
  return NextResponse.json({
    transactions: [
      { id: '1', amount: 100, status: 'completed' },
      { id: '2', amount: 250, status: 'pending' },
    ],
  });
}
