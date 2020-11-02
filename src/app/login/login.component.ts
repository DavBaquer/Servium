import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import{Router} from '@angular/router'
import { relative } from 'path';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private isValidEmail= /\S+@\S+\.\S+/;

 loginForm=this.fb.group({
         username:['',[Validators.required,Validators.pattern(this.isValidEmail)]],
         password:['',[Validators.required,Validators.minLength(5)]],
 });

  constructor(private fb:FormBuilder) { }

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

  }

}
