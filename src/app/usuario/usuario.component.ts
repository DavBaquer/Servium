import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { usuario } from '../model/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  titulo="";
  validacion=null;

  usuarios:usuario[];
  usuario:usuario=new usuario();
  constructor( private userService:UsuarioService) {

   }

  getusuarios():void{
    console.log("inicio");
    this.userService.all().subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.usuarios=<usuario[]>prueb;
        console.log(this.usuarios);

      }else{
        alert(datos['mensaje']);
      }
    });



}

ngOnInit(): void {
  this.getusuarios();


}

eliminar(id:number){
  this.userService.delete(id).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getusuarios();
    }else{
      alert("no se elimino");
    }
  });
}
add(){
  this.titulo="Agregar Usuario";
  this.usuario=new usuario();
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
  this.titulo="Editar Transaccion";
 var elemento=document.getElementById("form-add");
 if (elemento != null) {
  elemento.style.display = 'block';
   }
   var elemento=document.getElementById("btn-add");
  if (elemento != null) {
   elemento.style.display = 'none';
    }

  var elemento=document.getElementById("lbl_contrasenia");
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


      this.userService.find(id).subscribe(datos=>{
        if(datos['resultado']=='OK'){
         var prueb=JSON.parse(datos['resp']);
       console.log(prueb[0]['tra_nombre']);
         this.usuario=<usuario> prueb[0];
         this.usuario.usu_password='';
         console.log(this.usuario.usu_nombre);
        }else{
          alert(datos['mensaje']);
        }
      });

debugger;
}

editar(){
  if((this.usuario.usu_nombre!=="" && this.usuario.usu_nombre!==null) && (this.usuario.usu_correo!=="" && this.usuario.usu_correo!==null) && (this.usuario.usu_rol!=="" && this.usuario.usu_rol!==null) ){

  this.userService.update(this.usuario).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getusuarios();
    }else{
      alert(datos['mensaje']);
    }
  });
  }else{
    alert('Llene todos los campos requeridos y vuelva a intentarlo');
  }
}
agregar(){

if((this.usuario.usu_nombre!=="" && this.usuario.usu_nombre!==null) && (this.usuario.usu_correo!=="" && this.usuario.usu_correo!==null) && (this.usuario.usu_rol!=="" && this.usuario.usu_rol!==null) && (this.usuario.usu_password!=="" && this.usuario.usu_password!==null) ){
  this.userService.add(this.usuario).subscribe(datos=>{
    if(datos['resultado']=='OK'){
      alert(datos['mensaje']);
      this.getusuarios();
    }else{
      alert("no se agrego");
    }
  });
}else{
  alert('Llene todos los campos requeridos y vuelva a intentarlo');
}
}


mostrarContrasena(){
  var tipo =<HTMLInputElement> document.getElementById("password");
  if(tipo.type == "password"){
      tipo.type = "text";
  }else{
      tipo.type = "password";
  }
}


}
