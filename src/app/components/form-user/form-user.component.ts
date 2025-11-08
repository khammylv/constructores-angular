import { Component, Inject, OnInit } from '@angular/core';
import { SelectOption } from '../../models/menuItems.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StatusUsuario, Usuario } from '../../models/usuario.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { InputSelectComponent } from '../input-select/input-select.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { InputEmailComponent } from '../input-email/input-email.component';
import { WARNING_CLASS } from '../../utils/constans';

@Component({
  selector: 'app-form-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputSelectComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputEmailComponent,
    CapitalizePipe,
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent implements OnInit {
  user!: Usuario;

  actionForm!: FormGroup;
  isEditMode!: boolean;
  isLoading = false;

  opcionesRole: SelectOption[] = [
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Arquitecto', value: 'ARQUITECTO' },
  ];
  opcionesStatus: SelectOption[] = [
    { label: 'Activo', value: StatusUsuario.ACTIVO },
    { label: 'Inactivo', value: StatusUsuario.INACTIVO },
  ];

  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService
  ) {}
  actionInit: Record<string, () => void> = {
    edit: () => this.buildEdit(),
    add: () => this.buildAdd(),
  };
  ngOnInit(): void {
     console.log("afuera ",this.isEditMode);
      this.isEditMode = this.data?.action === 'edit';
       if (this.data?.us) {
      this.user = this.data?.us;
    }
     if(this.isEditMode != undefined){
       console.log("adentro ",this.isEditMode);
       this.actionInit[this.data?.action]?.();
     }
   
   

   
    
  }

  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      id: new FormControl(
        this.user?.id || '',
        this.isEditMode ? [Validators.required] : []
      ),
      nombre: new FormControl(this.user?.nombre || '', Validators.required),
      username: new FormControl(this.user?.username || '', [
        Validators.required,
        Validators.email,
      ]),
      rol: new FormControl(this.user?.rol || '', [Validators.required]),
      password: new FormControl(
        '',
        this.isEditMode ? [] : [Validators.required]
      ),
      status: new FormControl(this.user?.status || '', [Validators.required]),
    });

    this.actionForm.get('password')?.updateValueAndValidity();
    this.actionForm.get('id')?.updateValueAndValidity();
    
  }

  buildAdd() {
    this.buildForm();
    this.isLoading = true;
  }

  buildEdit() {
    if (this.data?.us) {
      this.buildForm();
      this.isLoading = true;
    }
  }
  submitForm() {
    
    if (this.actionForm.invalid) {
      this.snackbar.show(
        'Agregue todos los campos del formulario',
        'Info',
        3000,
        WARNING_CLASS
      );
      return;
    }
  
   const userData = this.actionForm.value;
    this.dialogRef.close(userData);
  
  }
}
