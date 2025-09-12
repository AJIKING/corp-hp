import { Stack, Typography } from '@mui/material'

export const RepresentativeMessage = () => {
  return (
    <Stack
      id="message"
      spacing={8}
      direction="column"
      sx={{
        scrollMarginTop: '80px',
      }}
    >
      <Stack direction="column" spacing={8} alignItems="left" width={1}>
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
          代表メッセージ
        </Typography>
        <Typography variant="body1" color="white">
          私は、以前からテクノロジーを活用してサービスを提供し続けていました。{`\n`}
          その中で関わる方々や利用してくださる方々の笑顔を見るたびに、喜びを感じてきました。{`\n`}
          {`\n`}
          ですが、もっと多くの人々に価値を届け、社会に貢献したいという強い思いから株式会社PLARIAを設立しました。
          {`\n`}
          私たちは、WebやAIなどの先端技術を駆使し、革新的なサービスを提供することで、感動体験を創造して笑顔があふれる社会を実現します。
        </Typography>
        <Typography variant="body1" color="white">
          代表取締役社長　安食 太人
        </Typography>
      </Stack>
    </Stack>
  )
}
