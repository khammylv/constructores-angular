import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearOrdenConstruccionDTO, EstadoOrdenResponse, OrdenConstruccion, OrdenesData, sumaryModel } from '../models/ordenConstruccion.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  constructor(private http: HttpClient) {}
  private baseurl = 'http://localhost:8080/api/ordenes';

  getOrdenes(pageIndex: number,
    pageSize: number): Observable<OrdenesData> {
    return this.http.get<OrdenesData>(`${this.baseurl}?page=${pageIndex}&size=${pageSize}`);
  }
  addOrder(order: CrearOrdenConstruccionDTO): Observable<any> {
    return this.http.post<EstadoOrdenResponse>(`${this.baseurl}`, order);
  }
 monitorearOrden(jobId: string): EventSource {
    return new EventSource(`${this.baseurl}/status/${jobId}`);
  }

  getStatusSummary(): Observable<any> {
    return this.http.get<sumaryModel>(`${this.baseurl}/estado-totales`);
  }
}
