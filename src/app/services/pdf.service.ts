import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { decryptPdf } from '../utils/crypto.util';

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
   getEncryptedPdf(jobId: string) {
    const key = environment.KEY as string;
    const iv = environment.IV as string;
    return this.http.get<{ file: string }>(`${this.baseurl}/descargar-cripto/${jobId}`).pipe(

      tap(async response =>{
        console.log(iv)
        const decryptedBytes = await decryptPdf(response.file, key, iv);
       const blob = new Blob([decryptedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
       this.pdfSubject.next(blob)
      }) 
    );
  }

  desencriptarPdf(){
    console.log(environment);      
    console.log(environment.KEY);
  }

  
}
