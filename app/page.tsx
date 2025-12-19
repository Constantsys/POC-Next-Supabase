"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="container">
      <div className="card stack gap-lg items-center">
        <div className="stack items-center">
          <h1 className="title">Welcome</h1>
          <p className="subtitle">Choose where you want to go</p>
        </div>

        <div className="stack gap-md w-full">
          <Link href="/login" className="btn btn-primary">
            Go to Login
          </Link>

          <Link href="/dashboard" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
