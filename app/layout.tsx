import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NabBar from './NabBar';
import './theme-config.css';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './components/ToastProvider';

const inter = Inter( {
  subsets: [ 'latin' ],
  variable: '--font-inter',
} )

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A modern issue tracking application for efficient project management and bug tracking',
  keywords: 'issue tracker, project management, bug tracking, task management, software development',
  authors: [{ name: 'Issue Tracker Team' }],
  creator: 'Issue Tracker',
  publisher: 'Issue Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://issue-tracker.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Issue Tracker',
    description: 'A modern issue tracking application for efficient project management and bug tracking',
    url: 'https://issue-tracker.com',
    siteName: 'Issue Tracker',
    images: [
      {
        url: '/logo.svg',
        width: 48,
        height: 48,
        alt: 'Issue Tracker Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Issue Tracker',
    description: 'A modern issue tracking application for efficient project management and bug tracking',
    images: ['/logo.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className={ inter.variable }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <AuthProvider>
              <Theme accentColor="violet">
                <NabBar />
                <main className='px-5'>
                  <Container>
                    { children }
                  </Container>
                </main>
                <ToastProvider />
              </Theme>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
