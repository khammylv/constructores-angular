import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario, InventarioFaltante } from '../models/inventario.model';
import { EstadoOrdenResponse } from '../models/ordenConstruccion.model';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor(private http: HttpClient) {}
  private baseurl = 'http://localhost:8080/api/inventario';

  getInventario(): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseurl}`);
  }
  getInventarioFaltanteTable(): Observable<InventarioFaltante> {
    return this.http.get<InventarioFaltante>(`${this.baseurl}/faltantes`);
  }

  addInventario(inventario: any): Observable<any> {
    return this.http.put<EstadoOrdenResponse>(`${this.baseurl}/reponer`, inventario);
  }
}
