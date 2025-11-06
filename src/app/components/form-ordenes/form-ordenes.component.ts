import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { InputDecimalComponent } from '../input-decimal/input-decimal.component';
import { InputSelectComponent } from '../input-select/input-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { SelectOption } from '../../models/menuItems.model';
import { INFO_CLASS } from '../../utils/constans';

@Component({
  selector: 'app-form-ordenes',
  imports: [
     CommonModule,
    ReactiveFormsModule,
    InputDecimalComponent,
    InputSelectComponent,

  ],
  templateUrl: './form-ordenes.component.html',
  styleUrl: './form-ordenes.component.css',
})
export class FormOrdenesComponent {
constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService
  ) {}

  actionForm!: FormGroup;
  opcionesConstruccion: SelectOption[] = [
    { label: 'CASA', value: 'Casa' },
    { label: 'LAGO', value: 'Lago' },
    { label: 'CANCHA DE FÚTBOL', value: 'Cancha de Fútbol' },
    { label: 'EDIFICIO', value: 'Edificio' },
    { label: 'GIMNASIO', value: 'Gimnasio' },
  ];
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.actionForm = this.formBuilder.group({
      tipo: new FormControl('', Validators.required),
      x: new FormControl('', Validators.required),
      y: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    
    if (this.actionForm.invalid) {
      this.snackbar.show(
        'Agregue todos los campos del formulario',
        'Info',
        3000,
        INFO_CLASS
      );
      return;
    }
    const ordenData = this.actionForm.value;
    this.dialogRef.close(ordenData);
  }


}
