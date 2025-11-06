import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDashboard'
})
export class ColorDashboardPipe implements PipeTransform {
  private static readonly NOMBRES_ESTADO: Record<string, string> = {
     ["FINALIZADO"]: 'bg-gradient-to-tr from-green-500 to-green-500 shadow-green-400',
     ["EN_PROGRESO"]: 'bg-gradient-to-tr from-cyan-500 to-cyan-400 shadow-cyan-400',
     ["PENDIENTE"]: 'bg-gradient-to-tr from-yellow-500 to-yellow-400 shadow-yellow-400'
   };
 
 transform(value: string): string {
     return ColorDashboardPipe.NOMBRES_ESTADO[value] || 'Desconocido';
   }

}
