import type { AppProps } from 'next/app'
import '../styles/main.scss'

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('../lib/axe.development').catch(console.error)
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
