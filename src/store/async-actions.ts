import { createAsyncThunk } from '@reduxjs/toolkit';
import { serverTaskAdapter, serverTasksAdapter, taskAdapter } from './adapters';
import type { TServerTask, TTask } from '../types/task';

const BASE_URL = 'http://localhost:3001/tasks';
const headers = {
  'Content-Type': 'application/json',
};


export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async function (): Promise<TTask[]> {
    const response = await fetch(BASE_URL, { headers });
    const serverTasks: TServerTask[] = await response.json();
    const tasks = serverTasksAdapter(serverTasks);
    return tasks;
  }
);

export const postTask = createAsyncThunk(
  'tasks/postTask',
  async function (newTask: TTask): Promise<TTask> {
    const response = await fetch(BASE_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify(taskAdapter(newTask)),
    });

    const serverTask: TServerTask = await response.json();
    const task = serverTaskAdapter(serverTask);
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async function (id: string, {rejectWithValue}) {
    const response = await fetch(BASE_URL + '/' + id, {
      headers,
      method: 'DELETE',
    });

    if (!response.ok) {
      return rejectWithValue(response);
    } else {
      return id;
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async function (updatedTask: TTask, {rejectWithValue}) {
    const response = await fetch(BASE_URL + '/' + updatedTask.id, {
      headers,
      method: 'PUT',
      body: JSON.stringify(taskAdapter(updatedTask)),
    });

    if (!response.ok) {
      return rejectWithValue(response);
    } else {
      return updatedTask.id;
    }
  }
);

