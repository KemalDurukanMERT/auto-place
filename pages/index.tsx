import { Inter } from 'next/font/google'
import Autocomplete from './autocomplete'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div>Auto Place Complete</div>
      <Autocomplete/>
    </main>
  )
}
