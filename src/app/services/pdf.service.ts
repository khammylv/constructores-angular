import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}
  private baseurl = 'http://localhost:8080/api/pdf';
  private pdfSubject = new BehaviorSubject<Blob | null>(null);
  pdf$ = this.pdfSubject.asObservable();

  generarPdf(): Observable<{ jobId: string }> {
    return this.http.post<{ jobId: string }>(`${this.baseurl}/generar`, {});
  }

  revisarStatusPdf(jobId: string): EventSource {
    return new EventSource(`${this.baseurl}/stream/${jobId}`);
  }

 descargarPdf(jobId: string): Observable<Blob> {
    return this.http.get(`${this.baseurl}/descargar/${jobId}`, {
      responseType: 'blob'
    }).pipe(
      tap((blob) => this.pdfSubject.next(blob)) 
    );
  }
}
