export interface LoginUsuario {
  username: string;
  password: string;
 
}
export interface Usuario {
  id: string;
  username: string;
  nombre:string;
  rol:string;
  status: string;
  
 
}
export interface UsuarioDto {
  
  username: string;
  nombre:string;
  rol:string;
  status: string;
  password: string;
 
}
export enum StatusUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  
}

export interface UserTokenPayload {
 
  sub: string;
  rol: string;
 
  exp: number;
  iad: string;

  
}
