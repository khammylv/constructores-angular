export interface OrdenConstruccion {
  id: string;
  tipo: TipoConstruccion;
  coordenada: Coordenada;
  fechaSolicitud: string;
  fechaInicioProgramada?: string;
  fechaFinProgramada?: string;
  estado: EstadoOrden;
}

export interface TipoConstruccion {
  id: string;
  nombre: string;

  requerimientos: Requerimientos;
  duracionDias: number;
}

export interface Requerimientos {
  [material: string]: number;
}
export enum EstadoOrden {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  FINALIZADO = 'FINALIZADO',
}
export interface Coordenada {
  x: number;
  y: number;
}

export interface CrearOrdenConstruccionDTO {
  tipo: string;
  x: number;
  y: number;
}

export interface EstadoOrdenResponse {
  jobId: string;
  status: string;
  message: string;
}
export interface sumaryModel {
  estado: string;
  total: number;
  
}

export interface OrdenesData{
    pageIndex : number;
    pageSize : number;
    totalCount: number;
    totalPages: number;
    data: OrdenConstruccion[];
}
