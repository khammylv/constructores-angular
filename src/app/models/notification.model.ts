export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: number; 
  read?: boolean;
  
}