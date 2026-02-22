import { ThemeRegistry } from '@/hooks/ThemeProvider'
import type { Metadata } from 'next'
import { Dancing_Script, Outfit, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['300', '400', '500', '700'],
  variable: '--font-zen-maru-gothic',
  subsets: ['latin'],
})

const dancingScript = Dancing_Script({
  weight: '400',
  variable: '--font-dancing-script',
  subsets: ['latin'],
})

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://plaria.co.jp'),
  title: '株式会社PLARIA',
  description:
    '「感動体験から笑顔を広げる」をミッションに掲げる、株式会社PLARIAのホームページです。',
  authors: [{ name: '株式会社PLARIA', url: 'https://plaria.co.jp' }],
  keywords: [
    'PLARIA',
    'プラリア',
    '株式会社PLARIA',
    '感動体験',
    '笑顔',
    'テクノロジー',
    'ソフトウェア開発',
    'システム開発',
    'ITソリューション',
    'DX支援',
    '業務効率化',
    'クラウドサービス',
    'モバイルアプリ開発',
    'Webアプリケーション開発',
    'AIソリューション',
    'IoTソリューション',
    'ITコンサルティング',
    'ITアウトソーシング',
  ],
  openGraph: {
    title: '株式会社PLARIA',
    description:
      '「感動体験から笑顔を広げる」をミッションに掲げる、株式会社PLARIAのホームページです。',
    url: 'https://plaria.co.jp',
    siteName: '株式会社PLARIA',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: '株式会社PLARIA',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社PLARIA',
    description:
      '「感動体験から笑顔を広げる」をミッションに掲げる、株式会社PLARIAのホームページです。',
    images: ['/ogp.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appLinks: { web: { url: 'https://plaria.co.jp', should_fallback: true } },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '株式会社PLARIA',
              alternateName: ['PLARIA'],
              url: 'https://plaria.co.jp',
            }),
          }}
        />
      </head>
      <body className={`${zenMaruGothic.variable} ${dancingScript.variable} ${outfit.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
