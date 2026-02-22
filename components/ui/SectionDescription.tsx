import { Typography } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const SectionDescription = ({ children }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: '1rem',
        fontWeight: 400,
        color: 'textCustom.secondary',
        maxWidth: 600,
        mb: 7,
      }}
    >
      {children}
    </Typography>
  )
}
