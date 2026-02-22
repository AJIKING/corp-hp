'use client'

import { Box, Typography } from '@mui/material'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社PLARIA' },
  { label: '設立', value: '2023年7月' },
  { label: '代表者', value: '代表取締役社長\n安食 太人' },
  { label: '所在地', value: '〒150-0002\n東京都渋谷区渋谷2-19-15\n宮益坂ビルディング609F' },
  { label: '事業内容', value: 'Web/モバイルアプリ\nサービス開発' },
]

export const Overview = () => {
  const headerRef = useRevealOnScroll()
  const gridRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="company"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>Company</SectionLabel>
        <SectionTitle>会社概要</SectionTitle>
      </Box>

      <Box
        ref={gridRef}
        sx={{
          ...revealSx,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr 1fr',
            sm: 'repeat(auto-fit, minmax(200px, 1fr))',
          },
          gap: '2px',
          backgroundColor: 'border.default',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          mt: 6,
        }}
      >
        {COMPANY_INFO.map((item) => (
          <Box
            key={item.label}
            sx={{
              backgroundColor: 'background.card',
              p: '32px 28px',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 500,
                color: 'accent.main',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.92rem',
                color: 'textCustom.primary',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
