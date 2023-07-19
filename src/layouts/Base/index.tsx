import '@/app/styles/globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

export const metadata = {
  title: 'Layout',
  description: 'Description Layout',
}

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="bg-[#0d253f]">
        <div className="flex flex-col w-full relative 5:pt-[100px] max-w-[500px] my-0 mx-auto bg-[#0c2b4e] box-border overflow-hidden">
          <Navbar />
          
          <main className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
            {children}
          </main>
          
          <Footer />
        </div>
      </main>
    </>
  )
}