import type { AppProps } from 'next/app'
import '../styles/main.scss'

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  void import('../lib/inject-axe')
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
