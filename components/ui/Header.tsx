'use client'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { LogoImage } from './LogoImage'

const NAV_ITEMS = [
  { label: '事業内容', href: '/#services' },
  { label: 'サービス', href: '/#product' },
  { label: '私たちについて', href: '/#about' },
  { label: 'お知らせ', href: '/#news' },
  { label: '会社概要', href: '/#company' },
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  const toggle = (val: boolean) => () => setOpen(val)

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(55, 54, 67, 0.78)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.5)',
        borderBottom: '1px solid',
        borderColor: 'border.default',
        height: 72,
        justifyContent: 'center',
        px: { xs: 3, md: 'clamp(24px, 5vw, 80px)' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="トップへ">
          <LogoImage height={30} />
        </Link>

        {/* Desktop nav */}
        <Box
          component="ul"
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: '36px',
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'textCustom.secondary',
                    transition: 'color 0.25s',
                    '&:hover': { color: 'textCustom.primary' },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </li>
          ))}
          <li>
            <Button
              component={Link}
              href="/#contact"
              sx={{
                backgroundColor: 'accent.main',
                color: '#fff',
                px: '22px',
                py: '8px',
                borderRadius: 100,
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'none',
                transition: 'transform 0.2s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px var(--accent-glow-strong)',
                  backgroundColor: 'accent.main',
                },
              }}
            >
              お問い合わせ
            </Button>
          </li>
        </Box>

        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            aria-label="メニューを開く"
            onClick={toggle(true)}
            edge="end"
            size="large"
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggle(false)}
        PaperProps={{
          sx: {
            width: '80vw',
            maxWidth: 360,
            backgroundColor: 'background.default',
            color: 'text.primary',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" onClick={toggle(false)} aria-label="トップへ">
            <LogoImage />
          </Link>
          <IconButton aria-label="メニューを閉じる" onClick={toggle(false)}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'border.default' }} />

        <List sx={{ py: 0 }}>
          {[...NAV_ITEMS, { label: 'お問い合わせ', href: '/#contact' }].map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggle(false)}
              sx={{ py: 2 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}
