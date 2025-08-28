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
  description: 'A modern issue tracking application',
}

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode
} ) {
  return (
    <html lang="en" suppressHydrationWarning>
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
