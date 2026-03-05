import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function createDefaultAdmin() {
  const adminEmail = 'admin@livelink.com';
  const adminPassword = 'Admin@123456'; // Change this to a secure password
  const adminFullName = 'Super Admin';

  try {
    // Check if admin already exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminExists = existingUser.users.find(u => u.email === adminEmail);

    if (adminExists) {
      console.log('Admin user already exists');
      
      // Ensure admin profile exists
      const { data: existingProfile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', adminExists.id)
        .single();

      if (!existingProfile) {
        await supabase
          .from('admin_profiles')
          .insert({
            id: adminExists.id,
            email: adminEmail,
            full_name: adminFullName,
            role: 'super_admin',
            permissions: ['all'],
            is_active: true
          });
        console.log('Admin profile created');
      }
      
      return;
    }

    // Create new admin user
    const { data: newUser, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminFullName,
        user_type: 'admin'
      }
    });

    if (error) throw error;

    // Create admin profile
    await supabase
      .from('admin_profiles')
      .insert({
        id: newUser.user.id,
        email: adminEmail,
        full_name: adminFullName,
        role: 'super_admin',
        permissions: ['all'],
        is_active: true
      });

    console.log('Default admin user created successfully');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Please change the password after first login');

  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createDefaultAdmin();
