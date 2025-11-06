import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../models/menuItems.model';

@Component({
  selector: 'app-input-select',
  imports: [CommonModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.css',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ]
})
export class InputSelectComponent {
 @Input() options: SelectOption[] = [];
  selectedValue: string = '';
  @Input() placeholder!: string;
  @Input() labelName!: string;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.onChange(this.selectedValue);
    this.onTouched();
    
  }

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

}
