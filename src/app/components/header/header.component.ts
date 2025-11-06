import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationTriggerService } from '../../services/notification-trigger.service';
import { AppNotification } from '../../models/notification.model';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonIconComponent, MatBadgeModule,InformationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit, OnDestroy {
  constructor(private notificationService: NotificationTriggerService) {}

  numeroNotificaciones!: number;
  isNotificationActive: boolean = false;
  isActive = false;
  notifications: AppNotification[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
 
combineLatest([
      this.notificationService.bell$,
      this.notificationService.count$,
      this.notificationService.notifications$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([active, count, list]) => {
      this.isActive = active;
      this.numeroNotificaciones = count;
      this.notifications = list;
    });
  }

  verNotificacion() {
    this.isNotificationActive = !this.isNotificationActive;
  }
  remove(id: string) {
    this.notificationService.removeNotification(id);
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  getTimeAgo(timestamp: number) {
    return this.notificationService.getTimeAgo(timestamp);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
