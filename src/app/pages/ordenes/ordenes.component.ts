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
import { EventSourceService } from '../../services/event-source.service';
import { Pagination } from '../../models/Pagination.model';
import { PaginatorTableComponent } from '../../components/paginator-table/paginator-table.component';
import { InformationComponent } from '../../components/information/information.component';
import { RefreshService } from '../../services/refresh.service';
import { AuthService } from '../../services/auth.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-ordenes',
  imports: [
    CommonModule,
    NameEstadoPipe,
    ColorEstadoPipe,
    PaginatorTableComponent,
    InformationComponent,
    CapitalizePipe
  ],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css',
})
export class OrdenesComponent implements OnInit, OnDestroy {
  constructor(
    private dialogService: DialogService,
    
    private ordenesService: OrdenesService,
    
    private eventSourceService: EventSourceService,
    private refreshService: RefreshService,
    private authService : AuthService
  ) {}

  private destroy$ = new Subject<void>();
  ordenes!: OrdenConstruccion[];
  pagination!: Pagination;
  isAdmin!: boolean;

  ngOnInit(): void {

    // const token = authService.getToken();
 // console.log("en interceptor =>",token)
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
  this.isAdmin = this.authService.getisAdmin();
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
