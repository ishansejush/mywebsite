import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://uxkunzwpamfmkbddmavu.supabase.co"
const supabaseKey = "sb_publishable_hSRnuCeMQ4I4IlPVjuw9Aw_kkWa7IAf"

export const supabase = createClient(supabaseUrl, supabaseKey)
