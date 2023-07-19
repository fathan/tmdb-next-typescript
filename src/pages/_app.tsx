import type { AppProps } from 'next/app';
import BaseLayout from '@/layouts/Base';
import '@/app/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}