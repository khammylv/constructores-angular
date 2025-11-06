import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent ,
  children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]

  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'orders', component: OrdenesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
   { path: '',   redirectTo: 'home', pathMatch: 'full' },

];
