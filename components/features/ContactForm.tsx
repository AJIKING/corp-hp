'use client'
import { RHFBasicSelectField } from '@/components/ui/rhf/RHFBasicSelectField'
import { RHFBasicTextField } from '@/components/ui/rhf/RHFBasicTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import SendIcon from '@mui/icons-material/Send'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export const contactFormSchema = z.object({
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

export type ContactFormSchema = z.infer<typeof contactFormSchema>


export const ContactForm = () => {
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)
  const { control, handleSubmit, reset } = useForm<ContactFormSchema>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      category: '',
      corporateName: '',
      name: '',
      phoneNo: '',
      email: '',
      detail: '',
    },
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormSchema> = async (schema) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schema),
      })
      setSubmittedMessage('送信が完了しました。内容を確認の上、折り返しご連絡いたします。')
      reset()
    } catch {
      setSubmittedMessage('送信に失敗しました。お手数ですが、再度お試しください。')
    }
  }

  return (
    <Stack
      id="contact"
      direction="column"
      spacing={4}
      alignItems="center"
      width={1}
      maxWidth={600}
      sx={{
        scrollMarginTop: '80px',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <SendIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="white"
          sx={{
            fontSize: {
              xs: 32,
              sm: 40,
            },
          }}
        >
          お問い合わせフォーム
        </Typography>
      </Stack>
      <Typography variant="body1" align="center" whiteSpace="pre-line">
        こちらのフォームからお気軽にお問い合わせください。
      </Typography>
      <form
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
        style={{ width: '100%' }}
        noValidate
      >
        <Stack direction="column" spacing={4} alignItems="left" width={1} mb={2}>
          <RHFBasicSelectField
            required
            fullWidth
            name="category"
            label="カテゴリ"
            id="category"
            size="small"
            defaultValue=""
            values={[
              { label: 'サービス開発のご相談', value: 'サービス開発のご相談' },
              { label: 'ご利用・ご要望など', value: 'ご利用・ご要望など' },
              { label: 'その他', value: 'その他' },
            ]}
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
          <RHFBasicTextField
            required
            fullWidth
            name="corporateName"
            label="会社名"
            id="corporateName"
            size="small"
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            placeholder="例: 株式会社PLARIA"
          />
          <RHFBasicTextField
            required
            fullWidth
            name="name"
            label="お名前"
            type="name"
            id="name"
            size="small"
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            placeholder="例: 山田太郎"
          />
          <RHFBasicTextField
            required
            fullWidth
            id="phoneNo"
            label="電話番号"
            name="phoneNo"
            autoComplete="phoneNo"
            size="small"
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            placeholder="例: 01-2345-6789"
          />
          <RHFBasicTextField
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            size="small"
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            placeholder="例: example@plaria.com"
          />
          <RHFBasicTextField
            required
            fullWidth
            id="detail"
            label="問い合わせ内容"
            name="detail"
            size="small"
            multiline
            rows={10}
            control={control}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            placeholder="お問い合わせ内容をご記入ください"
          />

          <Button
            variant="contained"
            sx={{
              width: '100%',
              height: 40,
              mt: 2,
              mb: 3,
              color: 'white',
            }}
            type="submit"
          >
            送信する
          </Button>
          {submittedMessage && (
            <Typography variant="body1" align="center" color="white" whiteSpace="pre-line">
              {submittedMessage}
            </Typography>
          )}
        </Stack>
      </form>
    </Stack>
  )
}
