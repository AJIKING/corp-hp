'use client'

import { Box, Typography } from '@mui/material'
import { SectionDescription } from '@/components/ui/SectionDescription'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

export const Product = () => {
  const headerRef = useRevealOnScroll()
  const cardRef = useRevealOnScroll()
  const moreRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="product"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>Product</SectionLabel>
        <SectionTitle>サービス</SectionTitle>
        <SectionDescription>
          PLARIAが提供するWebサービス。テクノロジーで新しい体験を届けます。
        </SectionDescription>
      </Box>

      {/* PLAYED Card */}
      <Box
        ref={cardRef}
        sx={{
          ...revealSx,
          backgroundColor: 'background.card',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 'var(--radius)',
          p: { xs: '32px 24px', md: '48px 44px' },
          display: 'flex',
          gap: { xs: '28px', md: '48px' },
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          transition: 'border-color 0.35s',
          '&:hover': { borderColor: 'border.hover' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'accent.main',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            PLAYED
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'textCustom.muted', mb: 2.5 }}>
            Coming Soon
          </Typography>
          <Typography sx={{ fontSize: '0.92rem', color: 'textCustom.secondary', lineHeight: 1.95, mb: 3.5 }}>
            PLARIAが開発中のWebサービスです。詳細は近日公開予定。リリースまでもうしばらくお待ちください。
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(56,182,255,0.08)',
              border: '1px solid rgba(56,182,255,0.2)',
              px: 2,
              py: '6px',
              borderRadius: 100,
              fontSize: '0.78rem',
              fontWeight: 500,
              color: 'accent.light',
              '&::before': {
                content: '""',
                width: 6,
                height: 6,
                backgroundColor: 'accent.main',
                borderRadius: '50%',
                animation: 'pulse-dot 2s ease-in-out infinite',
              },
            }}
          >
            開発中 — 近日公開
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', sm: 200 },
            height: { xs: 140, sm: 200 },
            flexShrink: 0,
            borderRadius: 'var(--radius)',
            background: 'linear-gradient(135deg, rgba(56,182,255,0.08), rgba(56,182,255,0.02))',
            border: '1px solid rgba(56,182,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="64"
            height="64"
            stroke="var(--accent)"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6 }}
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </Box>
      </Box>

      {/* Placeholder cards */}
      <Box
        ref={moreRef}
        sx={{
          ...revealSx,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2.5,
          mt: 3,
        }}
      >
        {[0, 1].map((i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: 'background.card',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)',
              p: '36px 28px',
              textAlign: 'center',
              color: 'textCustom.muted',
              fontSize: '0.88rem',
            }}
          >
            <Typography sx={{ fontSize: '1.6rem', mb: 1, opacity: 0.4, color: 'accent.main' }}>
              +
            </Typography>
            新サービス準備中
          </Box>
        ))}
      </Box>
    </Box>
  )
}
