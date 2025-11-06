import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuario, UserTokenPayload } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private baseurl = 'http://localhost:8080/api/auth';

  userLogin(user: LoginUsuario): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseurl}/login`, user);
  }

  getUserRole(token: string):boolean {
   
    const decoded = jwtDecode<UserTokenPayload>(token);
  
    //console.log(`[${decoded.rol}]`);
   return decoded.rol.trim().toUpperCase() === "ARQUITECTO";
  }
}
