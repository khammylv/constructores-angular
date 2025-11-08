import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuario, UserTokenPayload } from '../models/usuario.model';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient,private authService: AuthService) {}
  private baseurl = 'http://localhost:8080/api/auth';

  userLogin(user: LoginUsuario): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseurl}/login`, user).pipe(
      tap(response => {
         this.authService.setToken(response.token);
      })
    );
  }

 
}
