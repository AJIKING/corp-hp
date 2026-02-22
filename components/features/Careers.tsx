'use client'

import { Box, Typography } from '@mui/material'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

export const Careers = () => {
  const headerRef = useRevealOnScroll()
  const cardRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="careers"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>Careers</SectionLabel>
        <SectionTitle>採用情報</SectionTitle>
      </Box>

      <Box
        ref={cardRef}
        sx={{
          ...revealSx,
          backgroundColor: 'background.card',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 'var(--radius)',
          p: { xs: '32px 24px', md: '48px 44px' },
          textAlign: 'center',
          maxWidth: 680,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            px: 2,
            py: '6px',
            borderRadius: 100,
            fontSize: '0.78rem',
            fontWeight: 500,
            color: 'textCustom.muted',
            mb: 3,
            '&::before': {
              content: '""',
              width: 6,
              height: 6,
              backgroundColor: 'textCustom.muted',
              borderRadius: '50%',
            },
          }}
        >
          現在募集停止中
        </Box>
        <Typography sx={{ fontSize: '1.15rem', fontWeight: 500, color: '#fff', mb: 2 }}>
          採用についてのお知らせ
        </Typography>
        <Typography sx={{ fontSize: '0.92rem', color: 'textCustom.secondary', lineHeight: 1.9 }}>
          現在、すべてのポジションにおいて採用を停止しております。募集を再開する際には、こちらのページでお知らせいたします。ご関心をお寄せいただきありがとうございます。
        </Typography>
      </Box>
    </Box>
  )
}
