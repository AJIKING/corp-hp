import { ThemeProvider } from '@mui/material/styles'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { theme } from '@/config/theme'
import { ContactForm } from '@/components/features/ContactForm'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

/** react-hook-form が検知できるよう nativeInputValueSetter で値を設定 */
function setNativeInputValue(element: HTMLElement, value: string) {
  const input = element as HTMLInputElement | HTMLTextAreaElement
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
    'value',
  )?.set
  nativeInputValueSetter?.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

/** MUI Select の値を hidden input 経由で設定（combobox popup を開かない） */
function setSelectValue(container: HTMLElement, name: string, value: string) {
  const hiddenInput = container.querySelector(`input[name="${name}"]`) as HTMLInputElement
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
  setter?.call(hiddenInput, value)
  hiddenInput.dispatchEvent(new Event('input', { bubbles: true }))
  hiddenInput.dispatchEvent(new Event('change', { bubbles: true }))
}

/** 全フィールドに有効値を入力するヘルパー */
function fillForm(container: HTMLElement) {
  setSelectValue(container, 'category', 'その他')
  setNativeInputValue(screen.getByPlaceholderText('例）株式会社PLARIA'), '株式会社テスト')
  setNativeInputValue(screen.getByPlaceholderText('例）開発部'), '開発部')
  setNativeInputValue(screen.getByPlaceholderText('例）山田 太郎'), 'テスト太郎')
  setNativeInputValue(screen.getByPlaceholderText('例）03-1234-5678'), '09012345678')
  setNativeInputValue(screen.getByPlaceholderText('例）info@example.com'), 'test@example.com')
  setNativeInputValue(
    screen.getByPlaceholderText('お気軽にお問い合わせ内容をご記入ください。'),
    'これはテスト用の問い合わせ内容です。',
  )
}

afterEach(() => {
  cleanup()
})

describe('ContactForm', () => {
  describe('描画', () => {
    it('セクションタイトル・フィールドラベル・送信ボタンが表示される', () => {
      renderWithTheme(<ContactForm />)
      expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
      expect(screen.getByText('カテゴリ')).toBeInTheDocument()
      expect(screen.getByText('会社名')).toBeInTheDocument()
      expect(screen.getByText('部署/役職名')).toBeInTheDocument()
      expect(screen.getByText('お名前')).toBeInTheDocument()
      expect(screen.getByText('電話番号')).toBeInTheDocument()
      expect(screen.getByText('メールアドレス')).toBeInTheDocument()
      expect(screen.getByText('お問い合わせ内容')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '送信する →' })).toBeInTheDocument()
    })
  })

  describe('バリデーション', () => {
    it('空の状態で送信するとエラーが表示される', async () => {
      const user = userEvent.setup()
      renderWithTheme(<ContactForm />)

      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(await screen.findByText('3文字以上で入力してください')).toBeInTheDocument()
      expect(await screen.findByText('10文字以上で入力してください')).toBeInTheDocument()
    })
  })

  describe('送信', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('正常送信で成功メッセージが表示される', async () => {
      const user = userEvent.setup()
      const { container } = renderWithTheme(<ContactForm />)

      fillForm(container)
      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(
        await screen.findByText('送信が完了しました。内容を確認の上、折り返しご連絡いたします。'),
      ).toBeInTheDocument()
    })

    it('fetch が正しいデータで呼ばれる', async () => {
      const user = userEvent.setup()
      const { container } = renderWithTheme(<ContactForm />)

      fillForm(container)
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
      const { container } = renderWithTheme(<ContactForm />)

      fillForm(container)
      await user.click(screen.getByRole('button', { name: '送信する →' }))

      expect(
        await screen.findByText('送信に失敗しました。お手数ですが、再度お試しください。'),
      ).toBeInTheDocument()
    })
  })
})
