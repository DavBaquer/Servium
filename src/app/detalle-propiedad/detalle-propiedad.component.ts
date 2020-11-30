import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdicionalService } from '../adicional.service';
import { CaracteristicaService } from '../caracteristica.service';
import { CategoriaService } from '../categoria.service';
import { GaleriaService } from '../galeria.service';
import { adicional } from '../model/adicional';
import { caracteristica } from '../model/caracteristica';
import { categoria } from '../model/categoria';
import { galeria } from '../model/galeria';
import { propiedad } from '../model/propiedad';
import { transaccion } from '../model/transaccion';
import { ubicacion } from '../model/ubicacion';
import { PropiedadesService } from '../propiedades.service';
import { TransaccionService } from '../transaccion.service';
import { UbicacionService } from '../ubicacion.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { MultimediaService } from '../multimedia.service';
import { multimedia } from '../model/multimedia';

@Component({
  selector: 'app-detalle-propiedad',
  templateUrl: './detalle-propiedad.component.html',
  styleUrls: ['./detalle-propiedad.component.css']
})



export class DetallePropiedadComponent implements OnInit {
  propiedad:propiedad=new propiedad();
  propiedad2:propiedad=new propiedad();
  adicionales:adicional[]=null;
  ubicacion:ubicacion=new ubicacion();
  caracteristica:caracteristica=new caracteristica();
  adicional:adicional= new adicional();
  validacionadd=false;
  categorias:categoria[];
  transacciones:transaccion[];
  seleccionado1:categoria=null;
  seleccionado2:transaccion=null;
  fotos:galeria[];
  indexfoto:number;
  multimedia:multimedia=new multimedia();


  constructor(private rout:ActivatedRoute,private propiedadService:PropiedadesService,private categoriaService:CategoriaService,
    private transaccionService:TransaccionService,
    private location:Location,
    private galeriaService:GaleriaService,
    private caracteristicaService:CaracteristicaService,
    private ubicacionService:UbicacionService,
    private adicionalService:AdicionalService,
    private multimediaService:MultimediaService,
    public modal:NgbModal) {

  }



  ngOnInit(): void {
    this.getPropiedad();
    this.getAllCategorias();
    this.getAllTransaccion();
    this.indexfoto=0;


  }

  getPropiedad():void{
    const id=this.rout.snapshot.paramMap.get('id');
    console.log(parseInt(id));
    this.propiedadService.findbyid(parseInt(id)).subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.propiedad=<propiedad>prueb[0];
        this.propiedad2=Object.assign({},this.propiedad);

        this.cargarGaleria();
        this.cargarCaracteriticas();
        this.cargartransaccion(this.propiedad['tra_id']);
        this.cargarCategoria(this.propiedad['cat_id'])
        this.cargarUbicacion();
        this.cargarAdicional();
        this.cargarMultimedia();


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
             this.fotos=this.propiedad.fotos;
             console.log("galeria"+this.fotos[0].gal_nombre);

        }
    });
  }

goBack(){
  this.location.back();
}


selectImagen(selecionado:galeria){

   var imagen=document.getElementById('imagen');
   imagen.setAttribute("src",""+selecionado.gal_imagen);

   this.indexfoto=this.fotos.indexOf(selecionado);
   console.log("entro aqui"+this.indexfoto+this.fotos.length);

}


cargarCaracteriticas(){

  this.caracteristicaService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
       console.log(prueb);
      this.propiedad.caracteristica= <caracteristica> prueb[0];
      this.caracteristica=Object.assign({},<caracteristica> prueb[0]);
    }

});


}

cargartransaccion(id:number){

  this.transaccionService.find(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
   console.log(prueb[0]['tra_nombre']);
     this.propiedad.transaccion=<transaccion> prueb[0];
     this.seleccionado2=this.propiedad.transaccion;
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
     this.seleccionado1=this.propiedad.categoria;
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
     this.ubicacion= Object.assign({}, <ubicacion> prueb[0]);
     let video=document.getElementById("mapa");
     video.innerHTML=" <iframe src='"+this.propiedad.ubicacion.ubi_url+"' width='100%' height='300' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false'  tabindex='0'></iframe>";



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
      this.adicionales=adicional;


    }
});
}


