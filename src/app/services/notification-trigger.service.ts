import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationTriggerService {
  private bellSubject = new BehaviorSubject<boolean>(false);
  bell$ = this.bellSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  addNotification(title: string, message: string, type: string) {
    const newNotification: AppNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      type,
      timestamp: Date.now(),
      read: false,

    };
     const current = this.notificationsSubject.value;
    const updated = [newNotification, ...current];
    this.notificationsSubject.next(updated);
    this.updateCount();
  }
  activateBell() {
    this.bellSubject.next(true);
  }

  deactivateBell() {
    this.bellSubject.next(false);
  }

  incrementCount() {
    const current = this.countSubject.value;
    this.countSubject.next(current + 1);
    this.activateBell();
  }

  removeNotification(id: string) {
    const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(filtered);
    this.updateCount();
  }

  clearAll() {
    this.notificationsSubject.next([]);
    this.updateCount();
  }
  markAsRead(id: string) {
     const updated = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(updated);
    console.log('Marked as read:', updated);
    this.updateCount();
  }
  private updateCount() {
    const unread = this.notificationsSubject.value.filter(
      (n) => !n.read
    ).length;
    this.countSubject.next(unread);
    this.bellSubject.next(unread > 0);
    console.log('Notification count updated:', unread);
  }
  getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}
