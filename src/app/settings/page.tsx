'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserProfile {
  id: string
  email: string
  name: string | null
  image: string | null
  displayName: string | null
  bio: string | null
  contactEmail: string
  instagram: string
  twitter: string
  website: string
}

export default function SettingsPage() {
  const { status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            ...data,
            contactEmail: data.contactEmail || '',
            instagram: data.instagram || '',
            twitter: data.twitter || '',
            website: data.website || '',
          })
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [status, router])

  async function handleSave() {
    if (!profile) return
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: profile.displayName,
          bio: profile.bio,
          contactEmail: profile.contactEmail,
          instagram: profile.instagram,
          twitter: profile.twitter,
          website: profile.website,
        }),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return <div className="text-sm text-muted py-8 text-center">Loading...</div>
  }

  if (!profile) return null

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-lg font-500 text-fg mb-1">Settings</h1>
        <p className="text-sm text-muted">Manage your profile and contact information.</p>
      </div>

      <div className="border border-border p-4 space-y-4" style={{ borderRadius: 8 }}>
        <div>
          <label className="text-sm font-500 text-fg block mb-1.5">Display Name (Rumuz)</label>
          <input
            type="text"
            value={profile.displayName || ''}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            placeholder="Enter your display name..."
            className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
            style={{ borderRadius: 8 }}
            maxLength={30}
          />
          <p className="text-xs text-muted mt-1">This will be shown to listeners instead of your real name.</p>
        </div>

        <div>
          <label className="text-sm font-500 text-fg block mb-1.5">Bio (Tanıtım)</label>
          <textarea
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Tell listeners about yourself..."
            rows={3}
            className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2 resize-none"
            style={{ borderRadius: 8 }}
            maxLength={200}
          />
        </div>

        <div className="border-t border-border pt-4">
          <h2 className="text-sm font-500 text-fg mb-3">Contact & Social Links</h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-500 text-muted block mb-1">Contact Email</label>
              <input
                type="email"
                value={profile.contactEmail}
                onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                placeholder="your@email.com"
                className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
                style={{ borderRadius: 8 }}
              />
            </div>

            <div>
              <label className="text-xs font-500 text-muted block mb-1">Instagram</label>
              <input
                type="text"
                value={profile.instagram}
                onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                placeholder="@username"
                className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
                style={{ borderRadius: 8 }}
              />
            </div>

            <div>
              <label className="text-xs font-500 text-muted block mb-1">Twitter/X</label>
              <input
                type="text"
                value={profile.twitter}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                placeholder="@username"
                className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
                style={{ borderRadius: 8 }}
              />
            </div>

            <div>
              <label className="text-xs font-500 text-muted block mb-1">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
                style={{ borderRadius: 8 }}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full text-sm font-500 text-white bg-accent px-6 py-2 disabled:opacity-40"
            style={{ borderRadius: 8 }}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}
