import { Pipe, PipeTransform } from '@angular/core';
import { EstadoOrden } from '../models/ordenConstruccion.model';

@Pipe({
  name: 'colorEstado'
})
export class ColorEstadoPipe implements PipeTransform {

   private static readonly NOMBRES_ESTADO: Record<EstadoOrden, string> = {
     [EstadoOrden.PENDIENTE]: 'text-amber-600/80 bg-amber-300/50',
     [EstadoOrden.EN_PROGRESO]: 'text-sky-600/80 bg-cyan-100',
     [EstadoOrden.FINALIZADO]: 'text-emerald-600/80 bg-emerald-100'
   };
 
 transform(value: EstadoOrden): string {
     return ColorEstadoPipe.NOMBRES_ESTADO[value] || 'Desconocido';
   }


}
