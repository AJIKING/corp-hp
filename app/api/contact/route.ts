import { contactFormSchema, type ContactFormSchema } from '@/lib/schemas/contact'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export function buildGoogleChatPayload(msg: string) {
  return { text: msg }
}

// ====== POST /api/contact ======
export async function POST(req: Request) {
  try {
    const json = (await req.json()) as unknown
    const data = contactFormSchema.parse(json) as ContactFormSchema

    const ua = req.headers.get('user-agent') ?? ''
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      req.headers.get('x-client-ip') ??
      ''

    const message = [
      '【お問い合わせ】',
      `カテゴリ: ${data.category}`,
      `会社名: ${data.corporateName}`,
      `お名前: ${data.name}`,
      `電話番号: ${data.phoneNo}`,
      `メール: ${data.email}`,
      '-----',
      data.detail,
      '-----',
      `UA: ${ua}`,
      `IP: ${ip}`,
    ].join('\n')

    const payload = buildGoogleChatPayload(message)

    const webhook = process.env.GOOGLE_CHAT_WEBHOOK_URL
    if (!webhook) {
      return NextResponse.json({ ok: false, error: 'send error' }, { status: 500 })
    }

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!res.ok) {
      const bodyText = await res.text()
      console.error('Google Chat webhook error', res.status, bodyText)
      return NextResponse.json(
        { ok: false, error: 'Failed to deliver to Google Chat' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: 'Validation error', details: err.issues },
        { status: 422 },
      )
    }
    console.error(err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}

// （任意）プリフライトを許す場合はここでCORS対応
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
