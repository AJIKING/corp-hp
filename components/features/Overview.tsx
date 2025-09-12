import { Stack, Typography } from '@mui/material'

export const Overview = () => {
  return (
    <Stack
      id="overview"
      direction="column"
      spacing={8}
      alignItems="left"
      width={1}
      sx={{
        scrollMarginTop: '80px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="white"
        sx={{
          fontSize: {
            xs: 32,
            sm: 40,
          },
        }}
      >
        会社概要
      </Typography>
      <Stack direction="column" spacing={2}>
        <Stack spacing={1} sx={{ direction: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body1" color="white">
            会社名:
          </Typography>
          <Typography variant="body1" color="white">
            株式会社PLARIA
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ direction: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body1" color="white">
            設立:
          </Typography>
          <Typography variant="body1" color="white">
            2023年7月
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ direction: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body1" color="white">
            所在地:
          </Typography>
          <Typography variant="body1" color="white">
            〒150-0002 東京都渋谷区渋谷2-19-15 宮益坂ビルディング609F
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ direction: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body1" color="white">
            代表者:
          </Typography>
          <Typography variant="body1" color="white">
            代表取締役社長　安食 太人
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ direction: { xs: 'column', sm: 'row' } }}>
          <Typography variant="body1" color="white">
            事業内容:
          </Typography>
          <Typography variant="body1" color="white">
            Web/モバイルアプリ サービス開発
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
