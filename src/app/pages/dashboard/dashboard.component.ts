import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { sumaryModel } from '../../models/ordenConstruccion.model';
import { CommonModule } from '@angular/common';
import { ColorDashboardPipe } from '../../pipes/color-dashboard.pipe';
import { EventSourceService } from '../../services/event-source.service';
import { PdfService } from '../../services/pdf.service';
import { DialogService } from '../../services/dialog.service';
import { ReporteDetailsComponent } from '../../components/reporte-details/reporte-details.component';
import { catchError, of, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ColorDashboardPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private ordenesService: OrdenesService,
    private eventSourceService: EventSourceService,
    private pdfServices: PdfService,
    private dialogService: DialogService
  ) {}
  data: sumaryModel[] = [];
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.ordenesService
      .getStatusSummary()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.data = data;
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  generateInforme() {
   this.pdfServices
      .generarPdf()
      .pipe(
        takeUntil(this.destroy$),
        tap((response) => {
          const jobId = response.jobId;
          this.eventSourceService.consultarPdf(jobId);
        }),
        catchError((error: any) => {
          console.error('Error:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  verInforme() {
   this.dialogService
      .openDialog(
        ReporteDetailsComponent,
        'Reporte',
        {
          action: 'view',
        },
        '70vw'
      )
      .afterClosed()
      .subscribe();
  }
  ngOnDestroy(): void {
   this.destroy$.next();
  this.destroy$.complete();
  }
}
