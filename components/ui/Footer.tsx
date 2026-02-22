import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { LogoImage } from './LogoImage'

const FOOTER_LINKS = [
  { label: '事業内容', href: '/#services' },
  { label: '会社概要', href: '/#company' },
  { label: 'お問い合わせ', href: '/#contact' },
  { label: 'プライバシーポリシー', href: '/privacypolicy' },
]

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: { xs: '20px', md: 'clamp(24px, 8vw, 140px)' },
        borderTop: '1px solid',
        borderColor: 'border.default',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: '20px', sm: 0 },
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        spacing={{ xs: 1.5, sm: 3.5 }}
      >
        <LogoImage height={22} />
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 400, color: 'textCustom.muted' }}>
          © PLARIA Inc. All rights reserved.
        </Typography>
      </Stack>

      <Stack
        component="ul"
        direction="row"
        spacing={3.5}
        sx={{ listStyle: 'none', m: 0, p: 0, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {FOOTER_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  color: 'textCustom.muted',
                  transition: 'color 0.25s',
                  '&:hover': { color: 'textCustom.secondary' },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          </li>
        ))}
      </Stack>
    </Box>
  )
}
