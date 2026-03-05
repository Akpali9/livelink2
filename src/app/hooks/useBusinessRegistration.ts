import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type BusinessFormData = {
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
  socials: { platform: string; handle: string }[];
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
  agreeToTerms: boolean;
};

export function useBusinessRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadIDDocument = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/business-id-${Date.now()}.${fileExt}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('business-verifications')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('business-verifications')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const submitRegistration = async (data: BusinessFormData, idFile: File) => {
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
            user_type: 'business',
            job_title: data.jobTitle
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // 2. Upload ID document
      const idUrl = await uploadIDDocument(idFile, authData.user.id);

      // 3. Insert business profile
      const { error: profileError } = await supabase
        .from('business_profiles')
        .insert({
          user_id: authData.user.id,
          full_name: data.fullName,
          job_title: data.jobTitle,
          phone_number: data.phoneNumber,
          phone_country_code: data.phoneCountryCode,
          business_name: data.businessName,
          business_type: data.businessType,
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
        });

      if (profileError) throw profileError;

      // 4. Insert social media handles if any
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

        if (socialsError) throw socialsError;
      }

      // 5. Send notification email via edge function
      await supabase.functions.invoke('send-business-welcome', {
        body: { 
          email: data.email, 
          name: data.fullName,
          businessName: data.businessName 
        }
      });

      return { success: true };
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
