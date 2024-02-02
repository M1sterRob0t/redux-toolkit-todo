import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastConfig } from '../constants';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {

  if (isRejectedWithValue(action)) {
    console.error('We got a rejected action!');
    const message =
      'data' in action.error
        ? (action.error.data as { message: string }).message
        : action.error.message;

    toast.error(message, toastConfig);
  }

  return next(action);
};
