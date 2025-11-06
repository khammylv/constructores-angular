import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dynamic-log',
  imports: [CommonModule, MatDialogModule,MatIconModule],
  templateUrl: './dynamic-log.component.html',
  styleUrl: './dynamic-log.component.css'
})
export class DynamicLogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
} 

