import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginService } from '../login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  urlUsuario:string="";
  private toggleButton: any;
    private sidebarVisible: boolean;
    usuarioLogeado:boolean=false;
    nombreUsuario:string='';
  constructor(public location: Location, private element : ElementRef, private loginService:LoginService,
    public modal:NgbModal) {
    this.sidebarVisible = false;
   }

  ngOnInit(): void {


    this.toggleButton=document.getElementById('togleButton');
    this.loginService.changeLoginStatus$.subscribe((loggedStatus:boolean)=>
    {
      this.usuarioLogeado=loggedStatus;
    })

    this.loginService.isLoggedIn('');
  }
  sidebarOpen() {

    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;

};
sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
     console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');

  };
sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
};

configusuario() {
  // const toggleButton = this.toggleButton;
  // const body = document.getElementsByTagName('body')[0];


};



rol():boolean{
  this.nombreUsuario=sessionStorage.getItem('usu_nombre');
  this.urlUsuario=sessionStorage.getItem('usu_imagen');
  console.log(this.nombreUsuario);
 if(sessionStorage.getItem('usu_rol')=='superadmin'){
    return true;
 }else{
   return false;
 }
}



}
