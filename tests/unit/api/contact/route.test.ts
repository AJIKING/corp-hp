import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildGoogleChatPayload } from '@/lib/google-chat'
import { OPTIONS, POST } from '@/app/api/contact/route'

const validData = {
  category: 'お問い合わせ',
  corporateName: '株式会社テスト',
  department: '開発部',
  name: 'テスト太郎',
  phoneNo: '09012345678',
  email: 'test@example.com',
  detail: 'これはテスト用の問い合わせ内容です。',
}

function createRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// ====== buildGoogleChatPayload ======

describe('buildGoogleChatPayload', () => {
  it('文字列を渡すと { text } 構造を返す', () => {
    const result = buildGoogleChatPayload('hello')
    expect(result).toEqual({ text: 'hello' })
  })

  it('空文字でも正しい構造を返す', () => {
    const result = buildGoogleChatPayload('')
    expect(result).toEqual({ text: '' })
  })
})

// ====== POST handler ======

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_CHAT_WEBHOOK_URL', 'https://chat.googleapis.com/v1/spaces/xxx/messages?key=k&token=t')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('有効データ + Webhook 成功で 200 を返す', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ name: 'spaces/xxx/messages/yyy' }), { status: 200 }),
    )
    const res = await POST(createRequest(validData))
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.ok).toBe(true)
  })

  it('バリデーションエラーで 422 を返す', async () => {
    const res = await POST(createRequest({ ...validData, name: 'ab' }))
    const json = await res.json()
    expect(res.status).toBe(422)
    expect(json.ok).toBe(false)
    expect(json.details).toBeDefined()
  })

  it('GOOGLE_CHAT_WEBHOOK_URL 未設定で 500 を返す', async () => {
    delete process.env.GOOGLE_CHAT_WEBHOOK_URL
    const res = await POST(createRequest(validData))
    expect(res.status).toBe(500)
  })

  it('Webhook が非 2xx を返すと 502', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('error', { status: 500 }),
    )
    const res = await POST(createRequest(validData))
    expect(res.status).toBe(502)
  })
})

// ====== OPTIONS handler ======

describe('OPTIONS /api/contact', () => {
  it('204 を返す', async () => {
    const res = await OPTIONS()
    expect(res.status).toBe(204)
  })

  it('CORS ヘッダーが正しい', async () => {
    const res = await OPTIONS()
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe('POST,OPTIONS')
  })
})
