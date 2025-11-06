export interface LoginUsuario {
  username: string;
  password: string;
 
}
export interface UserTokenPayload {
 
  sub: string;
  rol: string;
 
  exp: number;
  iad: string;

  
}
