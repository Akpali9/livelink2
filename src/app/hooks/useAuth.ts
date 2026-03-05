import { useOutletContext } from 'react-router';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '../lib/supabase';

type AuthContext = {
  user: User | null;
  profile: Tables['creator_profiles'] | Tables['business_profiles'] | null;
  userType: 'creator' | 'business' | null;
};

export function useAuth() {
  return useOutletContext<AuthContext>();
}
