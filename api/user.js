import { supabase } from './config';

export async function registerWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      emailRedirectTo: 'https://merik-to-do-list.netlify.app/auth/registration.html',
    },
  });
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw Error(error?.message || 'Что-то случилось при выходе');
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
