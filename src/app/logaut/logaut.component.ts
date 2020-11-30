import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logaut',
  templateUrl: './logaut.component.html',
  styleUrls: ['./logaut.component.css']
})
export class LogautComponent implements OnInit {

  constructor( private loginService:LoginService, private router:Router,private location:Location) { }

  ngOnInit(): void {
  }


  cerrarSession(){
    this.loginService.logauth();

   if(!sessionStorage.getItem('userToken')){

       this.router.navigate(['/admin']);
   }


  }

  goBack(){
    this.location.back();
  }

}
