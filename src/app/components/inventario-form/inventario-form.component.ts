import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputDecimalComponent } from '../input-decimal/input-decimal.component';
import { SnackbarService } from '../../services/snackbar.service';
import { INFO_CLASS, WARNING_CLASS } from '../../utils/constans';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inventario-form',
  imports: [CommonModule, ReactiveFormsModule, InputDecimalComponent],
  templateUrl: './inventario-form.component.html',
  styleUrl: './inventario-form.component.css',
})
export class InventarioFormComponent {
  constructor(
    @Inject('dialogData') public data: any,
    private dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService
  ) {}
  formulario!: FormGroup;

  ngOnInit(): void {
    console.log(this.data.items);
    this.buildForm();
  }
  buildForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.data.items.forEach((mat: string | number) => {
      group[mat] = new FormControl('', Validators.required);
    });

    this.formulario = this.formBuilder.group(group);
  }

  submitForm() {
    if (this.formulario.invalid) {
      this.snackbar.show(
        'Agregue todos los campos del formulario',
        'Warning',
        3000,
        WARNING_CLASS
      );
      return;
    }

    const inventarioOrden = this.formulario.value;
    this.dialogRef.close(inventarioOrden);
  }
}
