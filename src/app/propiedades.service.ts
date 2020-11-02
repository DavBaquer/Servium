import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { propiedad } from './model/propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  url=enviroment.baseUrl+'/propiedad';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(propiedad:propiedad){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(propiedad));
}

findbyid(id:number){
  return this.http.get(`${this.url}/find.php?id=${id}`);
  }


  update(propiedad:propiedad){
    return this.http.post(`${this.url}/update.php`,JSON.stringify(propiedad));
    }

}
