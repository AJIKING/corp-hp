import { Typography } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const SectionTitle = ({ children }: Props) => {
  return (
    <Typography variant="h2" component="h2" sx={{ color: 'textCustom.primary' }}>
      {children}
    </Typography>
  )
}
