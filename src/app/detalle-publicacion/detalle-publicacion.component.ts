import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdicionalService } from '../adicional.service';
import { CaracteristicaService } from '../caracteristica.service';
import { CategoriaService } from '../categoria.service';
import { GaleriaService } from '../galeria.service';
import { adicional } from '../model/adicional';
import { caracteristica } from '../model/caracteristica';
import { categoria } from '../model/categoria';
import { galeria } from '../model/galeria';
import { multimedia } from '../model/multimedia';
import { propiedad } from '../model/propiedad';
import { transaccion } from '../model/transaccion';
import { ubicacion } from '../model/ubicacion';
import { MultimediaService } from '../multimedia.service';
import { PropiedadesService } from '../propiedades.service';
import { TransaccionService } from '../transaccion.service';
import { UbicacionService } from '../ubicacion.service';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit {

  propiedad:propiedad=new propiedad();
    indexfoto:number;


  constructor(private rout:ActivatedRoute,private propiedadService:PropiedadesService,private categoriaService:CategoriaService,
    private transaccionService:TransaccionService,
    private location:Location,
    private galeriaService:GaleriaService,
    private caracteristicaService:CaracteristicaService,
    private ubicacionService:UbicacionService,
    private adicionalService:AdicionalService,
    public modal:NgbModal,
    private multimediaService:MultimediaService) {

  }



  ngOnInit(): void {
    this.getPropiedad();
    this.indexfoto=0;
  }

  getPropiedad():void{
    const id=this.rout.snapshot.paramMap.get('id');
    console.log(parseInt(id));
    this.propiedadService.findbyid(parseInt(id)).subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.propiedad=<propiedad>prueb[0];


        this.cargarGaleria();
        this.cargarCaracteriticas();
        this.cargartransaccion(this.propiedad['tra_id']);
        this.cargarCategoria(this.propiedad['cat_id'])
        this.cargarUbicacion();
        this.cargarAdicional();
        this.cargarMultimedia();

        console.log(this.propiedad);

      }else{
        alert(datos['mensaje']);
      }
    });




   }

   cargarGaleria(){
      this.galeriaService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
        if(datos['resultado']=='OK'){
         var prueb=JSON.parse(datos['resp']);

          var gal:galeria[]= <galeria[]> prueb;

             this.propiedad.fotos=gal;


        }
    });
  }

goBack(){
  this.location.back();
}


selectImagen(selecionado:galeria){

  var imagen=document.getElementById('imagen');
  imagen.setAttribute("src",""+selecionado.gal_imagen);

  this.indexfoto=this.propiedad.fotos.indexOf(selecionado);
  console.log("entro aqui"+this.indexfoto+this.propiedad.fotos.length);

}

cargarCaracteriticas(){

  this.caracteristicaService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
       console.log(prueb);
      this.propiedad.caracteristica= <caracteristica> prueb[0];

    }

});


}

cargartransaccion(id:number){

  this.transaccionService.find(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
   console.log(prueb[0]['tra_nombre']);
     this.propiedad.transaccion=<transaccion> prueb[0];

    }else{
      alert(datos['mensaje']);
    }
  });
}

cargarCategoria(id:number){

  this.categoriaService.find(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
     this.propiedad.categoria=<categoria> prueb[0];

    }else{
      alert(datos['mensaje']);
    }
  });
}
cargarUbicacion(){
  this.ubicacionService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
     this.propiedad.ubicacion=<ubicacion> prueb[0];
     if(this.propiedad.ubicacion.ubi_url!="" && this.propiedad.ubicacion.ubi_url!=null){
     let mapa=document.getElementById("mapa");
     console.log("rulubi"+this.propiedad.ubicacion.ubi_url);
     mapa.innerHTML=" <iframe src='"+this.propiedad.ubicacion.ubi_url+"' width='100%' height='500' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false'  tabindex='0'></iframe>";
    }

    }
  });
}

cargarAdicional(){
  this.adicionalService.findbycarac(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
       console.log(prueb);
      var adicional:adicional[]= <adicional[]> prueb;
      this.propiedad.adicionales=adicional;

    }
});
}

cargarMultimedia(){
  this.multimediaService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
     console.log(prueb);
     this.propiedad.multimedia=<multimedia>prueb[0];


     let video=document.getElementById("video");
     video.innerHTML="<iframe width='100%' height='300px' src='"+this.propiedad.multimedia.mul_video+"'allowfullscreen></iframe>"


    }
  });
}




avanzaFotos(num:number){
  this.indexfoto=this.indexfoto+num;
  if(this.indexfoto>(this.propiedad.fotos.length-1)){
    this.indexfoto=0;
  }
  if(this.indexfoto<0){
    this.indexfoto=this.propiedad.fotos.length-1;
  }
}

}
