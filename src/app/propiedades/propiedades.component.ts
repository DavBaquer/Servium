import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { adicional } from '../model/adicional';
import { caracteristica } from '../model/caracteristica';
import { categoria } from '../model/categoria';
import { galeria } from '../model/galeria';
import { propiedad } from '../model/propiedad';
import { transaccion } from '../model/transaccion';
import { ubicacion } from '../model/ubicacion';
import { PropiedadesService } from '../propiedades.service';
import { TransaccionService } from '../transaccion.service';
import {Location} from '@angular/common';
import { multimedia } from '../model/multimedia';



@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {
  propiedad:propiedad=new propiedad();
  transacciones:transaccion[];
  categorias:categoria[];
  seleccionado1:categoria=new categoria();
  seleccionado2:transaccion= new transaccion();
  ubicacion:ubicacion=new ubicacion();
  caracteristica:caracteristica=new caracteristica();
  adicional:adicional=new adicional();
  adicionales:adicional[]=[];
  fuentes:string[]=[];
  galeria:galeria[]=[];
  validacion:boolean=false;
  validacionadd:boolean=false;
  validacionGal:boolean=false;
  multimedia:multimedia=new multimedia();


  constructor(private propiedadService:PropiedadesService,private categoriaService:CategoriaService,private transaccionService:TransaccionService,private location:Location ) {

   }

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllTransaccion();
  }



  agregar(){
    console.log(this.propiedad);
    this.validarCampos();

    if(this.validacion==true && this.validacionGal==true){
    this.verificarElementos();
    this.propiedadService.add(this.propiedad).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);

      }else{
        alert(datos['mensaje']);
      }
    });

  }




  }







  getAllTransaccion():void{
    this.transaccionService.all().subscribe((transacciones:transaccion[])=>this.transacciones=transacciones);

}

getAllCategorias():void{
  this.categoriaService.all().subscribe((categorias:categoria[])=>this.categorias=categorias);

}

verificarElementos(){

  if((this.ubicacion.ubi_direccion===""||this.ubicacion.ubi_direccion===null) && (this.ubicacion.ubi_ciudad===""|| this.ubicacion.ubi_ciudad===null) && (this.ubicacion.ubi_codpostal===""|| this.ubicacion.ubi_codpostal===null)&& (this.ubicacion.ubi_barrio===""|| this.ubicacion.ubi_barrio===null)){
    this.propiedad.ubicacion=null;
   }else{
    this.propiedad.ubicacion=this.ubicacion;
   }


   if(this.adicionales.length<=0){
     this.propiedad.adicionales=null;
   }else{
     this.propiedad.adicionales=this.adicionales;
   }


   if(this.caracteristica.habitacion===null && this.caracteristica.bano_compartido===null && this.caracteristica.bano_master===null && this.caracteristica.bano_social===null && this.caracteristica.linea_telf===null && this.caracteristica.plantas===null && this.caracteristica.m_contruccion===null && this.caracteristica.m_terreno===null && (this.caracteristica.anio_construccion===null || this.caracteristica.anio_construccion==="")){

      this.propiedad.caracteristica=null;
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

     this.propiedad.caracteristica=this.caracteristica;
   }

   if(this.galeria.length<=0){
    this.propiedad.fotos=null;
   }else{
       this.propiedad.fotos=this.galeria;
     }


    if(this.seleccionado1.cat_id!=null){
     this.propiedad.categoria=this.seleccionado1;
    }else{
      this.propiedad.categoria=null;
    }

    if(this.seleccionado2.tra_id!=null){
    this.propiedad.transaccion=this.seleccionado2;
    }else{
      this.propiedad.transaccion=null;
    }

    if(this.multimedia.mul_video!="" && this.multimedia.mul_video!=null){
       this.propiedad.multimedia=this.multimedia;
    }





   }


agregaradicional(){
 this.validaadd();
 if(this.validacionadd==true){
  if((this.adicional.add_nombre===null|| this.adicional.add_nombre==="") && (this.adicional.add_descripcion===null || this.adicional.add_descripcion==="")){
    console.log("no existe elemento q agregar");
  }else{
    this.adicionales.push(this.adicional);
    this.adicional=new adicional();
  }
  }
}
eliminaradicional(item:adicional){

  var index= this.adicionales.indexOf(item);
  if (index > -1) {
    this.adicionales.splice(index, 1);
 }
}




fileSelected(event)
{
  var selectedFile:File = <File>event.target.files[0];

  var reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = (e: any) => {
    // Simply set e.target.result as our <img> src in the layout
    this.fuentes.push(e.target.result);

  this.validarGaleria();

};

var gale=new galeria();
       gale.gal_tipo=selectedFile.type;
       gale.gal_nombre=selectedFile.name;
      let imgPromise=this.getFileBlob(selectedFile);
      imgPromise.then(blob =>{
         gale.gal_imagen=blob;
        console.log("este el blob:"+ gale.gal_imagen);
      }).catch(e => console.log(e));

      this.galeria.push(gale);
}

eliminarimagen(item:string){
var index= this.fuentes.indexOf(item);
  if (index > -1) {
    this.fuentes.splice(index, 1);
    this.galeria.splice(index, 1);
 }
  this.validarGaleria();
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


iniciarVariables(){
  this.seleccionado1= new categoria();
  this.seleccionado2= new transaccion();
  this.ubicacion=new ubicacion();
  this.caracteristica=new caracteristica();
  this.adicional=new adicional();
  this.adicionales=[];
  this.fuentes=[];
  this.galeria=[];
}


validarCampos(){
  if(this.propiedad.pro_titulo===null || this.propiedad.pro_titulo==="" || this.propiedad.pro_descripcion==="" || this.propiedad.pro_descripcion===null || this.seleccionado1.cat_id===null || this.seleccionado2.tra_id===null)
  {
    var elemento=document.getElementById("requerido");
    elemento.style.display="block";
    this.validacion=false;
}else{
  var elemento=document.getElementById("requerido");
    elemento.style.display="none";
    this.validacion=true;
}


if(this.galeria.length<=0){
  var elemento2=document.getElementById("requeridoGaleria");
  elemento2.style.display="block";

  this.validacionGal=false;

}else{
  var elemento2=document.getElementById("requeridoGaleria");

    elemento2.style.display="none";
    this.validacionGal=true;

}

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


validarGaleria(){
  console.log("galeria numero:"+this.galeria.length);
  if(this.galeria.length==10){

    var inputfile= document.getElementById("fileimagen");
    inputfile.style.display="none"
  }else{
    var inputfile= document.getElementById("fileimagen");
    inputfile.style.display="block"

  }
}

verVideo(){
  const baseurl="https://www.youtube.com/embed/";
  var srting:string=this.multimedia.mul_video;
  var saludoArray = srting.split('=');
  var ultima      = saludoArray[saludoArray.length - 1];
  this.multimedia.mul_video= baseurl+ultima;
  console.log(this.multimedia.mul_video)
  let video=document.getElementById("video");
  video.innerHTML="<iframe width='100%' height='300px' src='"+this.multimedia.mul_video+"'allowfullscreen></iframe>"
}

verMapa(urlmap:string){

  let video=document.getElementById("mapa");
  video.innerHTML=" <iframe src='"+urlmap+"' width='100%' height='300' frameborder='0' style='border:0;' allowfullscreen='' aria-hidden='false'  tabindex='0'></iframe>";

}


goBack(){
  this.location.back();
}

}
