import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { Publicidad } from './model/publicidad';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  url=enviroment.baseUrl+'/publicidad';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(publicidad:Publicidad){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(publicidad));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }

update(publicidad:Publicidad){
return this.http.post(`${this.url}/update.php`,JSON.stringify(publicidad));
}
}
