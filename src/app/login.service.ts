import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url=enviroment.baseUrl+'/login';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(usuario:usuario){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(usuario));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }

update(usuario:usuario){
return this.http.post(`${this.url}/update.php`,JSON.stringify(usuario));
}


logauth(){

}
}
