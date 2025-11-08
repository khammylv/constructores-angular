import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { UserComponent } from './pages/user/user.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [

     { path: 'home', component: HomeComponent ,
  children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]

  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [authGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'user', component: UsuariosComponent },
      { path: 'orders', component: OrdenesComponent },
      { path: 'inventario', component: InventarioComponent },
      
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
   {
    path: 'user',
    component: UserComponent, canActivate: [authGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'orders', component: OrdenesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  
  
   },

   { path: '',   redirectTo: 'home', pathMatch: 'full' },
];
