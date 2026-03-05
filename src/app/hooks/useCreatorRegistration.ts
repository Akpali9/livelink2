import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type CreatorFormData = {
  fullName: string;
  dob: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  platforms: { type: string; username: string; url: string }[];
  frequency: string;
  duration: string;
  days: string[];
  timeOfDay: string;
  avgConcurrent: string;
  avgPeak: string;
  avgWeekly: string;
  categories: string[];
  audienceBio: string;
  referral: string;
};

export function useCreatorRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = async (data: CreatorFormData) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: 'creator'
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // 2. Insert creator profile
      const { error: profileError } = await supabase
        .from('creator_profiles')
        .insert({
          user_id: authData.user.id,
          full_name: data.fullName,
          date_of_birth: data.dob,
          phone_number: data.phoneNumber,
          country: data.country,
          city: data.city,
          streaming_frequency: data.frequency,
          stream_duration: data.duration,
          streaming_days: data.days,
          typical_time: data.timeOfDay,
          avg_concurrent: data.avgConcurrent ? parseInt(data.avgConcurrent) : null,
          avg_peak: data.avgPeak ? parseInt(data.avgPeak) : null,
          avg_weekly: data.avgWeekly ? parseInt(data.avgWeekly) : null,
          categories: data.categories,
          audience_bio: data.audienceBio,
          referral_code: data.referral || null,
          status: 'pending'
        });

      if (profileError) throw profileError;

      // 3. Insert platforms
      const platformsToInsert = data.platforms.map(platform => ({
        user_id: authData.user?.id,
        platform_type: platform.type,
        username: platform.username,
        profile_url: platform.url
      }));

      const { error: platformsError } = await supabase
        .from('creator_platforms')
        .insert(platformsToInsert);

      if (platformsError) throw platformsError;

      // 4. Send welcome email via edge function (optional)
      await supabase.functions.invoke('send-creator-welcome', {
        body: { 
          email: data.email, 
          name: data.fullName 
        }
      }).catch(err => console.log('Email function not available:', err));

      return { success: true };
    } catch (err: any) {
      console.error('Error submitting creator registration:', err);
      setError(err.message || 'Failed to submit registration. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitRegistration,
    loading,
    error
  };
}
