import { Box, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'ホーム', href: '/' },
  { label: '事業内容', href: '/#business' },
  { label: '私たちについて', href: '/#about' },
  { label: '代表メッセージ', href: '/#message' },
  { label: '会社概要', href: '/#overview' },
  { label: 'お問い合わせ', href: '/#contact' },
  { label: 'プライバシーポリシー', href: '/privacypolicy' },
]

export const Footer = () => {
  return (
    <Box
      sx={{
        color: '#fff',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          variant="h2"
          sx={{
            fontSize: 22,
          }}
        >
          株式会社PLARIA
        </Typography>
        <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap sx={{ fontSize: 12, mb: 1 }}>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>
      </Grid>

      <Typography variant="caption" sx={{ opacity: 0.6 }}>
        © 2025 plaria Inc. All rights reserved.
      </Typography>
    </Box>
  )
}
