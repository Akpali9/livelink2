
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function supabaseRequestWithRetry(requestFn, retries = 3) {
  let attempt = 0
  let delay = 500 // initial delay in ms

  while (attempt <= retries) {
    try {
      const result = await requestFn()
      
      // If Supabase returns an error, throw it so it can be handled
      if (result.error) throw result.error
      
      return result.data
    } catch (err) {
      const isNetworkError = err.message && err.message.includes('ERR_NETWORK_CHANGED')
      
      if (isNetworkError && attempt < retries) {
        console.warn(`Network changed, retrying request... attempt ${attempt + 1}`)
        await new Promise(res => setTimeout(res, delay))
        attempt++
        delay *= 2 // exponential backoff
        continue
      }
      // Other errors or max retries reached
      throw err
    }
  }
}
