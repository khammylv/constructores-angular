import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../models/menuItems.model';

@Component({
  selector: 'app-link-menu',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './link-menu.component.html',
  styleUrl: './link-menu.component.css'
})
export class LinkMenuComponent {
@Input() items: MenuItem[] = [];
}
