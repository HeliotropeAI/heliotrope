export interface MessageStatus {
  status: string;
  timestamp: number;
  id: string;
}

export interface LogEntry {
  content: string;
  timestamp: number;
  level: 'info' | 'warn' | 'error';
  id: string;
}

export const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
} as const; 