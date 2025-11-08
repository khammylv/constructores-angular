import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioDto } from '../../models/usuario.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ButtonIconComponent } from '../../components/button-icon/button-icon.component';
import { DialogService } from '../../services/dialog.service';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { SnackbarService } from '../../services/snackbar.service';
import { ERROR_CLASS, SUCCES_CLASS } from '../../utils/constans';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, CapitalizePipe, ButtonIconComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit, OnDestroy {
  constructor(
    private userServices: UserService,
    private dialogService: DialogService,
    private snackbar: SnackbarService,
    private refreshService: RefreshService,
  ) {}
  private destroy$ = new Subject<void>();
  usuarios!: Usuario[];

  ngOnInit(): void {
    
    this.refreshService.refreshUsuario$
      .pipe(
       
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        
        this.getAllUser();
      });
  }

  getAllUser() {
    this.userServices
      .getAllUser()
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.usuarios = data;
        })
      )
      .subscribe();
  }
  editUser(user: Usuario) {
    this.dialogService
      .openDialog(FormUserComponent, 'Editar usuario', {
        action: 'edit',
        us: user,
      })
      .afterClosed()
      .subscribe((result: Usuario | undefined) => {
        if (result) {
          //console.log('Datos del formulario editar:', result);
          this.editUserFn(result);
        }
      });
  }
  addUser() {
    this.dialogService
      .openDialog(FormUserComponent, 'Agregar usuario', {
        action: 'add',
      })
      .afterClosed()
      .subscribe((result: UsuarioDto | undefined) => {
        if (result) {
          //console.log('Datos del formulario agregar:', result);
          this.addUserFn(result);
        }
      });
  }
  addUserFn(user: any) {
    const filteredUser = this.cleanDto<UsuarioDto>(user, [
      'password',
      'nombre',
      'username',
      'rol',
      'status',
    ]);

    this.userServices
      .addUser(filteredUser)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: any) => {
          this.showSnackbarMessage(
            'Usuario agregado exitosamente',
            'Succes',
            SUCCES_CLASS
          );
          this.refreshService.triggerRefreshUsuario();
        }),
        catchError((error: any) => {
          this.showSnackbarMessage(
            'Error al agregar el usuario',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }

  editUserFn(user: any) {
    const filteredUser = this.cleanDto<Usuario>(user, [
      'id',
      'nombre',
      'username',
      'rol',
      'status',
    ]);

    this.userServices
      .editUser(filteredUser)
      .pipe(
        takeUntil(this.destroy$),
        tap((data: any) => {
          this.showSnackbarMessage(
            'Usuario editado exitosamente',
            'Succes',
            SUCCES_CLASS
          );
          this.refreshService.triggerRefreshUsuario();
        }),
        catchError((error: any) => {
          this.showSnackbarMessage(
            'Error al editar el usuario',
            'Error',
            ERROR_CLASS
          );
          return of(null);
        })
      )
      .subscribe();
  }
  cleanDto<T>(obj: any, dtoKeys: (keyof T)[]): T {
    return dtoKeys.reduce((clean, key) => {
      if (key in obj) clean[key] = obj[key];
      return clean;
    }, {} as T);
  }

  showSnackbarMessage(mensaje: string, tipo: string, clase: string) {
    this.snackbar.show(mensaje, tipo, 3000, clase);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
