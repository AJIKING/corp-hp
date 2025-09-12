import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Stack, Typography } from '@mui/material'

export const BusinessContent = () => {
  return (
    <Stack
      id="business"
      spacing={8}
      direction="column"
      width={1}
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
          事業内容
        </Typography>
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center">
            <MiscellaneousServicesIcon sx={{ fontSize: 40, color: '#aed581' }} />
            <Typography
              variant="subtitle1"
              color="white"
              fontWeight={500}
              sx={{ fontSize: { xs: 24, sm: 28 } }}
            >
              プロダクトソリューション開発事業
            </Typography>
          </Stack>
          <Typography variant="body2" color="white">
            企業や個人のご要望や背景から本質を理解し、それに応じたWebおよびモバイルアプリケーションの開発しています。
            {`\n`}
            最新の技術とデザインを駆使し、ユーザーフレンドリーで高性能なソリューションを提供します。
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center">
            <PeopleAltIcon sx={{ fontSize: 40, color: '#aed581' }} />
            <Typography
              variant="subtitle1"
              color="white"
              fontWeight={500}
              sx={{ fontSize: { xs: 24, sm: 28 } }}
            >
              サービス開発事業
            </Typography>
          </Stack>
          <Typography variant="body2" color="white">
            自社サービスの企画、開発、運営を行っています。市場のニーズを捉え、革新的なアイデアを形にし、ユーザーに価値ある体験を提供します。
            {`\n`}
            継続的な改善とユーザーフィードバックを重視し、サービスの品質向上に努めています。
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
