import { supabase } from './config';
import { statuses } from '../utils/constants';

export async function getActiveTasks() {
  let { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', statuses.active);

  if (error) {
    throw Error(error?.message || 'Что-то случилось при получении текущих задач');
  }

  return data;
}

export async function getArchiveTasks() {
  let { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', statuses.archive);

  if (error) {
    throw Error(error?.message || 'Что-то случилось при получении архивных задач');
  }

  return data;
}

export async function getTask(taskId) {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('id', taskId)
    .single();

  if (error) {
    throw Error(error?.message || 'Что-то случилось при получении задачи');
  }

  return data;
}

export async function createTask(taskData) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(taskData)
    .select()
    .single();

  if (error) {
    throw Error(error?.message || 'Что-то случилось при создании задачи');
  }

  return data;
}

export async function updateTask(taskData) {
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', taskData.id)
    .select()
    .single();

  if (error) {
    throw Error(error?.message || 'Что-то случилось при обновлении задачи');
  }

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    throw Error(error?.message || 'Что-то случилось при удалении задачи');
  }
}
