'use client'
import { RHFBasicSelectField } from '@/components/ui/rhf/RHFBasicSelectField'
import { RHFBasicTextField } from '@/components/ui/rhf/RHFBasicTextField'
import { IconBox } from '@/components/ui/IconBox'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { contactFormSchema, type ContactFormSchema } from '@/lib/schemas/contact'

const inputSx = {
  backgroundColor: 'var(--bg-deep)',
  borderRadius: 'var(--radius-sm)',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--bg-deep)',
    color: '#fff',
    fontSize: '0.9rem',
    borderRadius: 'var(--radius-sm)',
    '& fieldset': { borderColor: 'var(--border)' },
    '&:hover fieldset': { borderColor: 'var(--border-hover)' },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--accent)',
      boxShadow: '0 0 0 3px var(--accent-glow)',
    },
  },
}

export const ContactForm = () => {
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)
  const leftRef = useRevealOnScroll()
  const rightRef = useRevealOnScroll()

  const { control, handleSubmit, reset } = useForm<ContactFormSchema>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      category: '',
      corporateName: '',
      department: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schema),
      })
      setSubmittedMessage('送信が完了しました。内容を確認の上、折り返しご連絡いたします。')
      reset()
    } catch {
      setSubmittedMessage('送信に失敗しました。お手数ですが、再度お試しください。')
    }
  }

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        backgroundColor: 'background.deep',
        scrollMarginTop: '72px',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
          gap: { xs: 6, md: 10 },
          alignItems: 'start',
        }}
      >
        {/* Left column - info */}
        <Box
          ref={leftRef}
          sx={{
            ...revealSx,
            position: { md: 'sticky' },
            top: { md: 120 },
          }}
        >
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>お問い合わせ</SectionTitle>
          <Typography
            sx={{
              fontSize: '1.05rem',
              color: 'textCustom.secondary',
              lineHeight: 1.9,
              mb: 4.5,
            }}
          >
            プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください。
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'border.default',
            }}
          >
            <IconBox size={42}>
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </IconBox>
            <Typography sx={{ fontSize: '0.9rem', color: 'textCustom.secondary' }}>
              東京都渋谷区渋谷2-19-15 宮益坂ビルディング609F
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'border.default',
            }}
          >
            <IconBox size={42}>
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
            </IconBox>
            <Typography sx={{ fontSize: '0.9rem', color: 'textCustom.secondary' }}>
              https://plaria.co.jp
            </Typography>
          </Box>
        </Box>

        {/* Right column - form */}
        <Box
          ref={rightRef}
          sx={{
            ...revealSx,
            backgroundColor: 'background.card',
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 'var(--radius)',
            p: { xs: '32px 24px', md: '48px 44px' },
          }}
        >
          <form
            onSubmit={handleSubmit(async (data) => await onSubmit(data))}
            style={{ width: '100%' }}
            noValidate
          >
            <Box sx={{ mb: 2.75 }}>
              <RHFBasicSelectField
                required
                fullWidth
                name="category"
                label="カテゴリ"
                id="category"
                size="small"
                defaultValue=""
                values={[
                  { label: '開発の相談', value: '開発の相談' },
                  { label: 'お見積もり', value: 'お見積もり' },
                  { label: '採用について', value: '採用について' },
                  { label: 'その他', value: 'その他' },
                ]}
                control={control}
                sx={inputSx}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.25,
                mb: 2.75,
              }}
            >
              <RHFBasicTextField
                fullWidth
                name="corporateName"
                label="会社名"
                id="corporateName"
                size="small"
                control={control}
                sx={inputSx}
                placeholder="例）株式会社PLARIA"
              />
              <RHFBasicTextField
                fullWidth
                name="department"
                label="部署/役職名"
                id="department"
                size="small"
                control={control}
                sx={inputSx}
                placeholder="例）開発部"
              />
            </Box>

            <Box sx={{ mb: 2.75 }}>
              <RHFBasicTextField
                required
                fullWidth
                name="name"
                label="お名前"
                id="name"
                size="small"
                control={control}
                sx={inputSx}
                placeholder="例）山田 太郎"
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.25,
                mb: 2.75,
              }}
            >
              <RHFBasicTextField
                fullWidth
                id="phoneNo"
                label="電話番号"
                name="phoneNo"
                size="small"
                control={control}
                sx={inputSx}
                placeholder="例）03-1234-5678"
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
                sx={inputSx}
                placeholder="例）info@example.com"
              />
            </Box>

            <Box sx={{ mb: 2.75 }}>
              <RHFBasicTextField
                required
                fullWidth
                id="detail"
                label="お問い合わせ内容"
                name="detail"
                size="small"
                multiline
                rows={6}
                control={control}
                sx={inputSx}
                placeholder="お気軽にお問い合わせ内容をご記入ください。"
              />
            </Box>

            <Button
              type="submit"
              sx={{
                width: '100%',
                py: '14px',
                backgroundColor: 'accent.main',
                color: '#fff',
                border: 'none',
                borderRadius: 100,
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.3s, background 0.3s',
                mt: 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px var(--accent-glow-strong)',
                  backgroundColor: 'accent.light',
                },
              }}
            >
              送信する →
            </Button>
            {submittedMessage && (
              <Typography
                sx={{
                  mt: 2,
                  textAlign: 'center',
                  color: submittedMessage.includes('完了') ? 'success.main' : 'error.main',
                  fontSize: '0.9rem',
                }}
              >
                {submittedMessage}
              </Typography>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  )
}
