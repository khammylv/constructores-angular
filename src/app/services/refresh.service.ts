import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  constructor() {}
  private refreshSubject = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSubject.asObservable();

  private refreshInventarioSubject = new BehaviorSubject<void>(undefined);

  refreshInventario$ = this.refreshInventarioSubject.asObservable();

  private refreshUsuarioSubject = new BehaviorSubject<void>(undefined);

  refreshUsuario$ = this.refreshUsuarioSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }
  triggerRefreshInventario() {
    this.refreshInventarioSubject.next();
  }
   triggerRefreshUsuario() {
    this.refreshUsuarioSubject.next();
  }
}
