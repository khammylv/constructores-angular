import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserTokenPayload } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  private _isAdmin = false;

  constructor() {
    const savedToken = localStorage.getItem(this.tokenKey);
    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
  setIsAdmin(admin: boolean) {
    this._isAdmin = admin;
  }
 public getisAdmin(): boolean {
    return this._isAdmin;
  }
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }
  getUserRole(token: string): boolean {
    const decoded = jwtDecode<UserTokenPayload>(token);
    const isAdmin = decoded.rol.trim().toUpperCase() === 'ARQUITECTO';
    this.isAdminSubject.next(isAdmin);
    this.setIsAdmin(isAdmin);
    //console.log(`[${decoded.rol}]`);
    return isAdmin;
  }
}