cargarMultimedia(){
  this.multimediaService.findbypro(this.propiedad.pro_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
     var prueb=JSON.parse(datos['resp']);
     console.log(prueb);
     this.propiedad.multimedia=<multimedia>prueb[0];
     this.multimedia=Object.assign({}, <multimedia> prueb[0]);

     let video=document.getElementById("video");
     video.innerHTML="<iframe width='100%' height='300px' src='"+this.multimedia.mul_video+"'allowfullscreen></iframe>"


    }else
    {
      let video=document.getElementById("video");
     video.innerHTML=""

    }
  });
}




agregaradicional(){
  this.validaadd();
  if(this.validacionadd==true){
   if((this.adicional.add_nombre===null|| this.adicional.add_nombre==="") && (this.adicional.add_descripcion===null || this.adicional.add_descripcion==="")){
     console.log("no existe elemento que agregar");
   }else{
       this.adicional.pro_id=this.propiedad.pro_id;



    this.adicionalService.add(this.adicional).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.adicionales.push(this.adicional);
         this.adicional=new adicional();
      }else{
        alert("no se agrego");
      }
    });
  }


   }

 }
 eliminaradicional(item:adicional){
  this.adicionalService.delete(item.add_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      var index= this.adicionales.indexOf(item);
       if (index > -1) {
        this.adicionales.splice(index, 1);
       }
    }else{
      alert("no se elimino");
    }
  });
 }


 validaadd(){
  if(this.adicional.add_nombre=="" || this.adicional.add_nombre==null || this.adicional.add_descripcion==null || this.adicional.add_descripcion==" ")
  {

  var elemento=document.getElementById("requeridoadd");

    elemento.style.display="block";
    this.validacionadd=false;
}else{

  var elemento=document.getElementById("requeridoadd");

    elemento.style.display="none";
    this.validacionadd=true;
}


}



getAllTransaccion():void{
  this.transaccionService.all().subscribe((transacciones:transaccion[])=>this.transacciones=transacciones);

}

getAllCategorias():void{
this.categoriaService.all().subscribe((categorias:categoria[])=>this.categorias=categorias);

}

editarPublicacion(){
  console.log("entro aqui editar");
  if(this.propiedad2.pro_titulo===null || this.propiedad2.pro_titulo==="" || this.propiedad2.pro_descripcion==="" || this.propiedad2.pro_descripcion===null || this.seleccionado1.cat_id===null || this.seleccionado2.tra_id===null)
  {
    var elemento=document.getElementById("requerido");
    elemento.style.display="block";
}else{
  var elemento=document.getElementById("requerido");
    elemento.style.display="none";
      this.propiedad2.categoria=this.seleccionado1;
      this.propiedad2.transaccion=this.seleccionado2;
    this.propiedadService.update(this.propiedad2).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getPropiedad();
        this.modal.dismissAll();
      }else{
        alert(datos['mensaje']);
      }
    });

}

}


agregarUbicacion(){

  this.ubicacion.pro_id=this.propiedad.pro_id;
  console.log("ubicacion"+this.ubicacion.ubi_direccion+this.ubicacion.pro_id);
  this.ubicacionService.add(this.ubicacion).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
    }else{
      alert(datos['mensaje']);
    }
  });
}

editarUbicacion(){

this.ubicacionService.update(this.ubicacion).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getPropiedad();
        this.modal.dismissAll();
      }else{
        alert(datos['mensaje']);
      }
    });
}


agregarCaracteristica(){
  if(this.caracteristica.habitacion===null && this.caracteristica.bano_compartido===null && this.caracteristica.bano_master===null && this.caracteristica.bano_social===null && this.caracteristica.linea_telf===null && this.caracteristica.plantas===null && this.caracteristica.m_contruccion===null && this.caracteristica.m_terreno===null && (this.caracteristica.anio_construccion===null || this.caracteristica.anio_construccion==="")){


 }else{
  if(this.caracteristica.habitacion==null){
    this.caracteristica.habitacion=0;
   }
   if(this.caracteristica.bano_compartido==null){
    this.caracteristica.bano_compartido=0;
   }


   if(this.caracteristica.bano_master==null){
    this.caracteristica.bano_master=0;
   }

   if(this.caracteristica.bano_social==null){
    this.caracteristica.bano_social=0;
   }

   if(this.caracteristica.linea_telf==null){
    this.caracteristica.linea_telf=0;
   }

   if(this.caracteristica.plantas==null){
    this.caracteristica.plantas=0;
   }
   if(this.caracteristica.m_contruccion==null){
    this.caracteristica.m_contruccion=0;
   }

   if(this.caracteristica.m_terreno==null){
    this.caracteristica.m_terreno=0;
   }

   this.caracteristica.pro_id=this.propiedad.pro_id;
   console.log("agregar caracte"+this.caracteristica.m_terreno);
  this.caracteristicaService.add(this.caracteristica).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
    }else{
      alert("no se agrego");
    }
  });
 }
}

