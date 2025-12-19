'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [info, setInfo] = useState<string | null>(null)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setInfo(null)
        setLoading(true)

        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            setLoading(false)

            if (error) {
                setError(error.message)
                return
            }

            document.cookie = 'token=1; path=/; max-age=604800'

            router.push('/dashboard')
            return
        }

        // Sign up flow
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        setInfo('Sign up successful. Check your email to confirm your account if required.')
    }

    return (
        <main className="container">
            <div className="card stack gap-md">
                <h1 className="title">{mode === 'login' ? 'Login' : 'Sign up'}</h1>
                <p className="muted">
                    {mode === 'login'
                        ? 'Sign in with your Supabase email and password.'
                        : 'Create a new account with your email and password.'}
                </p>

                <form onSubmit={handleSubmit} className="stack gap-sm">
                    <label className="stack gap-xs">
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="stack gap-xs">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {error && <p className="error">{error}</p>}
                    {info && <p className="muted">{info}</p>}

                    <div className="stack gap-xs">
                        <button type="submit" disabled={loading}>
                            {loading
                                ? mode === 'login'
                                    ? 'Logging in…'
                                    : 'Signing up…'
                                : mode === 'login'
                                    ? 'Login'
                                    : 'Sign up'}
                        </button>

                        <button
                            type="button"
                            className="muted"
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            disabled={loading}
                        >
                            {mode === 'login'
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Login'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
