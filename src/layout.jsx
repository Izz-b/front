import { Inter } from "next/font/google"
import "./App.css"
import App from "./App"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Calendrier des examens et de surveillance",
  description: "Système de gestion des plannings d'examens et de surveillance",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <App />
      </body>
    </html>
  )
}

