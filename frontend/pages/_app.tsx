import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen col-4">
      <div className="col-span-1">
        <NavBar />
      </div>

      <div className="flex flex-wrap col-span-2 h-4/6">
        <Component {...pageProps} />
      </div>
      <div className="col-span-1 mt-auto">
        <Footer />
      </div>
    </div>
  )
}
export default MyApp
