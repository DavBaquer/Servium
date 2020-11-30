import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { multimedia } from './model/multimedia';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  url=enviroment.baseUrl+'/multimedia';

  constructor(private http:HttpClient) { }

all(){
return this.http.get(`${this.url}/mostrartodo.php`);
}
add(multimedia:multimedia){
return this.http.post(`${this.url}/agregar.php`,JSON.stringify(multimedia));
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

update(multimedia:multimedia){
return this.http.post(`${this.url}/update.php`,JSON.stringify(multimedia));
}
}
