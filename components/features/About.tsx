import { Stack, Typography } from '@mui/material'

export const About = () => {
  return (
    <Stack
      id="about"
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
        私たちについて
      </Typography>
      <Typography variant="body1" color="white" whiteSpace="pre-line">
        株式会社PLARIA（プラリア）は、新しいテクノロジーの活用によって「感動体験を創造して笑顔を広げる」ことを目指す企業です。
        {`\n`}
        WebやAIなどのテクノロジーを駆使し、さまざまな業界に革新をもたらします。
      </Typography>
    </Stack>
  )
}
