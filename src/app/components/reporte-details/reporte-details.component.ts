import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import { InformationComponent } from '../information/information.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte-details',
  imports: [CommonModule, InformationComponent],
  templateUrl: './reporte-details.component.html',
  styleUrl: './reporte-details.component.css',
})
export class ReporteDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private pdfServices: PdfService,
    private sanitizer: DomSanitizer
  ) {}
  pdfUrl?: string;
  ngOnInit(): void {
    this.verReporte();
  }

  verReporte() {
    this.pdfServices.pdf$.subscribe((blob) => {
      if (blob) {
        console.log(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(blob)
        ) as string;
      }
    });
  }
  descargar() {
    this.pdfServices.pdf$.subscribe((blob) => {
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }
  ngOnDestroy(): void {}
}
