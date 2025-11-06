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
      multi: true
    }
  ]

})
export class InputDecimalComponent {
 @Input()  placeholder!: string;  
  
  @Input() text!: string;

   private onChange = (value: any) => {};
  private onTouched = () => {};
  onCoordenadaInput(event: Event){
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
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
