import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  private valid:boolean=false;
  constructor(private router:Router,private loginService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     /* this.loginService.isLoggedIn(state.url).subscribe(datos=>{
        if(datos['resultado']=='OK'){
          alert(datos['resultado']);
          this.valid=true;

        }else{
          alert(datos['resultado']);
          this.valid=false;

        }
      });
*/
      if(!this.loginService.isLoggedIn(state.url)){
        this.router.navigate(['/admin']);
        return this.valid;
      }
      return this.valid=true;

  }





}
