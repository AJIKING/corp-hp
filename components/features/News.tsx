'use client'

import { Box, Typography } from '@mui/material'
import { SectionDescription } from '@/components/ui/SectionDescription'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealOnScroll, revealSx } from '@/hooks/useRevealOnScroll'

type NewsItem = {
  date: string
  tag: string
  tagType: 'news' | 'column' | 'release'
  title: string
  summary: string
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  news: { bg: 'rgba(56,182,255,0.12)', color: '#6dc8ff' },
  column: { bg: 'rgba(249,207,88,0.12)', color: '#F9CF58' },
  release: { bg: 'rgba(36,150,137,0.12)', color: '#249689' },
}

const NEWS_ITEMS: NewsItem[] = [
  {
    date: '2025.02.22',
    tag: 'ニュース',
    tagType: 'news',
    title: 'コーポレートサイトをリニューアルしました',
    summary: 'より分かりやすく、PLARIAの想いや事業内容をお伝えできるようサイトを一新しました。',
  },
  {
    date: '2025.02.20',
    tag: 'リリース',
    tagType: 'release',
    title: '新サービス「PLAYED」を開発中です',
    summary: '現在開発を進めているWebサービス「PLAYED」の情報を近日中に公開予定です。',
  },
]

export const News = () => {
  const headerRef = useRevealOnScroll()

  return (
    <Box
      component="section"
      id="news"
      sx={{
        py: { xs: '80px', md: '120px' },
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        backgroundColor: 'background.deep',
        scrollMarginTop: '72px',
      }}
    >
      <Box ref={headerRef} sx={revealSx}>
        <SectionLabel>News &amp; Column</SectionLabel>
        <SectionTitle>お知らせ・コラム</SectionTitle>
        <SectionDescription>
          PLARIAの最新情報や、テクノロジーに関する考え方を発信しています。
        </SectionDescription>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(300px, 1fr))' },
          gap: 3,
        }}
      >
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.title} {...item} />
        ))}
      </Box>
    </Box>
  )
}

const NewsCard = ({ date, tag, tagType, title, summary }: NewsItem) => {
  const ref = useRevealOnScroll()
  const tagColor = TAG_COLORS[tagType]

  return (
    <Box
      ref={ref}
      sx={{
        ...revealSx,
        backgroundColor: 'background.card',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 'var(--radius)',
        p: '32px 28px',
        transition: 'transform 0.35s, border-color 0.35s, box-shadow 0.35s',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: 'border.hover',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '14px' }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '0.78rem',
            fontWeight: 400,
            color: 'textCustom.muted',
          }}
        >
          {date}
        </Typography>
        <Box
          sx={{
            fontSize: '0.7rem',
            fontWeight: 500,
            px: '10px',
            py: '3px',
            borderRadius: 100,
            backgroundColor: tagColor.bg,
            color: tagColor.color,
          }}
        >
          {tag}
        </Box>
      </Box>
      <Typography sx={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.6, color: '#fff', mb: '10px' }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 400, color: 'textCustom.muted', lineHeight: 1.75 }}>
        {summary}
      </Typography>
    </Box>
  )
}
