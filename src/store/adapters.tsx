import type { TServerTask, TTask } from '../types/task';

export function serverTaskAdapter(serverTask: TServerTask): TTask {
  return {
    id: serverTask.id,
    text: serverTask.description,
    isCompleted: serverTask.is_completed,
  };
}

export function serverTasksAdapter(serverTasks: TServerTask[]): TTask[] {
  return serverTasks
    .map((task) => ({
      id: task.id,
      text: task.description,
      isCompleted: task.is_completed,
    }));
}

export function taskAdapter(task: TTask): TServerTask {
  return {
    id: task.id,
    description: task.text,
    is_completed: task.isCompleted,
  };
}
