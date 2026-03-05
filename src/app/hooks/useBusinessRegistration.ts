import { useState } from 'react';
import { supabase, uploadFile } from '../lib/supabase';
import type { SocialMedia } from '../types/dashboard';

interface BusinessFormData {
  fullName: string;
  jobTitle: string;
  email: string;
  password: string;
  phoneNumber: string;
  phoneCountryCode: string;
  businessName: string;
  businessType: string;
  industry: string;
  description: string;
  website: string;
  socials: SocialMedia[];
  country: string;
  city: string;
  postcode: string;
  operatingTime: string;
  goals: string[];
  campaignType: string;
  budget: string;
  ageMin: number;
  ageMax: number;
  gender: string[];
  targetLocation: string;
  referral: string;
}

export function useBusinessRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRegistration = async (data: BusinessFormData, idFile: File) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Starting business registration for:', data.email);

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            business_name: data.businessName,
            user_type: 'business'
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

      // 2. Upload ID document
      const idUrl = await uploadFile('business-verifications', idFile, authData.user.id);

      // 3. Update business profile
      const { error: profileError } = await supabase
        .from('business_profiles')
        .update({
          job_title: data.jobTitle,
          phone_number: data.phoneNumber,
          phone_country_code: data.phoneCountryCode,
          industry: data.industry,
          description: data.description,
          website: data.website || null,
          country: data.country,
          city: data.city || null,
          postcode: data.postcode || null,
          operating_time: data.operatingTime,
          goals: data.goals,
          campaign_type: data.campaignType,
          budget: data.budget,
          age_min: data.ageMin,
          age_max: data.ageMax,
          gender_target: data.gender,
          target_location: data.targetLocation || null,
          referral_code: data.referral || null,
          id_verification_url: idUrl,
          status: 'pending'
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw new Error('Failed to update profile: ' + profileError.message);
      }

      // 4. Insert social media handles
      const validSocials = data.socials.filter(s => s.handle.trim() !== '');
      if (validSocials.length > 0) {
        const socialsToInsert = validSocials.map(social => ({
          user_id: authData.user?.id,
          platform: social.platform,
          handle: social.handle
        }));

        const { error: socialsError } = await supabase
          .from('business_socials')
          .insert(socialsToInsert);

        if (socialsError) {
          console.error('Socials insert error:', socialsError);
          // Don't throw - socials are not critical
        }
      }

      return { success: true, userId: authData.user.id };
    } catch (err: any) {
      console.error('Error submitting business registration:', err);
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
