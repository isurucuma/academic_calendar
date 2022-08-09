import '../styles/globals.css'
import React, { createContext, useState } from 'react'
import type { AppProps } from 'next/app'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import { SessionProvider } from 'next-auth/react'

export const filterContext = createContext({})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [filter, setFilter] = useState({ name: 'E17' })

  return (
    <SessionProvider session={session}>
      <filterContext.Provider
        value={{
          filter,
          setFilter,
        }}
      >
        <div className="flex flex-col min-h-screen col-4">
          <div className="col-span-1">
            <NavBar />
          </div>

          <div className="flex flex-wrap col-span-2 overflow-hidden">
            <Component {...pageProps} />
          </div>
          <div className="col-span-1 mt-auto">
            <Footer />
          </div>
        </div>
      </filterContext.Provider>
    </SessionProvider>
  )
}
export default MyApp
