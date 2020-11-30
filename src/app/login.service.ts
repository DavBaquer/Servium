import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { enviroment } from './environments/enviroment';
import { usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url=enviroment.baseUrl+'/login';
  public urlintetoAcceder='';
  public changeLoginStatusSubject= new Subject<boolean>();
  public changeLoginStatus$=this.changeLoginStatusSubject.asObservable();
  constructor(private http:HttpClient,
             private router:Router) { }


logauth(){
  sessionStorage.removeItem('userToken');
  sessionStorage.removeItem('usu_nombre');
  sessionStorage.removeItem('usu_correo');
  sessionStorage.removeItem('usu_id');
  sessionStorage.removeItem('usu_rol');
  sessionStorage.removeItem('usu_imagen');
  this.changeLoginStatusSubject.next(false);


  }

login(usuario:usuario){
   this.http.post(`${this.url}/login.php`,JSON.stringify(usuario)).subscribe(datos=>{
      if(datos['resultado']=='OK'){

        var prueb=JSON.parse(datos['resp']);
             var usuario:usuario;
             usuario=<usuario> prueb;
           alert(datos['mensaje']);
           sessionStorage.setItem('userToken',datos['token']);
           sessionStorage.setItem('usu_nombre',usuario.usu_nombre);
           sessionStorage.setItem('usu_correo',usuario.usu_correo);
           sessionStorage.setItem('usu_rol',usuario.usu_rol);
           sessionStorage.setItem('usu_id',usuario.usu_id+'');
           sessionStorage.setItem('usu_imagen',usuario.usu_imagen);
           this.changeLoginStatusSubject.next(true);
           this.router.navigate(['/']);

      }else{
        alert(datos['mensaje']);
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('usu_nombre');
        sessionStorage.removeItem('usu_correo');
        sessionStorage.removeItem('usu_id');
        sessionStorage.removeItem('usu_rol');
        sessionStorage.removeItem('usu_imagen');
        this.changeLoginStatusSubject.next(false);
      }
    });
}

isLoggedIn(url:string){
  const isLogged=sessionStorage.getItem('userToken');
  this.urlintetoAcceder=url;

  if(!isLogged){
    this.urlintetoAcceder=url;
    this.changeLoginStatusSubject.next(false);
    return false;
  }
  this.changeLoginStatusSubject.next(true);
   return true;


 //return this.http.post(`${this.url}/islogin.php`,{token:isLogged});

}


}
