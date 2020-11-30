
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { usuario } from '../model/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-upgrade-usuario',
  templateUrl: './upgrade-usuario.component.html',
  styleUrls: ['./upgrade-usuario.component.css']
})
export class UpgradeUsuarioComponent implements OnInit {
  private isValidEmail= /\S+@\S+\.\S+/;
  usuario:usuario=new usuario();
 private redirectrout="";

 loginForm=this.fb.group({
         nombre:['',[Validators.required]],
         email:['',[Validators.required,Validators.pattern(this.isValidEmail)]],
         password:['',[Validators.minLength(5)]],
         imagen:[''],
         upgrade:['',[Validators.required,Validators.minLength(5)]]

 });


  constructor(private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {

       this.usuario.usu_imagen=sessionStorage.getItem('usu_imagen');
       this.usuario.usu_nombre=sessionStorage.getItem('usu_nombre');
       this.usuario.usu_id=Number.parseInt(sessionStorage.getItem('usu_id'));
       this.usuario.usu_rol=sessionStorage.getItem('usu_rol');
       this.usuario.usu_correo=sessionStorage.getItem('usu_correo');



  }



  getErrorMessage(field:string):string{
    let message;
    if(this.loginForm.get(field).errors.required){
      message= 'Debe llenar este campo';
    }else if(this.loginForm.get(field).hasError('pattern')){
      message='No es un email valido.';
    }else if(this.loginForm.get(field).hasError('minlength')){
      message='este campo debe tener almenos 5 caracteres';
    }
             return message;
  }

  isValidFiel(field:string):boolean{
      return(
        (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) &&
        !this.loginForm.get(field).valid
        );
  }


  upgradeUsuario(){

    if((this.usuario.usu_nombre==='' || this.usuario.usu_nombre===null) || (this.usuario.usu_correo==='' || this.usuario.usu_correo===null)){
     alert('Ingrese los campos requidos del formulario');
     console.log('cooreo'+this.usuario.usu_correo+' nombre:'+this.usuario.usu_nombre);

    }else if(this.usuario.usu_upgrade==''|| this.usuario.usu_upgrade==null){
      alert('Ingrese su contraseña actual para guardar lo cambios realizados');


    }else{
       console.log('usario'+this.usuario.usu_id+'password'+this.usuario.usu_upgrade)
      this.usuarioService.upgrade(this.usuario).subscribe(datos=>{
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);

        }else{
          alert(datos['mensaje']);
        }
      });


    }



  }

  getimagen(img:string){

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
