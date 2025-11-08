import { Component } from '@angular/core';
import { MenuItem } from '../../models/menuItems.model';
import { MENU_ITEMS } from '../../utils/constans';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-user',
  imports: [RouterModule,HeaderComponent, SideMenuComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
 menuItems: MenuItem[] = MENU_ITEMS;
  isAdmin: boolean = false;
}
