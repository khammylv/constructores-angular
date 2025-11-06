import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { NotificationTriggerService } from './notification-trigger.service';
import { SseClient } from 'ngx-sse-client';
import { PdfService } from './pdf.service';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {
  constructor(
    private notificationService: NotificationTriggerService,
    private sseClient: SseClient,
     private pdfServices: PdfService,
       private refreshService: RefreshService
  ) {}
  baseUrl = 'http://localhost:8080/api';
  acciones: Record<string, (data: any) => void> = {
    PENDIENTE: (data) => {
      console.log('Progreso:', data);
    },
    COMPLETADO: (data) => {
      this.notificationService.addNotification(
        'Orden completada',
        `Orden ID: ${data.ordenId}`,
        'COMPLETADO'
      );
      this.refreshService.triggerRefresh();
    },
    ERROR: (data) => {
      const mensaje = data.mensaje.includes(':')
        ? data.mensaje.split(':')[1].trim()
        : data.mensaje;

      this.notificationService.addNotification(
        `${data.status}`,
        mensaje,
        'ERROR'
      );
    },
  };

  consultarOrden(jobId: string): void {
    this.sseClient
      .stream(`${this.baseUrl}/ordenes/status/${jobId}`, {
        keepAlive: false,
        responseType: 'event',
      })
      .subscribe({
        next: (event: any) => {
          const data = JSON.parse(event.data);
          this.acciones[data.status]?.(data);
         
        },
        error: (err) => console.error('SSE error:', err),
        complete: () => console.log('SSE stream completed'),
      });
  }

  consultarPdf(jobId: string): void {
    this.sseClient
      .stream(`${this.baseUrl}/pdf/stream/${jobId}`, {
        keepAlive: false,
        responseType: 'event',
      })
      .subscribe({
        next: (event: any) => {
          const data = JSON.parse(event.data);
          console.log(data);
           if (data.status === 'COMPLETADO') {
            this.notificationService.addNotification(
              'Reporte creado',
              `Su reporte ha sido creado exitosamente.`,
              'COMPLETADO'
            );
            this.pdfServices.descargarPdf(jobId).subscribe();
          } else if (data.status === 'ERROR') {
            this.notificationService.addNotification(
              ` ${data.status}`,
              data.mensaje,
              'ERROR'
            );
          }
        },
        error: (err) => console.error('SSE error:', err),
        complete: () => console.log('SSE stream completed'),
      });
  }
}
