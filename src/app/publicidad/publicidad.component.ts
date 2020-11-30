import { Component, OnInit } from '@angular/core';
import { Publicidad } from '../model/publicidad';
import { PublicidadService } from '../publicidad.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  validacion=null;
  titulo='';
  publicidades:Publicidad[];
  publicidad:Publicidad=new Publicidad();
  constructor( private publcidadService:PublicidadService) {

   }

  getPublicidad():void{
    console.log("inicio");
    this.publcidadService.all().subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.publicidades=<Publicidad[]>prueb;
        console.log(this.publicidades);

      }else{
        alert('NO se encontraron registros en la Base de datos');
      }
    });



}

ngOnInit(): void {
  this.getPublicidad();

}

eliminar(id:number){
  this.publcidadService.delete(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPublicidad();
    }else{
      alert("no se elimino");
    }
  });
}
add(){
  this.titulo="Agregar Publicidad";
 var elemento=document.getElementById("form-add");
 if (elemento != null) {
  elemento.style.display = 'block';
   }
   var elemento=document.getElementById("btn-add");
  if (elemento != null) {
   elemento.style.display = 'none';
    }
    var btn_agregar= <HTMLButtonElement> document.getElementById("btn-agregar");
    if (btn_agregar != null) {
      btn_agregar.disabled=false;
      }

      var btn_editar= <HTMLButtonElement> document.getElementById("btn-editar");
    if (btn_editar != null) {
      btn_editar.disabled=true;
      }

}

closed(){

  var elemento=document.getElementById("form-add");
  if (elemento != null) {
   elemento.style.display = 'none';
    }

    var elemento=document.getElementById("btn-add");
  if (elemento != null) {
   elemento.style.display = 'block';
    }


 }


seleccionar(id:number){
  this.titulo="Editar Publicidad";
 var elemento=document.getElementById("form-add");
 if (elemento != null) {
  elemento.style.display = 'block';
   }
   var elemento=document.getElementById("btn-add");
  if (elemento != null) {
   elemento.style.display = 'none';
    }


    var btn_agregar= <HTMLButtonElement> document.getElementById("btn-agregar");
    if (btn_agregar != null) {
      btn_agregar.disabled=true;
      }

      var btn_editar= <HTMLButtonElement> document.getElementById("btn-editar");
    if (btn_editar != null) {
      btn_editar.disabled=false;
      }


      this.publcidadService.find(id).subscribe(datos=>{
        if(datos['resultado']=='OK'){
         var prueb=JSON.parse(datos['resp']);
       console.log(prueb[0]['tra_nombre']);
         this.publicidad=<Publicidad> prueb[0];
         console.log(this.publicidad.pub_imagen);
        }else{
          alert(datos['mensaje']);
        }
      });

debugger;
}

editar(){


  this.publcidadService.update(this.publicidad).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPublicidad();
    }else{
      alert(datos['mensaje']);
    }
  });

}
agregar(){


  this.publcidadService.add(this.publicidad).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getPublicidad();
    }else{
      alert("no se agrego");
    }
  });
}



fileSelected(event)
{
  var selectedFile:File = <File>event.target.files[0];

  var reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = (e: any) => {
    // Simply set e.target.result as our <img> src in the layout
   this.publicidad.pub_imagen=e.target.result;

};
}

}
