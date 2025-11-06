import { MenuItem } from "../models/menuItems.model";


export const MENU_ITEMS: MenuItem[] = [
  { name: 'Inicio', icon: 'home', route: '/admin/home' },
  
  { name: 'Ordenes', icon: 'handyman', route: '/admin/orders' },

];
export const SUCCES_CLASS = 'mdc-snackbar--success';
export const ERROR_CLASS = 'mdc-snackbar--error';
export const WARNING_CLASS = 'mdc-snackbar--warning';
export const INFO_CLASS = 'mdc-snackbar--info';