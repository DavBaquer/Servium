import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  usuarioLogeado:boolean=false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {

    this.loginService.changeLoginStatus$.subscribe((loggedStatus:boolean)=>
    {
      this.usuarioLogeado=loggedStatus;
    })
    this.loginService.isLoggedIn('');
  }

}
