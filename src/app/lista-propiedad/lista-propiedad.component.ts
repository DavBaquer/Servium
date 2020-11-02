import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { GaleriaService } from '../galeria.service';
import { galeria } from '../model/galeria';
import { propiedad } from '../model/propiedad';
import { PropiedadesService } from '../propiedades.service';
import { TransaccionService } from '../transaccion.service';

@Component({
  selector: 'app-lista-propiedad',
  templateUrl: './lista-propiedad.component.html',
  styleUrls: ['./lista-propiedad.component.css']
})
export class ListaPropiedadComponent implements OnInit {
  propiedades:propiedad[]=[];
  pageActual:number=1;
  witdthop='100%';



  constructor(private propiedadService:PropiedadesService,
               private categoriaService:CategoriaService,
               private transaccionService:TransaccionService,
               private galeriaService:GaleriaService)
  {

  }

  ngOnInit(): void {
    this.getPropiedades();

  }


  getPropiedades():void{

    this.propiedadService.all().subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.propiedades=<propiedad[]>prueb;
        this.cargarGaleria();
        console.log(this.propiedades);

      }else{
        alert(datos['mensaje']);
      }
    });




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


}

