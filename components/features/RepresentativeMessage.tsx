'use client'

import { Box, Typography } from '@mui/material'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

export const RepresentativeMessage = () => {
  const ref = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="message"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        backgroundColor: 'background.deep',
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={ref} sx={{ ...revealSx, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
        <SectionLabel center>Message</SectionLabel>
        <SectionTitle>代表メッセージ</SectionTitle>

        {/* Quote card */}
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'background.card',
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 'var(--radius)',
            p: { xs: '40px 28px', md: '56px 48px' },
            mt: 5,
            '&::before': {
              content: '"\\201C"',
              position: 'absolute',
              top: -16,
              left: 40,
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '5.5rem',
              lineHeight: 1,
              color: 'accent.main',
              opacity: 0.25,
            },
          }}
        >
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2.1, textAlign: 'left' }}>
            私は、以前からテクノロジーを活用してサービスを磨き上げ続けてきました。その中で関わる方々の問題としてできるだけ多くの方に笑顔を届けたいという思いが日に日に強くなりました。
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2.1, textAlign: 'left', mt: 2 }}>
            ですが、もっと多くの人々に価値を届け、社会に貢献できる場を広げるために、新しい一歩として株式会社PLARIAを設立しました。
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'textCustom.secondary', lineHeight: 2.1, textAlign: 'left', mt: 2 }}>
            私たちは、WebやAIなどの先端技術を駆使し、革新的なサービスを提供することで、感動体験を創造して笑顔を広げる社会を実現します。
          </Typography>

          {/* Author */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 4,
              pt: 3.5,
              borderTop: '1px solid',
              borderColor: 'border.default',
            }}
          >
            <Box
              sx={{
                textAlign: 'left',
                pl: 2,
                borderLeft: '3px solid',
                borderColor: 'accent.main',
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#fff' }}>
                安食 太人
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: 'textCustom.muted' }}>
                代表取締役社長
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
