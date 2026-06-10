'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="h-14 border-b border-border bg-bg flex items-center px-4">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-fg tracking-tight">
          ertemol<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href="/settings"
                className="text-sm text-muted hover:text-fg transition-colors"
              >
                Settings
              </Link>
              <span className="text-sm text-muted hidden sm:block">
                {session.user.name}
              </span>
              <Link
                href="/broadcast"
                className="text-sm font-medium text-white bg-accent px-4 py-1.5"
                style={{ borderRadius: 8 }}
              >
                Go live
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-muted border border-border px-3 py-1.5 bg-transparent"
                style={{ borderRadius: 8 }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn('google')}
                className="text-sm text-fg border border-border px-3 py-1.5 bg-transparent"
                style={{ borderRadius: 8 }}
              >
                Sign in
              </button>
              <button
                onClick={() => signIn('google')}
                className="text-sm font-medium text-white bg-accent px-4 py-1.5"
                style={{ borderRadius: 8 }}
              >
                Go live
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
