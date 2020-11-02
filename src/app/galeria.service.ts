import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { galeria } from './model/galeria';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  url=enviroment.baseUrl+'/galeria';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(galeria:galeria){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(galeria));
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

update(galeria:galeria){
return this.http.post(`${this.url}/update.php`,JSON.stringify(galeria));
}
}
