'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { revealSx, useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { Box, Typography } from '@mui/material'

const STATS = [
  { value: '2023', label: '設立年' },
  { value: 'Web+AI', label: '主要技術領域' },
  { value: '東京', label: '本社所在地' },
  { value: '∞', label: '笑顔の可能性' },
]

export const About = () => {
  const headerRef = useRevealOnScroll()
  const leftRef = useRevealOnScroll()
  const rightRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>About Us</SectionLabel>
        <SectionTitle>私たちについて</SectionTitle>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 6, md: 10 },
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <Box ref={leftRef} sx={revealSx}>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2 }}>
            株式会社PLARIA（プラリア）は、新しいテクノロジーの活用によって「感動体験を創造して笑顔を広げる」ことを目指す企業です。
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2, mt: 2.5 }}>
            WebやAIなどのテクノロジーを駆使し、さまざまな業界に革新と価値をもたらします。
          </Typography>

          {/* Stats grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2.5,
              mt: 5,
            }}
          >
            {STATS.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  backgroundColor: 'background.card',
                  border: '1px solid',
                  borderColor: 'border.default',
                  borderRadius: 'var(--radius-sm)',
                  p: '26px 22px',
                  textAlign: 'center',
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: 'rgba(56,182,255,0.25)' },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-outfit), sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: 'accent.main',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'textCustom.muted', mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right column */}
        <Box ref={rightRef} sx={revealSx}>
          <Typography
            sx={{
              fontFamily: 'var(--font-zen-maru-gothic), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'textCustom.primary',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            テクノロジーで、
            <br />
            感動と笑顔を。
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2 }}>
            私たちは「何を作るか」ではなく「誰のために作るか」を大切にしています。ユーザーが思わず笑顔になるような体験を設計し、テクノロジーの力でそれを実現する。それがPLARIAの存在意義です。
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2, mt: 2.5 }}>
            Webアプリケーション開発からAI活用まで、幅広い技術スタックで課題解決に取り組んでいます。
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
