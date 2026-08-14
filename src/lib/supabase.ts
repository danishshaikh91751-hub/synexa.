import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface UserLearningProfile {
  id?: string;
  user_email?: string;
  selected_language: string;
  selected_subject: string;
  streak: number;
  xp: number;
  level: number;
  questions_solved: number;
  accuracy_rate: number;
  learning_history?: any[];
  updated_at?: string;
}

export async function saveUserProfileToSupabase(profile: UserLearningProfile) {
  if (!supabase || !isSupabaseConfigured) {
    localStorage.setItem('synexa_user_profile', JSON.stringify(profile));
    return { success: true, storage: 'localStorage' };
  }

  try {
    const { data, error } = await supabase
      .from('user_learning_profiles')
      .upsert(
        {
          selected_language: profile.selected_language,
          selected_subject: profile.selected_subject,
          streak: profile.streak,
          xp: profile.xp,
          level: profile.level,
          questions_solved: profile.questions_solved,
          accuracy_rate: profile.accuracy_rate,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_email' }
      );

    if (error) {
      console.warn('Supabase save warning, saving locally:', error.message);
      localStorage.setItem('synexa_user_profile', JSON.stringify(profile));
      return { success: true, storage: 'localStorage' };
    }

    return { success: true, storage: 'supabase', data };
  } catch (err) {
    console.warn('Supabase exception, falling back to localStorage:', err);
    localStorage.setItem('synexa_user_profile', JSON.stringify(profile));
    return { success: true, storage: 'localStorage' };
  }
}

export async function loadUserProfileFromSupabase(email?: string): Promise<UserLearningProfile | null> {
  if (!supabase || !isSupabaseConfigured) {
    const local = localStorage.getItem('synexa_user_profile');
    return local ? JSON.parse(local) : null;
  }

  try {
    const { data, error } = await supabase
      .from('user_learning_profiles')
      .select('*')
      .eq('user_email', email || 'demo_student@synexa.ai')
      .single();

    if (error || !data) {
      const local = localStorage.getItem('synexa_user_profile');
      return local ? JSON.parse(local) : null;
    }

    return {
      selected_language: data.selected_language,
      selected_subject: data.selected_subject,
      streak: data.streak,
      xp: data.xp,
      level: data.level,
      questions_solved: data.questions_solved,
      accuracy_rate: data.accuracy_rate,
    };
  } catch (err) {
    const local = localStorage.getItem('synexa_user_profile');
    return local ? JSON.parse(local) : null;
  }
}
