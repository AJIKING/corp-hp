import { Header } from '@/components/ui/Header'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          pt: `calc(80px + 32px)`,
          pb: 8,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Stack
          direction="column"
          spacing={4}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="white"
            id="notfound"
            textAlign="center"
          >
            404 - ページが見つかりません
          </Typography>
          <Typography variant="body1" color="white">
            お探しのページは存在しないか、移動した可能性があります。
          </Typography>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                color: 'white',
              }}
            >
              トップページに戻る
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}