agregarMultimedia(){

  this.multimedia.pro_id=this.propiedad.pro_id;

  this.multimediaService.add(this.multimedia).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
      this.modal.dismissAll();
    }else{
      alert(datos['mensaje']);
    }
  });
}


editarCaracteristica(){
  this.caracteristicaService.update(this.caracteristica).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
      this.modal.dismissAll();
    }else{
      alert(datos['mensaje']);
    }
  });
}


editarMultimedia(){
  this.multimediaService.update(this.multimedia).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
      this.modal.dismissAll();
    }else{
      alert(datos['mensaje']);
    }
  });
}



eliminarUbicacion(id:number){
  this.ubicacionService.delete(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
    }else{
      alert("no se elimino");
    }
  });

}

eliminarCaracteristica(id:number){
  this.caracteristicaService.delete(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
    }else{
      alert("No se elimino");
    }
  });

}

eliminarMultimedia(id:number){
  this.multimediaService.delete(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPropiedad();
    }else{
      alert("no se elimino");
    }
  });

}




fileSelected(event)
{ if(this.fotos.length<10){
  var selectedFile:File = <File>event.target.files[0];

  var reader = new FileReader();
  reader.readAsDataURL(selectedFile);
var gale=new galeria();
       gale.gal_tipo=selectedFile.type;
       gale.gal_nombre=selectedFile.name;
      let imgPromise=this.getFileBlob(selectedFile);
      imgPromise.then(blob =>{
         gale.gal_imagen=blob;
        console.log("este el blob:"+ gale.gal_imagen);
        gale.pro_id=this.propiedad.pro_id;

        this.galeriaService.add(gale).subscribe(datos=>{
          if(datos['resultado']=='OK'){
            alert(datos['mensaje']);
            this.fotos.push(gale);
            this.validarGaleria();
          }else{
            alert(datos['mensaje']);
          }
        });



      }).catch(e => console.log(e));
    }else{
      alert("El limite maximo de fotos es 10, para agregar una nueva imagen elimine una de la lista");
      this.validarGaleria();
    }
}

eliminarimagen(item:galeria){

if(this.fotos.length>1){
  this.galeriaService.delete(item.gal_id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      var index= this.fotos.indexOf(item);
      if (index > -1) {
        this.fotos.splice(index, 1);
     }
            this.validarGaleria();
    }else{
      alert("no se elimino");
    }
  });
}else{
  alert("Para eleminar esta foto debes ingresar una nueva")
}
}


validarGaleria(){
  console.log("galeria numero:"+this.fotos.length);
  if(this.fotos.length>=10){

    var inputfile= document.getElementById("fileimagen");
    inputfile.style.display="none"
  }else{
    var inputfile= document.getElementById("fileimagen");
    inputfile.style.display="block"

  }


}




getFileBlob(file){
 var reader = new FileReader();
 return new Promise(function(resolve,reject){
     reader.onload=(function(theFile){
       return function(e){
         resolve(e.target.result)
       };
     })(file);
  reader.readAsDataURL(file);
 });

}


avanzaFotos(num:number){
  this.indexfoto=this.indexfoto+num;
  if(this.indexfoto>=(this.fotos.length-1)){
    this.indexfoto=0;
  }
  if(this.indexfoto<0){
    this.indexfoto=this.fotos.length-1;
  }

}

verVideo(){
  const baseurl="https://www.youtube.com/embed/";
  var srting:string=this.multimedia.mul_video;
  var saludoArray = srting.split('=');
  var ultima      = saludoArray[saludoArray.length - 1];
  this.multimedia.mul_video= baseurl+ultima;
  console.log(this.multimedia.mul_video)
  let video=document.getElementById("videoedit");
  video.innerHTML="<iframe width='100%' height='300px' src='"+this.multimedia.mul_video+"'allowfullscreen></iframe>"
}

verMapa(urlmap:string){

  let video=document.getElementById("mapaedit");
  video.innerHTML=" <iframe src='"+urlmap+"' width='100%' height='300' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false'  tabindex='0'></iframe>";

}
cerrarModal(){
  this.modal.dismissAll();
  this.getPropiedad();
}

}
