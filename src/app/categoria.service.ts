import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { categoria } from './model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url=enviroment.baseUrl+'/categoria';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(categoria:categoria){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(categoria));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }

update(categoria:categoria){
return this.http.post(`${this.url}/update.php`,JSON.stringify(categoria));
}
}
