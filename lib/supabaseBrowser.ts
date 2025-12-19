import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jsvmkednkvawsfewpzdx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzdm1rZWRua3Zhd3NmZXdwemR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTQ1NjQsImV4cCI6MjA4MTUzMDU2NH0.l0FbfBdNeZzrrc40naiZQQG1DppDnKc5iAtkGw-19vg'

if (!supabaseUrl || !supabaseAnonKey) {
  // Keep this as a runtime error so the UI fails fast in dev.
  throw new Error(
    '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)

