import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router';

import { LoginService } from '../login.service';
import { usuario } from '../model/usuario';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private isValidEmail= /\S+@\S+\.\S+/;
 private usuario:usuario=new usuario();
 private redirectrout="";
 loginForm=this.fb.group({
         username:['',[Validators.required,Validators.pattern(this.isValidEmail)]],
         password:['',[Validators.required,Validators.minLength(5)]],
 });

  constructor(private fb:FormBuilder,
               private loginService:LoginService,
               private router:Router) { }

  ngOnInit(): void {

  }



  getErrorMessage(field:string):string{
    let message;
    if(this.loginForm.get(field).errors.required){
      message= 'You must enter a value';
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


  onLogin(){

    this.getusuario();

   this.loginService.login(this.usuario);
   if(sessionStorage.getItem('userToken')){
    console.log("enmtro aqui");
      this.redirectrout= this.loginService.urlintetoAcceder;
      this.loginService.urlintetoAcceder='';
       this.router.navigate([this.redirectrout]);
  }




  }


  getusuario(){
    this.usuario.usu_correo=this.loginForm.get('username').value;
    this.usuario.usu_password=this.loginForm.get('password').value;
    return this.usuario;
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
