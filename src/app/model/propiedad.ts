import { DecimalPipe } from '@angular/common';
import { adicional } from './adicional';
import { caracteristica } from './caracteristica';
import { categoria } from './categoria';
import { galeria } from './galeria';
import { multimedia } from './multimedia';
import { transaccion } from './transaccion';
import { ubicacion } from './ubicacion';

export class propiedad{
 pro_id?:number=null;
 pro_titulo:string=null;
 pro_descripcion:string=null;
 pro_precio:string=null;
 pro_alicuota:string=null;
 categoria:categoria=null;
 transaccion:transaccion=null;
 caracteristica:caracteristica=null;
 ubicacion:ubicacion=null;
 fotos:galeria[]=null;
 multimedia:multimedia=null;
 adicionales:adicional[]=null;
 }
