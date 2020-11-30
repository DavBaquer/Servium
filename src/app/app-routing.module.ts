import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CanActivateGuard } from './can-activate.guard';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DetallePropiedadComponent } from './detalle-propiedad/detalle-propiedad.component';
import { DetallePublicacionComponent } from './detalle-publicacion/detalle-publicacion.component';
import { HomeComponent } from './home/home.component';
import { ListaPropiedadComponent } from './lista-propiedad/lista-propiedad.component';
import { LogautComponent } from './logaut/logaut.component';
import { LoginComponent } from './login/login.component';
import { usuario } from './model/usuario';
import { PanePropiedadesComponent } from './pane-propiedades/pane-propiedades.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { UpgradeUsuarioComponent } from './upgrade-usuario/upgrade-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [

  {path:'admin',component:AdminPanelComponent,
  children: [
    {path:'', component:LoginComponent},
    {path:'logout',component:LogautComponent, canActivate:[CanActivateGuard]},
    {path:'usuarios', component:UsuarioComponent, canActivate:[CanActivateGuard]},
    {path: 'categorias', component: CategoriaComponent,canActivate:[CanActivateGuard]},
    {path: 'transaccion', component: TransaccionComponent,canActivate:[CanActivateGuard]},
    {path:'upgradeusuario',component:UpgradeUsuarioComponent, canActivate:[CanActivateGuard]},
    {path:'publicidad',component:PublicidadComponent,canActivate:[CanActivateGuard]},
    {path:'Propiedades', component: PanePropiedadesComponent,
     children:[
    {path: 'registro', component: PropiedadesComponent, canActivate:[CanActivateGuard]},
    {path:'detalle/:id',component:DetallePropiedadComponent, canActivate:[CanActivateGuard]},
    {path: '', component:ListaPropiedadComponent, canActivate:[CanActivateGuard]}
     ]}
  ]},
   {path:'publicacion', component:PublicacionComponent},
   {path:'detallepublicacion/:id',component:DetallePublicacionComponent},
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contacto',component:ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
