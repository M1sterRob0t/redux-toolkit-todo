import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import type { TServerTask, TTask } from '../types/task';
import { serverTasksAdapter, taskAdapter } from './adapters';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => ({ url: `tasks` }),
      transformResponse: (response: TServerTask[]) => serverTasksAdapter(response),
      providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Tasks', id })) : ['Tasks'],
    }),
    postTask: builder.mutation<TTask, TTask>({
      query: (newTask) => ({
        url: `tasks`,
        method: 'POST',
        body: taskAdapter(newTask),
      }),
      invalidatesTags: ['Tasks']
    }),
    deleteTask: builder.mutation<string, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    }),
    toggleTask: builder.mutation<TTask, TTask>({
      query: (updatedTask) => ({
        url: `tasks/${updatedTask.id}`,
        method: 'PATCH',
        body: taskAdapter(updatedTask),
      }),
      invalidatesTags: ['Tasks']
    }),
  }),
});

export const { useGetTasksQuery, usePostTaskMutation, useDeleteTaskMutation, useToggleTaskMutation } = tasksApi;
