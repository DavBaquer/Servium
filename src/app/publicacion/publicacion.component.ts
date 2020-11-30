import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { GaleriaService } from '../galeria.service';
import { categoria } from '../model/categoria';
import { galeria } from '../model/galeria';
import { propiedad } from '../model/propiedad';
import { transaccion } from '../model/transaccion';
import { ubicacion } from '../model/ubicacion';
import { PropiedadesService } from '../propiedades.service';
import { TransaccionService } from '../transaccion.service';
import { UbicacionService } from '../ubicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  propiedades:propiedad[]=[];
  pageActual:number=1;
  witdthop='100%';
  transacciones:transaccion[];
  categorias:categoria[];
  categoria:categoria=new categoria();
  ciudades:string[];
  cuidad='';


   filterSearch='';
   filterTransaccion='';
   filterCategoria='';

  constructor(private propiedadService:PropiedadesService,
               private galeriaService:GaleriaService,
               private transaccionService:TransaccionService,
               private categoriaService:CategoriaService,
               private ubicacionService:UbicacionService)
  {


  }

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllTransaccion();
    this.getPropiedades();
    this.getciudades()

  }


  getPropiedades():void{

    this.propiedadService.all().subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.propiedades=<propiedad[]>prueb;
        this.cargarGaleria();
        this.cargarCategoria();
        this.cargartransaccion();
        this.cargarUbicacion();
        console.log(this.propiedades);

      }else{
        alert(datos['mensaje']);
      }
    });




   }


getAllTransaccion():void{
  this.transaccionService.all().subscribe((transacciones:transaccion[])=>this.transacciones=transacciones);

}

getAllCategorias():void{
this.categoriaService.all().subscribe((categorias:categoria[])=>this.categorias=categorias);

}

   cargarGaleria(){

    this.propiedades.forEach(element => {
      this.galeriaService.findbypro(element.pro_id).subscribe(datos=>{
        if(datos['resultado']=='OK'){
         var prueb=JSON.parse(datos['resp']);
           console.log(prueb);
          var gal:galeria[]= <galeria[]> prueb;
          element.fotos=gal;
        }

    });
    });
  }
  cargarUbicacion(){

    this.propiedades.forEach(element => {
      this.ubicacionService.findbypro(element.pro_id).subscribe(datos=>{
        if(datos['resultado']=='OK'){
         var prueb=JSON.parse(datos['resp']);
         element.ubicacion= new ubicacion();

         element.ubicacion=<ubicacion> prueb[0];
        }
      });
    });

  }



cargartransaccion(){
this.propiedades.forEach(element => {
  this.transaccionService.find(element['tra_id']).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
   console.log(prueb[0]['tra_nombre']);
     element.transaccion= new transaccion();
     element.transaccion=<transaccion> prueb[0];

    }else{
      alert(datos['mensaje']);
    }
  });
});

}

cargarCategoria(){
this.propiedades.forEach(element => {
  this.categoriaService.find(element['cat_id']).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
     element.categoria= new categoria();
     element.categoria=<categoria> prueb[0];

    }else{
      alert(datos['mensaje']);
    }
  });
});

}

getciudades(){

  this.ubicacionService.getciudades().subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
      this.ciudades=<string[]>prueb;
    }else{
      alert(datos['mensaje']);
    }
  });



}


}
