'use client'
import { ThemeOptions, createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypeBackground {
    deep: string
    card: string
  }
  interface Palette {
    accent: {
      main: string
      light: string
      dark: string
      glow: string
      glowStrong: string
    }
    textCustom: {
      primary: string
      secondary: string
      muted: string
    }
    border: {
      default: string
      hover: string
    }
  }
  interface PaletteOptions {
    accent?: {
      main: string
      light: string
      dark: string
      glow: string
      glowStrong: string
    }
    textCustom?: {
      primary: string
      secondary: string
      muted: string
    }
    border?: {
      default: string
      hover: string
    }
  }
}

const appTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    common: {
      black: '#1F1F1F',
      white: '#fff',
    },
    primary: {
      main: '#38b6ff',
    },
    background: {
      default: '#373643',
      paper: '#373643',
      deep: '#2e2d3b',
      card: '#3f3e4e',
    },
    accent: {
      main: '#38b6ff',
      light: '#6dc8ff',
      dark: '#1a9ce0',
      glow: 'rgba(56, 182, 255, 0.12)',
      glowStrong: 'rgba(56, 182, 255, 0.35)',
    },
    textCustom: {
      primary: '#ffffff',
      secondary: '#b8b8cc',
      muted: '#8a8a9e',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.07)',
      hover: 'rgba(255, 255, 255, 0.14)',
    },
    success: {
      main: '#249689',
    },
    error: {
      main: '#FF5963',
    },
    warning: {
      main: '#F9CF58',
    },
    info: {
      main: '#60a5fa',
    },
  },
  typography: {
    fontFamily:
      'var(--font-zen-maru-gothic), var(--font-dancing-script), sans-serif, system-ui',
    h1: {
      fontFamily: 'var(--font-zen-maru-gothic), sans-serif',
      fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
      lineHeight: 1.35,
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'var(--font-zen-maru-gothic), sans-serif',
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      lineHeight: 1.3,
      fontWeight: 500,
      marginBottom: '20px',
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.9,
      color: '#b8b8cc',
    },
    subtitle2: {
      fontSize: '0.95rem',
      lineHeight: 2,
      color: '#b8b8cc',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.8,
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.9,
      color: '#b8b8cc',
    },
    button: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: '#ffffff',
      textTransform: 'none',
    },
  },
}

export const theme = createTheme(appTheme)
