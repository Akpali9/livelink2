import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Platform } from '../types/dashboard';

interface CreatorFormData {
  fullName: string;
  dob: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  platforms: Platform[];
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
}

export function useCreatorRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = async (data: CreatorFormData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Starting creator registration for:', data.email);

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: 'creator',
            phone: data.phoneNumber,
            country: data.country,
            city: data.city
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('No user returned from signup');
      }

      console.log('User created successfully:', authData.user.id);

      // 2. Update the creator profile with additional data
      const { error: profileError } = await supabase
        .from('creator_profiles')
        .update({
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
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw new Error('Failed to update profile: ' + profileError.message);
      }

      // 3. Insert platforms
      if (data.platforms && data.platforms.length > 0) {
        const validPlatforms = data.platforms.filter(p => p.username && p.url);
        
        if (validPlatforms.length > 0) {
          const platformsToInsert = validPlatforms.map(platform => ({
            user_id: authData.user?.id,
            platform_type: platform.platform_type,
            username: platform.username,
            profile_url: platform.url
          }));

          const { error: platformsError } = await supabase
            .from('creator_platforms')
            .insert(platformsToInsert);

          if (platformsError) {
            console.error('Platforms insert error:', platformsError);
            // Don't throw - platforms are not critical
          }
        }
      }

      return { success: true, userId: authData.user.id };
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
