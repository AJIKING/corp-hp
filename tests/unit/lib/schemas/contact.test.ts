import { describe, expect, it } from 'vitest'
import { contactFormSchema } from '@/lib/schemas/contact'

const validData = {
  category: 'お問い合わせ',
  corporateName: '株式会社テスト',
  department: '開発部',
  name: 'テスト太郎',
  phoneNo: '09012345678',
  email: 'test@example.com',
  detail: 'これはテスト用の問い合わせ内容です。',
}

describe('contactFormSchema', () => {
  it('有効なデータでバリデーションが通る', () => {
    expect(() => contactFormSchema.parse(validData)).not.toThrow()
  })

  describe('category', () => {
    it('空文字でエラー', () => {
      expect(() => contactFormSchema.parse({ ...validData, category: '' })).toThrow()
    })
  })

  describe('corporateName', () => {
    it('空文字でも通る', () => {
      expect(() => contactFormSchema.parse({ ...validData, corporateName: '' })).not.toThrow()
    })
  })

  describe('department', () => {
    it('空文字でも通る', () => {
      expect(() => contactFormSchema.parse({ ...validData, department: '' })).not.toThrow()
    })
  })

  describe('name', () => {
    it('2文字でエラー', () => {
      expect(() => contactFormSchema.parse({ ...validData, name: 'ab' })).toThrow()
    })

    it('3文字で通る', () => {
      expect(() => contactFormSchema.parse({ ...validData, name: 'abc' })).not.toThrow()
    })
  })

  describe('phoneNo', () => {
    it('空文字でも通る', () => {
      expect(() => contactFormSchema.parse({ ...validData, phoneNo: '' })).not.toThrow()
    })
  })

  describe('email', () => {
    it('不正形式でエラー', () => {
      expect(() => contactFormSchema.parse({ ...validData, email: 'not-an-email' })).toThrow()
    })
  })

  describe('detail', () => {
    it('9文字でエラー', () => {
      expect(() => contactFormSchema.parse({ ...validData, detail: 'あいうえおかきくけ' })).toThrow()
    })

    it('10文字で通る', () => {
      expect(() => contactFormSchema.parse({ ...validData, detail: 'あいうえおかきくけこ' })).not.toThrow()
    })
  })
})
