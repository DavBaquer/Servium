import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AdminNanabarComponent } from './admin-nanabar/admin-nanabar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {MatIconModule} from '@angular/material/icon';
import { CategoriaComponent } from './categoria/categoria.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { ListaPropiedadComponent } from './lista-propiedad/lista-propiedad.component';
import { PanePropiedadesComponent } from './pane-propiedades/pane-propiedades.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { DetallePropiedadComponent } from './detalle-propiedad/detalle-propiedad.component';
import { ModalUbicacionComponent } from './modales/modal-ubicacion/modal-ubicacion.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    AdminNanabarComponent,
    AdminPanelComponent,
    CategoriaComponent,
    TransaccionComponent,
    PropiedadesComponent,
    ListaPropiedadComponent,
    PanePropiedadesComponent,
    DetallePropiedadComponent,
    ModalUbicacionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCarouselModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
