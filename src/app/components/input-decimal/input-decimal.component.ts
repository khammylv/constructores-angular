import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-decimal',
  imports: [CommonModule],
  templateUrl: './input-decimal.component.html',
  styleUrl: './input-decimal.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDecimalComponent),
      multi: true,
    },
  ],
})
export class InputDecimalComponent {
  @Input() placeholder!: string;

  @Input() text!: string;
  @Input() exampleValue!: string;

  private onChange = (value: any) => {};
  private onTouched = () => {};
  onCoordenadaInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Solo permitir números y punto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Evitar más de un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    input.value = value;
    const parsedValue = value ? parseFloat(value) : null;

    this.text = value;
    this.onChange(parsedValue);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  writeValue(value: any): void {
    this.text = value;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
