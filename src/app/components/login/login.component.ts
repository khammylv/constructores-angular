import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { InputEmailComponent } from '../input-email/input-email.component';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ERROR_CLASS, INFO_CLASS } from '../../utils/constans';
import { LoginService } from '../../services/login.service';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputPasswordComponent, InputEmailComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private loginService: LoginService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
   
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  submitForm() {
   
    if (this.loginForm.invalid) {
      this.snackbar.show(
        'Agregue todos los campos del formulario',
        'Info',
        3000,
        INFO_CLASS
      );
      return;
    }

    this.loginService.userLogin(this.loginForm.value).pipe(
      tap((data) => {
        
        const isAutorizate = this.authService.getUserRole(data.token);
       
        //isAutorizate ? this.router.navigate(["/user"]): this.showSnackbarMessage( `Usuario no autorizado`, "error",ERROR_CLASS);
        this.router.navigate([isAutorizate ? '/user' : '/admin']);
      }),
      catchError(error => {

      
        this.showSnackbarMessage( `${error.error.error}`, "error",ERROR_CLASS);
        console.error(error);
        console.log(error.error.error)

        return of(null);
      })
    ).subscribe();
  }
//ERROR_CLASS
  showSnackbarMessage(mensaje: string, tipo : string, clase : string){
    this.snackbar.show(
          mensaje,
          tipo,
          3000,
          clase
        );
  }
}
