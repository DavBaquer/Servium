import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { ubicacion } from './model/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  url=enviroment.baseUrl+'/ubicacion';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}

getciudades(){
  return this.http.get(`${this.url}/ciudades.php`);
  }

add(ubicacion:ubicacion){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(ubicacion));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }

findbypro(id:number){
  return this.http.get(`${this.url}/findbypro.php?id=${id}`);
 }

update(ubicacion:ubicacion){
return this.http.post(`${this.url}/update.php`,JSON.stringify(ubicacion));
}
}
