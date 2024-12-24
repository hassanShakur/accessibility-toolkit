import type Report from '@/types/report';

export type SavedReport = {
  status: string;
  url: string;
  data: Report;
  timeStamp: string;
};
