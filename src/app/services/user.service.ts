import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioDto } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) {}

  addUser(user: UsuarioDto): Observable<any> {
 
    return this.http.post<any>(`${this.baseurl}`, user);
  }
  editUser(user: Usuario): Observable<any> {
    return this.http.put<any>(`${this.baseurl}`, user);
  }
  getAllUser(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseurl}`);
  }
}
