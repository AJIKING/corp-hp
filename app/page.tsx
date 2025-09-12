import { About } from '@/components/features/About'
import { BusinessContent } from '@/components/features/BusinessContent'
import { ContactForm } from '@/components/features/ContactForm'
import { Corporate } from '@/components/features/Corporate'
import { Overview } from '@/components/features/Overview'
import { RepresentativeMessage } from '@/components/features/RepresentativeMessage'
import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Box, Divider, Grow, Stack } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Header />
      <Corporate />
      <Stack
        direction="column"
        spacing={{ xs: 24, md: 32 }}
        sx={{
          mt: 8,
          mb: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: {
            xs: 'auto', // 小さい画面では幅を自動調整
            md: 800, // 中くらい以上の画面では最大幅を800pxに制限
          },
          mx: {
            xs: 2, // 小さい画面ではマージンを小さく
            sm: 4,
            md: 'auto', // 中くらい以上の画面では中央に配置
          },
        }}
      >
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', width: '100%' }} />
        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
          <BusinessContent />
        </Grow>
        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
          <About />
        </Grow>
        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
          <RepresentativeMessage />
        </Grow>
        <Grow in={true} {...(true ? { timeout: 1000 } : {})}>
          <Overview />
        </Grow>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', width: '100%' }} />
        <ContactForm />
      </Stack>
      <Footer />
    </Box>
  )
}
