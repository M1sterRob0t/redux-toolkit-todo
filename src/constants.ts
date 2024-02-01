import { Bounce } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};


export enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
};
