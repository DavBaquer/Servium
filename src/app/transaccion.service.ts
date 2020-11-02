import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { transaccion } from './model/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  url=enviroment.baseUrl+'/transaccion';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(transaccion:transaccion){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(transaccion));
}

delete(id:number){
return this.http.get(`${this.url}/eliminar.php?id=${id}`);
}

find(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }

update(transaccion:transaccion){
return this.http.post(`${this.url}/update.php`,JSON.stringify(transaccion));
}
}
