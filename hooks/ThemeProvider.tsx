import { theme } from '@/config/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'

type ThemeRegistryProps = {
  children: React.ReactNode
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  )
}
