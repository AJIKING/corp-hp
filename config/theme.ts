'use client'
import { ThemeOptions, createTheme } from '@mui/material/styles'

const appTheme: ThemeOptions = {
  palette: {
    mode: 'light',
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
      'var(--font-zen-old-mincho), serif, var(--font-dancing-script), sans-serif, system-ui',
    h1: {
      fontSize: 64,
      lineHeight: 1.3,
      fontWeight: 600,
    },
    h2: {
      fontSize: 48,
      lineHeight: 1.3,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 26,
      lineHeight: 1.8,
      color: '#ffffff',
    },
    subtitle2: {
      fontSize: 20,
      lineHeight: 1.6,
      color: '#ffffff',
    },
    body1: {
      fontSize: 20,
      lineHeight: 1.8,
      color: '#ffffff',
    },
    body2: {
      fontSize: 18,
      lineHeight: 1.6,
      color: '#ffffff',
    },
    button: {
      fontSize: 18,
      lineHeight: 1.6,
      color: '#ffffff',
      textTransform: 'none',
    },
  },
}

export const theme = createTheme(appTheme)
