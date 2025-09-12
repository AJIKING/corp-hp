// components/Header.tsx
'use client'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { LogoImage } from './LogoImage'

const NAV_ITEMS = [
  { label: '事業内容', href: '/#business' },
  { label: '私たちについて', href: '/#about' },
  { label: 'お問い合わせ', href: '/#contact' },
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  const toggle = (val: boolean) => () => setOpen(val)

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/" aria-label="トップへ">
            <LogoImage />
          </Link>
        </Box>

        {/* Right: Desktop nav */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            color: 'white', // 背景が暗い想定。明るい場合は 'text.primary' に変更
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography variant="h6" component="div" fontSize={18} sx={{ flexGrow: 1 }}>
                {item.label}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Right: Mobile hamburger */}
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
      </Toolbar>

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
            <CloseIcon
              sx={{
                color: 'white',
              }}
            />
          </IconButton>
        </Box>
        <Divider />

        <List sx={{ py: 0 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggle(false)}
              sx={{ py: 2 }}
            >
              <ListItemText primary={item.label} sx={{ variant: 'h6', fontSize: 18 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}
