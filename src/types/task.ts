export type RepeatingDays = {
  mo: boolean;
  tu: boolean;
  we: boolean;
  th: boolean;
  fr: boolean;
  sa: boolean;
  su: boolean;
};

export type TServerTask = {
  id: string;
  description: string;
  due_date: string;
  repeating_days: RepeatingDays;
  color: string;
  is_favorite: boolean;
  is_archived: boolean;
};

export type TTask = {
  id: string;
  text: string;
  isCompleted: boolean;
};
