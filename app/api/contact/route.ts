import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { z } from 'zod'

// Nodeランタイム（HMAC計算にnode:cryptoを使うため）
export const runtime = 'nodejs'

const contactFormSchema = z.object({
  category: z.string().min(1, 'カテゴリを選択してください'),
  corporateName: z.string().min(1, '会社名を入力してください'),
  name: z.string().min(3, '3文字以上で入力してください'),
  phoneNo: z
    .string()
    .min(9, '電話番号を9~14文字で入力してください')
    .max(14, '電話番号を9~14文字で入力してください'),
  email: z.email('メールアドレスの形式で入力してください'),
  detail: z.string().min(10, '10文字以上で入力してください'),
})
type ContactForm = z.infer<typeof contactFormSchema>

function buildLarkPayloadText(msg: string) {
  return {
    msg_type: 'text',
    content: { text: msg },
  } as Record<string, unknown>
}

/**
 * Larkの「署名検証」を有効化している場合:
 * - timestamp と sign をリクエストボディに追加する
 * - sign: HMAC-SHA256(base64) with key = `${timestamp}\n${secret}`, message=""
 */
function maybeSignLarkPayload(payload: Record<string, unknown>) {
  const secret = process.env.LARK_WEBHOOK_SECRET
  if (!secret) return payload

  const ts = Math.floor(Date.now() / 1000).toString()
  // 署名キー: "timestamp\nsecret"
  const key = `${ts}\n${secret}`

  // HMAC-SHA256(Base64) ※ messageは空文字列
  const sign = crypto.createHmac('sha256', key).update('').digest('base64')

  return { ...payload, timestamp: ts, sign }
}

// ====== POST /api/contact ======
export async function POST(req: Request) {
  try {
    const json = (await req.json()) as unknown
    const data = contactFormSchema.parse(json) as ContactForm

    const ua = req.headers.get('user-agent') ?? ''
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      req.headers.get('x-client-ip') ??
      ''

    // Larkに流す本文（テキスト）
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

    const basePayload = buildLarkPayloadText(message)
    const payload = maybeSignLarkPayload(basePayload)

    const webhook = process.env.LARK_WEBHOOK_URL
    if (!webhook) {
      return NextResponse.json({ ok: false, error: 'send error' }, { status: 500 })
    }

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Lark側が遅い時に固まらないよう適度に
      cache: 'no-store',
    })

    // Larkは {code:0, msg:"ok"} などを返す
    const bodyText = await res.text()
    const ok = res.ok && bodyText.includes(`"code":0`)
    if (!ok) {
      console.error('Lark webhook error', res.status, bodyText)
      return NextResponse.json({ ok: false, error: 'Failed to deliver to Lark' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    // Zodバリデーションエラー対応
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
