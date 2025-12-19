import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Supabase CRUD with Next.js",
  description: "Simple CRUD demo using Next.js App Router, TypeScript, and Supabase"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

