import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';
import { businessService } from '../services/business.service';
import { authService } from '../services/auth.service';

export function useBusinessRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitRegistration = async (formData: any, idFile?: File) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Sign up the user
      const { user } = await authService.signUp(
        formData.email,
        formData.password,
        {
          username: formData.businessName?.toLowerCase().replace(/\s+/g, '_'),
          full_name: formData.fullName,
          role: 'creator' // or 'business' - you might want to add this role
        }
      );

      if (!user) throw new Error('Failed to create user account');

      // Step 2: Create business profile
      const businessProfile = await businessService.createBusinessProfile(
        user.id,
        formData
      );

      // Step 3: Upload ID document if provided
      if (idFile) {
        await businessService.uploadIdDocument(user.id, idFile);
      }

      // Step 4: Create application record
      const { error: appError } = await supabase
        .from('business_applications')
        .insert({
          business_id: businessProfile.id,
          status: 'pending'
        });

      if (appError) throw appError;

      return { success: true, businessProfile };
    } catch (err: any) {
      setError(err.message);
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