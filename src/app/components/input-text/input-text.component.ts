import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [CommonModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent {
  @Input() placeholder!: string;

  @Input() text!: string;

  private onChange = (value: any) => {};
  private onTouched = () => {};
  onTextInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.onChange(value);
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
