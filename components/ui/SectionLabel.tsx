import { Box, Typography } from '@mui/material'

type Props = {
  children: React.ReactNode
  center?: boolean
}

export const SectionLabel = ({ children, center }: Props) => {
  return (
    <Typography
      component="div"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'var(--font-outfit), sans-serif',
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'accent.main',
        mb: 2,
        ...(center && { justifyContent: 'center' }),
      }}
    >
      <Box
        component="span"
        sx={{
          width: 24,
          height: 2,
          backgroundColor: 'accent.main',
          borderRadius: 2,
        }}
      />
      {children}
    </Typography>
  )
}
