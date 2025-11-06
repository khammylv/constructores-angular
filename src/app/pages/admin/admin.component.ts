import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { MenuItem } from '../../models/menuItems.model';
import { MENU_ITEMS } from '../../utils/constans';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,HeaderComponent, SideMenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
 menuItems: MenuItem[] = MENU_ITEMS;

}
