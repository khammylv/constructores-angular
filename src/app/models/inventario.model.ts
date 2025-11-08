export interface Inventario {

  materiales: { [key: string]: number };
  
}

export interface InventarioFaltante {
 
  faltantes: { [key: string]: number };
  
}