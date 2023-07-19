import '@/app/styles/globals.css'
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Providers } from '@/redux/provider';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next'
import InternetStatus from '@/components/InternetStatus';

export const metadata: Metadata = {
  title: 'TMDB',
  description: 'Integration API TMDB with Next.js, Typescript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <main className="bg-[#0d253f]">
            <div className="flex flex-col w-full relative 5:pt-[100px] max-w-[500px] my-0 mx-auto bg-[#0c2b4e] box-border overflow-hidden">
              <Navbar />
              
              <Suspense fallback={<Loading />}>
                <div className="mt-14">
                  {children}
                </div>
              </Suspense>
              
              <Footer />
              <InternetStatus />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
