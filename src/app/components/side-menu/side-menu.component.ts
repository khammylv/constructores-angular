import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LinkMenuComponent } from '../link-menu/link-menu.component';
import { MenuItem } from '../../models/menuItems.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [CommonModule, MatIconModule,LinkMenuComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private router: Router){}
 iconName: string = 'home';
  @Input() items: MenuItem[] = [];
  logout(){
    this.router.navigate(["/home"])
  }

}
