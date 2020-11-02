import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { adicional } from './model/adicional';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  url=enviroment.baseUrl+'/adicional';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(adicional:adicional){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(adicional));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }
findbycarac(id:number){
    return this.http.get(`${this.url}/findbycarac.php?id=${id}`);
    }

update(adicional:adicional){
return this.http.post(`${this.url}/update.php`,JSON.stringify(adicional));
}
}
