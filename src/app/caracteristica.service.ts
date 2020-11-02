import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { caracteristica } from './model/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  url=enviroment.baseUrl+'/caracteristica';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(caracteristica:caracteristica){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(caracteristica));
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

update(caracteristica:caracteristica){
return this.http.post(`${this.url}/update.php`,JSON.stringify(caracteristica));
}
}
