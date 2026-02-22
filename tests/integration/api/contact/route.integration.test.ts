import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'

const validData = {
  category: 'お問い合わせ',
  corporateName: '株式会社テスト',
  department: '開発部',
  name: 'テスト太郎',
  phoneNo: '09012345678',
  email: 'test@example.com',
  detail: 'これはテスト用の問い合わせ内容です。',
}

function createRequest(
  body: unknown,
  headers: Record<string, string> = {},
) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact 結合テスト', () => {
  let fetchSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.stubEnv('GOOGLE_CHAT_WEBHOOK_URL', 'https://chat.googleapis.com/v1/spaces/xxx/messages?key=k&token=t')
    fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ name: 'spaces/xxx/messages/yyy' }), { status: 200 }),
    )
    vi.spyOn(global, 'fetch').mockImplementation(fetchSpy)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  // ====== Webhook body フォーマット検証 ======

  describe('Webhook リクエスト body', () => {
    it('メッセージにフォームの全フィールド値が含まれる', async () => {
      await POST(createRequest(validData))

      const call = fetchSpy.mock.calls[0]
      const body = JSON.parse(call[1].body as string)
      const text = body.text as string

      expect(text).toContain('カテゴリ: お問い合わせ')
      expect(text).toContain('会社名: 株式会社テスト')
      expect(text).toContain('お名前: テスト太郎')
      expect(text).toContain('電話番号: 09012345678')
      expect(text).toContain('メール: test@example.com')
      expect(text).toContain('これはテスト用の問い合わせ内容です。')
    })

    it('payload が { text } 構造である', async () => {
      await POST(createRequest(validData))

      const call = fetchSpy.mock.calls[0]
      const body = JSON.parse(call[1].body as string)
      expect(body).toHaveProperty('text')
      expect(typeof body.text).toBe('string')
    })

    it('Webhook URL に POST で送信される', async () => {
      await POST(createRequest(validData))

      const call = fetchSpy.mock.calls[0]
      expect(call[0]).toBe('https://chat.googleapis.com/v1/spaces/xxx/messages?key=k&token=t')
      expect(call[1].method).toBe('POST')
    })
  })

  // ====== ヘッダー抽出テスト ======

  describe('ヘッダーからの情報抽出', () => {
    it('x-forwarded-for からIPが抽出される', async () => {
      await POST(createRequest(validData, { 'x-forwarded-for': '192.168.1.1' }))

      const body = JSON.parse(fetchSpy.mock.calls[0][1].body as string)
      expect(body.text).toContain('IP: 192.168.1.1')
    })

    it('カンマ区切りの x-forwarded-for では最初のIPが使われる', async () => {
      await POST(createRequest(validData, { 'x-forwarded-for': '10.0.0.1, 192.168.1.1' }))

      const body = JSON.parse(fetchSpy.mock.calls[0][1].body as string)
      expect(body.text).toContain('IP: 10.0.0.1')
    })

    it('user-agent がメッセージに含まれる', async () => {
      await POST(createRequest(validData, { 'user-agent': 'TestBot/1.0' }))

      const body = JSON.parse(fetchSpy.mock.calls[0][1].body as string)
      expect(body.text).toContain('UA: TestBot/1.0')
    })
  })
})
