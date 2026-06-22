import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getContent, setContent } from '@/lib/content';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const updates = await req.json();
  await setContent(updates);
  return NextResponse.json({ ok: true });
}
