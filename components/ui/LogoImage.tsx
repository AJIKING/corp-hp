// LogoImage.tsx
'use client'

import { Box, SxProps } from '@mui/material'

type Props = {
  href?: string
  width?: number
  height?: number
  alt?: string
  svgSrc?: string
  sx?: SxProps
}

export const LogoImage = ({
  width = 140,
  height = 40,
  alt = 'PLARIA logo',
  svgSrc = '/plaria.svg',
  sx,
}: Props) => {
  return (
    <Box
      aria-label="ホームへ"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0,
        ...sx,
      }}
    >
      <Box
        component="img"
        src={svgSrc}
        alt={alt}
        width={width}
        height={height}
        style={{ display: 'block' }}
      />
    </Box>
  )
}
