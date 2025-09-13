import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <Box>
      <Header />
      <Container maxWidth="md" sx={{ mt: `calc(80px + 32px)`, mb: 16 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="white"
          id="privacy-policy"
          textAlign="center"
        >
          プライバシーポリシー
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', width: '100%' }} />

        <Stack direction="column" spacing={4} alignItems="flex-start" width={1} sx={{ mt: 4 }}>
          {/* 導入 */}
          <Typography variant="body1" color="white" paragraph>
            株式会社PLARIA（以下「当社」といいます。）は、お客様のプライバシーを尊重し、個人情報の適切な取扱いに努めます。
            本プライバシーポリシー（以下「本ポリシー」）は、当社が取得する個人情報の種類、その利用目的、第三者提供、保護措置等について定めるものです。
            当社のサービスをご利用になる前に本ポリシーをご確認ください。
          </Typography>

          {/* 1. 収集 */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-1">
            1. 個人情報の収集
          </Typography>
          <Typography component="ul" sx={{ pl: 3, m: 0, color: 'white' }}>
            <li>お名前、メールアドレス、電話番号などの連絡先情報</li>
            <li>アカウント情報（ユーザーID、認証情報 等）</li>
            <li>
              サービス利用履歴、アクセスログ、IPアドレス、端末情報、ブラウザ情報などの技術情報
            </li>
            <li>お問い合わせやアンケート等でお客様が当社に提供する情報</li>
          </Typography>

          {/* 2. 利用目的 */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-2">
            2. 個人情報の利用目的
          </Typography>
          <Typography component="ul" sx={{ pl: 3, m: 0, color: 'white' }}>
            <li>当社サービスの提供、運営、保守、改善</li>
            <li>本人確認、各種お問い合わせへの対応、サポート提供</li>
            <li>お知らせ・キャンペーン・アンケート等のご案内（マーケティングを含む）</li>
            <li>利用規約違反等への対応、不正利用の防止、セキュリティ対策</li>
            <li>法令・ガイドライン等に基づく対応</li>
          </Typography>

          {/* 3. 第三者提供 */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-3">
            3. 個人情報の第三者提供
          </Typography>
          <Typography variant="body1" color="white" paragraph>
            当社は、あらかじめお客様の同意を得ないで個人情報を第三者に提供しません。ただし、次の場合はこの限りではありません。
          </Typography>
          <Typography component="ul" sx={{ pl: 3, m: 0, color: 'white' }}>
            <li>法令に基づく場合、または国の機関等からの手続に従う場合</li>
            <li>人の生命・身体または財産の保護のために必要で、同意取得が困難な場合</li>
            <li>公衆衛生の向上又は児童の健全な育成推進のために特に必要で、同意取得が困難な場合</li>
            <li>司法・行政手続に関連して正当な開示要請を受けた場合</li>
            <li>利用目的の達成に必要な範囲で個人情報の取扱いの全部又は一部を業務委託する場合</li>
            <li>
              事業の承継に伴って個人情報が提供される場合（承継先においても本ポリシーと同等の管理を求めます）
            </li>
          </Typography>

          {/* 4. 保護措置 */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-4">
            4. 個人情報の保護措置
          </Typography>
          <Typography variant="body1" color="white" paragraph>
            当社は、個人情報の漏えい、滅失又はき損等を防止するため、アクセス制御、暗号化、ログ監査等の
            技術的・組織的安全管理措置を講じ、必要に応じて見直し・改善を行います。
          </Typography>

          {/* 5. Cookie */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-5">
            5. クッキー（Cookie）等の利用
          </Typography>
          <Typography variant="body1" color="white" paragraph>
            当社は、サービスの利便性向上や利用状況の把握のため、Cookie
            やこれに類する技術を利用することがあります。
            お客様はブラウザ設定でCookieを無効化できますが、その場合、一部機能がご利用いただけないことがあります。
            また、分析・広告配信等のために第三者のツールを利用することがあり、当該事業者に対して匿名化された情報が提供される場合があります。
            詳細やオプトアウト方法は今後ウェブサイト上で案内します。
          </Typography>

          {/* 6. お問い合わせ */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-6">
            6. お問い合わせ窓口
          </Typography>
          <Typography variant="body1" color="white" paragraph>
            個人情報の取扱いに関するお問い合わせ、ご相談、開示等のご請求は下記までご連絡ください。
            <br />
            株式会社PLARIA
            <br />
            メールアドレス：{' '}
            <Link href="mailto:info@plaria.co.jp" style={{ color: 'white' }}>
              info@plaria.co.jp
            </Link>
          </Typography>

          {/* 7. 変更 */}
          <Typography variant="h6" component="h2" gutterBottom color="white" id="section-7">
            7. 本ポリシーの変更
          </Typography>
          <Typography variant="body1" color="white">
            当社は、必要に応じて本ポリシーを変更することがあります。重要な変更を行う場合は、当社ウェブサイトでの掲示その他適切な方法によりお知らせします。
            変更後の本ポリシーは、当社ウェブサイトに掲載された時点から適用されます。
          </Typography>

          {/* 施行日/改定日（任意） */}
          <Stack direction="column" spacing={1} alignItems="flex-start" width={1} sx={{ mt: 4 }}>
            <Typography variant="body2" color="white">
              施行日：2025年09月13日
            </Typography>
            <Typography variant="body2" color="white">
              代表取締役社長　安食 太人
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </Box>
  )
}
