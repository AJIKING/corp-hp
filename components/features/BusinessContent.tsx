'use client'

import { Box, Typography } from '@mui/material'
import { IconBox } from '@/components/ui/IconBox'
import { SectionDescription } from '@/components/ui/SectionDescription'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

const SERVICES = [
  {
    title: 'プロダクトソリューション開発事業',
    description:
      '企業や個人の要望や希望から本質を理解し、それに応じたWebおよびモバイルアプリケーションの開発を行います。最先端のテクノロジーを駆使し、ユーザーフレンドリーで直感的なソリューションを提供します。',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 10 9.5 7.5 7 5" />
        <line x1="11" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    title: 'サービス開発事業',
    description:
      '自社サービスの企画、開発、運営を行い、市場のニーズに応え、業務の効率化やフィットネス領域を拡大し、ユーザー体験を最大化する革新的なサービスやプロダクトを生み出します。',
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
]

export const BusinessContent = () => {
  const headerRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        backgroundColor: 'background.deep',
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>Services</SectionLabel>
        <SectionTitle>事業内容</SectionTitle>
        <SectionDescription>
          テクノロジーの力で、企業の成長と社会の発展に貢献するソリューションを提供します。
        </SectionDescription>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(320px, 1fr))' },
          gap: 3,
        }}
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </Box>
    </Box>
  )
}

const ServiceCard = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) => {
  const ref = useRevealOnScroll()

  return (
    <Box
      ref={ref}
      sx={{
        ...revealSx,
        backgroundColor: 'background.card',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 'var(--radius)',
        p: { xs: '32px 24px', md: '40px 36px' },
        transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: 'accent.main',
          opacity: 0,
          transition: 'opacity 0.35s',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'border.hover',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          '&::before': { opacity: 1 },
        },
      }}
    >
      <IconBox>{icon}</IconBox>
      <Typography sx={{ fontSize: '1.15rem', fontWeight: 500, color: '#fff', mb: '14px', mt: 3 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 400, color: 'textCustom.secondary', lineHeight: 1.9 }}>
        {description}
      </Typography>
    </Box>
  )
}
