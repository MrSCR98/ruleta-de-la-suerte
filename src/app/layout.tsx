import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Ruleta de la suerte',
  description:
    'Crea tu ruleta personalizada: añade, edita y elimina opciones y haz girar para decidir.',
}

/* #9ae600 #9ae600*/
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
        'font-sans',
        'bg-background',
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
