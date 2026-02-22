import { z } from 'zod'

export const contactFormSchema = z.object({
  category: z.string().min(1, 'カテゴリを選択してください'),
  corporateName: z.string(),
  department: z.string(),
  name: z.string().min(3, '3文字以上で入力してください'),
  phoneNo: z.string(),
  email: z.email('メールアドレスの形式で入力してください'),
  detail: z.string().min(10, '10文字以上で入力してください'),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
