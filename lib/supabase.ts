import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User authentication helpers
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

// Database helpers
export async function fetchWatchlist(userId: string) {
  const { data, error } = await supabase.from("watchlists").select("*").eq("user_id", userId)

  return { data, error }
}

export async function addToWatchlist(userId: string, symbol: string, name: string) {
  const { data, error } = await supabase.from("watchlists").insert([{ user_id: userId, symbol, name }])

  return { data, error }
}

export async function removeFromWatchlist(userId: string, symbol: string) {
  const { data, error } = await supabase.from("watchlists").delete().eq("user_id", userId).eq("symbol", symbol)

  return { data, error }
}

export async function fetchStrategies(userId: string) {
  const { data, error } = await supabase.from("strategies").select("*").eq("user_id", userId)

  return { data, error }
}

export async function saveStrategy(userId: string, strategy: any) {
  const { data, error } = await supabase.from("strategies").insert([{ user_id: userId, ...strategy }])

  return { data, error }
}

export async function updateStrategy(strategyId: string, strategy: any) {
  const { data, error } = await supabase.from("strategies").update(strategy).eq("id", strategyId)

  return { data, error }
}

export async function deleteStrategy(strategyId: string) {
  const { data, error } = await supabase.from("strategies").delete().eq("id", strategyId)

  return { data, error }
}

