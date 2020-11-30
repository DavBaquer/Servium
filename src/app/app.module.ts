import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
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
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LogautComponent } from './logaut/logaut.component';
import { FooterComponent } from './footer/footer.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { DetallePublicacionComponent } from './detalle-publicacion/detalle-publicacion.component';
import {MatRadioModule} from '@angular/material/radio';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterTransaccionPipe } from './pipes/filter-transaccion.pipe';
import { FilterCategoriaPipe } from './pipes/filter-categoria.pipe';
import { FilterUbicacionPipe } from './pipes/filter-ubicacion.pipe';
import { ContactoComponent } from './contacto/contacto.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import {MatMenuModule} from '@angular/material/menu';
import { UpgradeUsuarioComponent } from './upgrade-usuario/upgrade-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    AdminPanelComponent,
    CategoriaComponent,
    TransaccionComponent,
    PropiedadesComponent,
    ListaPropiedadComponent,
    PanePropiedadesComponent,
    DetallePropiedadComponent,
    LoginComponent,
    UsuarioComponent,
    LogautComponent,
    FooterComponent,
    PublicacionComponent,
    DetallePublicacionComponent,
    FilterPipe,
    FilterTransaccionPipe,
    FilterCategoriaPipe,
    FilterUbicacionPipe,
    ContactoComponent,
    PublicidadComponent,
    UpgradeUsuarioComponent
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
    MatRadioModule,
    MatMenuModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
