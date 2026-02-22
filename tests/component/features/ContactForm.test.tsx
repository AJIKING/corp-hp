import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { theme } from '@/config/theme'
import { ContactForm } from '@/components/features/ContactForm'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

/** 全フィールドに有効値を入力するヘルパー */
async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  // カテゴリ選択
  await user.click(screen.getByRole('combobox'))
  await user.click(await screen.findByRole('option', { name: 'その他' }))

  // テキストフィールド入力（placeholder で特定）
  await user.type(screen.getByPlaceholderText('例）株式会社PLARIA'), '株式会社テスト')
  await user.type(screen.getByPlaceholderText('例）開発部'), '開発部')
  await user.type(screen.getByPlaceholderText('例）山田 太郎'), 'テスト太郎')
  await user.type(screen.getByPlaceholderText('例）03-1234-5678'), '09012345678')
  await user.type(screen.getByPlaceholderText('例）info@example.com'), 'test@example.com')
  await user.type(
    screen.getByPlaceholderText('お気軽にお問い合わせ内容をご記入ください。'),
    'これはテスト用の問い合わせ内容です。',
  )
}

describe('ContactForm', () => {
  // ====== 描画テスト ======

  describe('描画', () => {
    it('セクションタイトルが表示される', () => {
      renderWithTheme(<ContactForm />)
      expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
    })

    it('全フィールドのラベルが表示される', () => {
      renderWithTheme(<ContactForm />)
      expect(screen.getByText('カテゴリ')).toBeInTheDocument()
      expect(screen.getByText('会社名')).toBeInTheDocument()
      expect(screen.getByText('部署/役職名')).toBeInTheDocument()
      expect(screen.getByText('お名前')).toBeInTheDocument()
      expect(screen.getByText('電話番号')).toBeInTheDocument()
      expect(screen.getByText('メールアドレス')).toBeInTheDocument()
      expect(screen.getByText('お問い合わせ内容')).toBeInTheDocument()
    })

    it('送信ボタンが表示される', () => {
      renderWithTheme(<ContactForm />)
      expect(screen.getByRole('button', { name: '送信する →' })).toBeInTheDocument()
    })
  })

  // ====== バリデーションエラー表示テスト ======

  describe('バリデーション', () => {
    it('空の状態で送信するとエラーが表示される', async () => {
      const user = userEvent.setup()
      renderWithTheme(<ContactForm />)

      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(await screen.findByText('3文字以上で入力してください')).toBeInTheDocument()
      expect(await screen.findByText('10文字以上で入力してください')).toBeInTheDocument()
    })
  })

  // ====== 送信テスト ======

  describe('送信', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('正常送信で成功メッセージが表示される', async () => {
      const user = userEvent.setup()
      renderWithTheme(<ContactForm />)

      await fillForm(user)
      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(
        await screen.findByText('送信が完了しました。内容を確認の上、折り返しご連絡いたします。'),
      ).toBeInTheDocument()
    })

    it('fetch が正しいデータで呼ばれる', async () => {
      const user = userEvent.setup()
      renderWithTheme(<ContactForm />)

      await fillForm(user)
      await user.click(screen.getByRole('button', { name: '送信する →' }))

      await screen.findByText('送信が完了しました。内容を確認の上、折り返しご連絡いたします。')

      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'その他',
          corporateName: '株式会社テスト',
          department: '開発部',
          name: 'テスト太郎',
          phoneNo: '09012345678',
          email: 'test@example.com',
          detail: 'これはテスト用の問い合わせ内容です。',
        }),
      })
    })

    it('fetch が失敗するとエラーメッセージが表示される', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
      const user = userEvent.setup()
      renderWithTheme(<ContactForm />)

      await fillForm(user)
      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(
        await screen.findByText('送信に失敗しました。お手数ですが、再度お試しください。'),
      ).toBeInTheDocument()
    })
  })
})
