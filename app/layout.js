
import '@/app/_styles/globals.css'
import Header from "@/app/_components/Header"

export const metadata = {
  title:{ template:'%s / The Wild Oasis',default:'Welcome / The Wild Oasis'},
  description: 'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beatiful mountains and dark forests',
}

import {Josefin_Sans} from 'next/font/google'
import { ReservationProvider } from './_components/ReservationContext'

const josefin=Josefin_Sans({
  subsets:['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}>

        <Header/>
        <div className="flex-1 px-4 py-8 sm:px-8 sm:py-12 grid">

        <main className="max-w-7xl  mx-auto w-full">
        <ReservationProvider>

        {children}
        </ReservationProvider>
        
        </main>
        </div>
      </body>
    </html>
  )
}
