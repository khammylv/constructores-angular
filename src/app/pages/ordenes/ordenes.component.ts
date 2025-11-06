import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorEstadoPipe } from '../../pipes/color-estado.pipe';
import { NameEstadoPipe } from '../../pipes/name-estado.pipe';
import { DialogService } from '../../services/dialog.service';
import { NotificationTriggerService } from '../../services/notification-trigger.service';
import { SnackbarService } from '../../services/snackbar.service';
import { OrdenesService } from '../../services/ordenes.service';
import { catchError, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import {
  CrearOrdenConstruccionDTO,
  EstadoOrdenResponse,
  OrdenConstruccion,
} from '../../models/ordenConstruccion.model';
import { FormOrdenesComponent } from '../../components/form-ordenes/form-ordenes.component';
import { SseClient } from 'ngx-sse-client';
import { EventSourceService } from '../../services/event-source.service';
import { Pagination } from '../../models/Pagination.model';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { InformationComponent } from '../../components/information/information.component';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-ordenes',
  imports: [
    CommonModule,
    NameEstadoPipe,
    ColorEstadoPipe,
    PaginatorTableComponent,
    InformationComponent,
  ],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css',
})
export class OrdenesComponent implements OnInit, OnDestroy {
  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationTriggerService,
    private ordenesService: OrdenesService,
    private snackbar: SnackbarService,
    private eventSourceService: EventSourceService,
    private refreshService: RefreshService
  ) {}

  private destroy$ = new Subject<void>();
  ordenes!: OrdenConstruccion[];
  pagination!: Pagination;

  ngOnInit(): void {
    //private ordenesService: OrdenesService
    this.pagination = {
      pageIndex: 0,
      pageSize: 5,
      length: 0,
    };
this.refreshService.refresh$
      .pipe(
       
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        
        this.getAllorder(this.pagination.pageIndex, this.pagination.pageSize);
      });
  }

  addOrden(): void {
 this.dialogService
      .openDialog(FormOrdenesComponent, 'Agregar orden de construccion', {
        action: 'add',
      })
      .afterClosed()
      .subscribe((result: CrearOrdenConstruccionDTO | undefined) => {
        if (result) {
          console.log('Datos del formulario:', result);
          this.addOrder(result);
          // this.notificationService.addNotification(
          //   'Tania',
          //   'sent you a message'
          // );
          // this.notificationService.incrementCount();
          // Aquí haces la lógica con result.tipo, result.x, result.y
        }
      });
  }
  getAllorder(pageIndex: number, pageSize: number) {
   this.ordenesService
      .getOrdenes(pageIndex, pageSize)
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          console.log(data);
          this.ordenes = data.data;
          this.pagination = {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            length: data.totalCount,
          };
        }),
        catchError((error: any) => {
          console.error('Error al obtener las ordenes:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  addOrder(order: CrearOrdenConstruccionDTO): void {
     this.ordenesService
      .addOrder(order)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: EstadoOrdenResponse) => {
          console.log('Orden creada:', data.jobId);
          this.consultarOrden(data.jobId);
        }),
        catchError((error: any) => {
          console.error('Error al agregar las ordenes:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  orderPagination(pagination: Pagination) {
    this.pagination = pagination;
    this.getAllorder(pagination.pageIndex, pagination.pageSize);
  }
  consultarOrden(jobId: string): void {
    this.eventSourceService.consultarOrden(jobId);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  this.destroy$.complete();
  }
}
