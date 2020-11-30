import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUbicacion'
})
export class FilterUbicacionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resulPropiedad=[];
    for (const propiedad of value){

      if((propiedad.pro_titulo.toLowerCase().indexOf(arg.toLowerCase())>-1 )|| (propiedad.ubicacion.ubi_ciudad.toLowerCase().indexOf(arg.toLowerCase())>-1)){
        resulPropiedad.push(propiedad);
      }


    };

    return resulPropiedad;
  }

  }


