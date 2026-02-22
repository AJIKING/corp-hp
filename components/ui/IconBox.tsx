import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  size?: number
}

export const IconBox = ({ children, size = 52 }: Props) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '14px',
        backgroundColor: 'accent.glow',
        border: '1px solid rgba(56, 182, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '& svg': {
          width: size === 52 ? 24 : 20,
          height: size === 52 ? 24 : 20,
          stroke: 'var(--accent)',
          fill: 'none',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
      }}
    >
      {children}
    </Box>
  )
}
