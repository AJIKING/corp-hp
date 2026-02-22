'use client'

import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export const Corporate = () => {
  return (
    <Box
      component="section"
      id="corporate"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        pt: { xs: '100px', md: '120px' },
        pb: { xs: '60px', md: '80px' },
        overflow: 'hidden',
        backgroundColor: 'background.default',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          right: '-15%',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(56,182,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'drift 12s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(56,182,255,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'drift 15s ease-in-out infinite reverse',
        },
      }}
    >
      {/* Watermark */}
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-dancing-script), cursive',
          fontSize: { xs: 'clamp(4rem, 16vw, 8rem)', md: 'clamp(6rem, 18vw, 16rem)' },
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.03)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        plaria inc
      </Typography>

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
        {/* Badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'accent.glow',
            border: '1px solid rgba(56,182,255,0.2)',
            px: '18px',
            py: '6px',
            borderRadius: 100,
            fontSize: '0.8rem',
            fontWeight: 400,
            color: 'accent.light',
            mb: 4,
            animation: 'fade-up 0.8s ease both',
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
          テクノロジーで未来を創る
        </Box>

        {/* Heading */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3,
            color: 'white',
            animation: 'fade-up 0.8s ease 0.1s both',
          }}
        >
          感動体験から
          <br />
          <Box component="span" sx={{ color: 'white' }}>
            笑顔を広げる
          </Box>
        </Typography>

        {/* Sub text */}
        <Typography
          sx={{
            fontSize: '1.05rem',
            fontWeight: 400,
            color: 'textCustom.secondary',
            lineHeight: 1.9,
            maxWidth: 520,
            mb: '44px',
            animation: 'fade-up 0.8s ease 0.2s both',
          }}
        >
          PLARIAはテクノロジーを駆使し、感動体験を創造して笑顔があふれる社会を実現します。
        </Typography>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            animation: 'fade-up 0.8s ease 0.3s both',
          }}
        >
          <Box
            component={Link}
            href="#contact"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              px: '30px',
              py: '11px',
              backgroundColor: 'accent.main',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.3s, background 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px var(--accent-glow-strong)',
                backgroundColor: 'accent.light',
              },
            }}
          >
            お問い合わせ
            <svg width="16" height="16" fill="none">
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box
            component={Link}
            href="#services"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              px: '30px',
              py: '11px',
              backgroundColor: 'transparent',
              color: 'textCustom.primary',
              border: '1px solid',
              borderColor: 'border.hover',
              borderRadius: 100,
              fontSize: '0.9rem',
              fontWeight: 400,
              fontFamily: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'border-color 0.3s, background 0.3s',
              '&:hover': {
                borderColor: 'accent.main',
                backgroundColor: 'accent.glow',
              },
            }}
          >
            事業内容を見る
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
