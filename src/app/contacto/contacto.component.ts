import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import {Contacto} from '../model/contacto'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  private isValidEmail= /\S+@\S+\.\S+/;
  email:Contacto= new Contacto();
  contactoForm=this.fb.group({
    nombre:[''],
    email:['',[Validators.required,Validators.pattern(this.isValidEmail)]],
    telefono:['',[Validators.required,Validators.minLength(10)]],
    mensaje:['']
});
  constructor(private fb:FormBuilder,
    private emailService:EmailService) { }

  ngOnInit(): void {
  }

onSend(){


    this.emailService.sendEmail(this.getEmail()).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);

      }else{
        alert(datos['mensaje']);
      }
    });
}

getEmail(){
  this.email.nombre=this.contactoForm.get('nombre').value;
  this.email.telefono=this.contactoForm.get('telefono').value;
  this.email.correo=this.contactoForm.get('email').value;
  this.email.mensaje=this.contactoForm.get('mensaje').value;
  return this.email;
}

getErrorMessage(field:string):string{
  let message;
  if(this.contactoForm.get(field).errors.required){
    message= 'You must enter a value';
  }else if(this.contactoForm.get(field).hasError('pattern')){
    message='No es un email valido.';
  }else if(this.contactoForm.get(field).hasError('minlength')){
    message='este campo debe tener almenos 10 caracteres';
  }
           return message;
}

isValidFiel(field:string):boolean{
    return(
      (this.contactoForm.get(field).touched || this.contactoForm.get(field).dirty) &&
      !this.contactoForm.get(field).valid
      );
}

}
