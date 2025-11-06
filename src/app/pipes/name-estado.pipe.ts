import { Pipe, PipeTransform } from '@angular/core';
import { EstadoOrden } from '../models/ordenConstruccion.model';

@Pipe({
  name: 'nameEstado'
})
export class NameEstadoPipe implements PipeTransform {

     private static readonly NOMBRES_ESTADO: Record<EstadoOrden, string> = {
    [EstadoOrden.PENDIENTE]: 'Pendiente',
    [EstadoOrden.EN_PROGRESO]: 'En progreso',
    [EstadoOrden.FINALIZADO]: 'Finalizado'
  };

transform(value: EstadoOrden): string {
    return NameEstadoPipe.NOMBRES_ESTADO[value] || 'Desconocido';
  }


}
