import { Box, Stack, Typography } from '@mui/material'
import { SmileLottie } from '../ui/lottie/SmileLottie'

export const Corporate = () => {
  return (
    <Box
      id="corporate"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        mx: {
          xs: 2, // 小さい画面ではマージンを小さく
          sm: 4,
        },
        '&::after': {
          content: `"plaria inc"`,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: 16,
          fontFamily: 'var(--font-dancing-script)',
          fontSize: { xs: 126, sm: 160, md: 240 },
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1,
          color: 'currentColor',
          opacity: 0.1,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          mixBlendMode: 'multiply',
        },
      }}
    >
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          color="white"
          sx={{ fontSize: { xs: 32, sm: 64 } }}
        >
          感動体験から笑顔を広げる
        </Typography>
        <SmileLottie height={300} width={300} />
      </Stack>
      <Typography
        variant="h2"
        component="p"
        color="white"
        sx={{ fontSize: { xs: 24, sm: 26 } }}
        textAlign="center"
      >
        PLARIAはテクノロジーを駆使し、感動体験を創造して笑顔があふれる社会を実現します。
      </Typography>
    </Box>
  )
}
