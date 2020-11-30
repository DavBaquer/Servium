import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Publicidad } from '../model/publicidad';
import { PublicidadService } from '../publicidad.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   publicidades:Publicidad[]=[];
   usuarioLogeado:boolean=false;
   constructor(private loginService:LoginService,
                private publicidadService:PublicidadService) { }

  ngOnInit(): void {
    this.getPublicidad();
    this.loginService.changeLoginStatus$.subscribe((loggedStatus:boolean)=>
    {
      this.usuarioLogeado=loggedStatus;
    })
    this.loginService.isLoggedIn('');

  }

  getPublicidad(){
    console.log("inicio");
    this.publicidadService.all().subscribe(datos=>{
      if(datos['resultado']=='OK'){
       var prueb=JSON.parse(datos['resp']);
        this.publicidades=<Publicidad[]>prueb;
         this.publicidades.forEach(element => {
          var saludoArray = element.pub_descripcion.split('*');
          if(saludoArray.length>0){
          element.pub_frase1=saludoArray[0];
          }
          if(saludoArray.length>1){
          element.pub_frase2=saludoArray[1];
          }
          if(saludoArray.length>2){
          element.pub_frase3=saludoArray[2];
          }

         });

        console.log(this.publicidades);

      }else{
        alert('NO se encontraron registros en la Base de datos');
      }
    });
  }



}
