import { supabase } from './config';

export async function registerWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      emailRedirectTo: 'https://meriks-to-do-list.netlify.app/login.html',
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
