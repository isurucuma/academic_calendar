import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="col-4 flex min-h-screen flex-col">
        <div className="col-span-1">
          <NavBar />
        </div>

        <div className="col-span-2 flex flex-wrap overflow-hidden">
          <Component {...pageProps} />
        </div>
        <div className="col-span-1 mt-auto">
          <Footer />
        </div>
      </div>
    </SessionProvider>
  )
}
export default MyApp
