import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Ruleta de la suerte',
  description:
    'Crea tu ruleta personalizada: añade, edita y elimina opciones y haz girar para decidir.',

  // generator: 'Next.js',
  applicationName: 'Ruleta de la suerte',
  referrer: 'origin-when-cross-origin',
  keywords: ['Ruleta', 'Suerte'],
  authors: [{ name: 'SCR98', url: 'https://www.youtube.com/@SCR98' }],
  creator: 'SCR98',
  publisher: 'SCR98',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL('https://calculadora-raideos-rust.pages.dev'),

  // alternates: {
  //   canonical: '/',
  //   languages: {
  //     'en-US': '/en-US',
  //     'de-DE': '/de-DE',
  //   },
  // },

  /*   
  alternates: {
    canonical: 'https://nextjs.org',
    languages: {
      'en-US': 'https://nextjs.org/en-US',
      'de-DE': 'https://nextjs.org/de-DE',
    },
    media: {
      'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
    },
    types: {
      'application/rss+xml': 'https://nextjs.org/rss',
    },
  }, 
  */

  openGraph: {
    title: 'Ruleta de la suerte',
    description:
      'Crea tu ruleta personalizada: añade, edita y elimina opciones y haz girar para decidir.',
    url: 'https://calculadora-raideos-rust.pages.dev',
    siteName: 'Ruleta de la suerte',
    images: [
      {
        url: 'https://calculadora-raideos-rust.pages.dev/opengraph/og.jpg', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
      // {
      //   url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
      //   width: 1800,
      //   height: 1600,
      //   alt: 'My custom alt',
      // },
    ],
    locale: 'es_ES',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
    // nocache: true,
    googleBot: {
      index: true,
      follow: true,
      // noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // manifest: 'https://nextjs.org/manifest.json',

  twitter: {
    card: 'summary_large_image',
    title: 'Ruleta de la suerte',
    description:
      'Crea tu ruleta personalizada: añade, edita y elimina opciones y haz girar para decidir.',
    // siteId: '1467726470533754880',
    // creator: '@nextjs',
    // creatorId: '1467726470533754880',
    images: ['https://calculadora-raideos-rust.pages.dev/opengraph/og.jpg'], // Must be an absolute URL
    /* 
    images: {
      url: 'https://nextjs.org/og.png',
      alt: 'Next.js Logo',
    }, 
    */
  },

  // verification: {
  //   google: 'google',
  //   yandex: 'yandex',
  //   yahoo: 'yahoo',
  //   other: {
  //     me: ['my-email', 'my-link'],
  //   },
  // },

  // assets: ['https://nextjs.org/assets'],
  // bookmarks: ['https://nextjs.org/13'],
  category: 'ruleta-de-la-suerte',

  icons: {
    icon: [
      // { url: '/favicon_16x16.ico', type: 'image/x-icon', sizes: '16x16' },
      // { url: '/favicon_32x32.ico', type: 'image/x-icon', sizes: '32x32' },
      // { url: '/favicon_48x48.ico', type: 'image/x-icon', sizes: '48x48' },
      // { url: '/favicon_64x64.ico', type: 'image/x-icon', sizes: '64x64' },
      // { url: '/favicon_128x128.ico', type: 'image/x-icon', sizes: '128x128' },
      { url: '/favicon_256x256.ico', type: 'image/x-icon', sizes: '256x256' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#9ae600',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn(
        'antialiased',
        'bg-background',
        'font-sans',
        inter.variable
      )}
    >
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
