import type { TServerTask, TTask } from '../types/task';

const BASE_URL = 'https://14.ecmascript.pages.academy/task-manager/tasks';
const AUTH_TOKEN = 'Basic fjsdfuyh2c8#294yr2#^497&8ryc^74x9$ryb7yc3c4978@sad'
const headers = {
  'Content-Type': 'application/json',
  Authorization: AUTH_TOKEN,
};

function tasksAdapter(serverTasks: TServerTask[]): TTask[] {
  return serverTasks
    .filter((task, index) => {
      const lastIndex = serverTasks.findLastIndex((el) => el.description === task.description);
      return index === lastIndex;
    })
    .map((task) => ({
      id: task.id,
      text: task.description,
      isCompleted: task.is_archived,
    }));
}

export function fetchTasks(): Promise<void | TTask[]> {
  return fetch(BASE_URL, { headers })
    .then((data) => data.json())
    .then((data: TServerTask[]) => tasksAdapter(data))
    .catch((err) => console.error(err));
}
