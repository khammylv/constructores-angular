import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inventario, InventarioFaltante } from '../../models/inventario.model';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { InventarioFormComponent } from '../../components/inventario-form/inventario-form.component';
import { SnackbarService } from '../../services/snackbar.service';
import { InventarioService } from '../../services/inventario.service';
import {
  catchError,
  forkJoin,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { WARNING_CLASS } from '../../utils/constans';
import { RefreshService } from '../../services/refresh.service';
import { EventSourceService } from '../../services/event-source.service';
import { EstadoOrdenResponse } from '../../models/ordenConstruccion.model';

@Component({
  selector: 'app-inventario',
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent implements OnInit, OnDestroy {
  constructor(
    private dialogService: DialogService,
    private snackbar: SnackbarService,
    private inventarioServices: InventarioService,
    private refreshService: RefreshService,
    private eventSourceService: EventSourceService
  ) {}
  private destroy$ = new Subject<void>();
  inventarioInicial!: { [key: string]: number };
  inventarioFaltante!: { [key: string]: number };
  objectKeys = Object.keys;
  ngOnInit(): void {
    this.refreshService.refreshInventario$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllData();
      });
  }

  getAllData() {
    this.getData()
      .pipe(
        takeUntil(this.destroy$),
        tap(([materiales, faltantes]) => {
          this.inventarioInicial = materiales.materiales;
          this.inventarioFaltante = faltantes.faltantes;
        })
      )
      .subscribe();
  }

  getData(): Observable<any> {
    const materiales$ = this.inventarioServices.getInventario();
    const faltantes$ = this.inventarioServices.getInventarioFaltanteTable();

    return forkJoin([materiales$, faltantes$]);
  }

  get materiales(): string[] {
    return Object.keys(this.inventarioInicial);
  }
  seleccionados: string[] = [];
  toggleSeleccion(material: string): void {
    if (this.seleccionados.includes(material)) {
      this.seleccionados = this.seleccionados.filter((m) => m !== material);
    } else {
      this.seleccionados.push(material);
    }
  }

  sendData() {
    this.seleccionados.length > 0
      ? this.openDialog()
      : this.showSnackbarMessage(
          `Seleccionar materiales`,
          'warning',
          WARNING_CLASS
        );
  }
  openDialog() {
   
    this.dialogService
      .openDialog(InventarioFormComponent, 'Formulario de Inventario', {
        action: 'add',
        items: this.seleccionados,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
           this.deseleccionarTodos();
          console.log('Datos del formulario:', result);
          const data = result;
          const jsonString = JSON.stringify(data, null, 2);
          console.log(jsonString);
          this.addInventario(result);
        }
      });
  }
  deseleccionarTodos() {
    this.seleccionados = [];
  }

  addInventario(inventario: any) {
    this.inventarioServices
      .addInventario(inventario)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: EstadoOrdenResponse) => {
          this.consultarInventario(data.jobId);
        }),
        catchError((error: any) => {
          console.error('Error al agregar los materiales:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  consultarInventario(jobId: string): void {
    this.eventSourceService.consultarInventario(jobId);
  }
  showSnackbarMessage(mensaje: string, tipo: string, clase: string) {
    this.snackbar.show(mensaje, tipo, 3000, clase);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
