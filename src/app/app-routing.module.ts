import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DetallePropiedadComponent } from './detalle-propiedad/detalle-propiedad.component';
import { HomeComponent } from './home/home.component';
import { ListaPropiedadComponent } from './lista-propiedad/lista-propiedad.component';
import { LoginComponent } from './login/login.component';
import { PanePropiedadesComponent } from './pane-propiedades/pane-propiedades.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { TransaccionComponent } from './transaccion/transaccion.component';

const routes: Routes = [

  {path:'admin',component:AdminPanelComponent,
  children: [
    {path:'', component:LoginComponent},
    {path: 'categorias', component: CategoriaComponent},
    {path: 'transaccion', component: TransaccionComponent},
    {path:'Propiedades', component: PanePropiedadesComponent,
     children:[
    {path: 'registro', component: PropiedadesComponent},
    {path:'detalle/:id',component:DetallePropiedadComponent},
    {path: '', component:ListaPropiedadComponent}
     ]}
  ]},

  {path:'',component:HomeComponent},

  {path:'about',component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
