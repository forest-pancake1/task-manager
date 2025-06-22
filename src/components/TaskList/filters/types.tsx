export type Priority = 'all' | 'low' | 'medium' | 'high';
export type Status = 'all' | 'complited' | 'active'

export type Filter = {
  priority: Priority;
  status: Status;
  date?: {
    start: Date | null,
    end: Date | null
  }
  query?: string,
};
