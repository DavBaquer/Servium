import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from './environments/enviroment';
import { Contacto } from './model/contacto';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url=enviroment.baseUrl;

  constructor(private http:HttpClient) { }


sendEmail(contacto:Contacto){
return this.http.post(`${this.url}/send.php`,JSON.stringify(contacto));
}


}
