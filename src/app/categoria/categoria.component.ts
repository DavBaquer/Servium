import { Component, OnInit } from '@angular/core';
import{CategoriaService} from '../categoria.service'
import { categoria } from '../model/categoria';

import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
  titulo="";

  displayedColumns: string[] = ['id','nombre','descripcion','editar','eliminar'];
  dataSource: MatTableDataSource<categoria>;
  validacion=null;

  categorias:categoria[];
  categoria:categoria=new categoria();

  constructor(private categoriaService:CategoriaService ) {
    this.categoria.cat_nombre=null;
    this.categoria.cat_descripcion=null;
    this.categoria.cat_id=null;

   }



  getAll():void{
    this.categoriaService.all().subscribe((categorias:MatTableDataSource<categoria>)=>this.dataSource=categorias);
    console.log(this.dataSource);
}

  ngOnInit(): void {
    this.getAll();


  }

  eliminar(id:number){
    this.categoriaService.delete(id).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getAll();
      }else{
        alert("no se elimino");
      }
    });
  }
  add(){
    this.titulo="Agregar Categoria";
   var elemento=document.getElementById("form-add");
   if (elemento != null) {
    elemento.style.display = 'block';
     }
     var elemento=document.getElementById("btn-add");
    if (elemento != null) {
     elemento.style.display = 'none';
      }
      var btn_agregar= <HTMLButtonElement> document.getElementById("btn-agregar");
      if (btn_agregar != null) {
        btn_agregar.disabled=false;
        }

        var btn_editar= <HTMLButtonElement> document.getElementById("btn-editar");
      if (btn_editar != null) {
        btn_editar.disabled=true;
        }

  }

  closed(){

    var elemento=document.getElementById("form-add");
    if (elemento != null) {
     elemento.style.display = 'none';
      }

      var elemento=document.getElementById("btn-add");
    if (elemento != null) {
     elemento.style.display = 'block';
      }


   }


  seleccionar(id:number){
    this.titulo="Editar Categoria";
   var elemento=document.getElementById("form-add");
   if (elemento != null) {
    elemento.style.display = 'block';
     }
     var elemento=document.getElementById("btn-add");
    if (elemento != null) {
     elemento.style.display = 'none';
      }


      var btn_agregar= <HTMLButtonElement> document.getElementById("btn-agregar");
      if (btn_agregar != null) {
        btn_agregar.disabled=true;
        }

        var btn_editar= <HTMLButtonElement> document.getElementById("btn-editar");
      if (btn_editar != null) {
        btn_editar.disabled=false;
        }


        this.categoriaService.find(id).subscribe(datos=>{
          if(datos['resultado']=='OK'){
           var prueb=JSON.parse(datos['resp']);
           this.categoria=<categoria> prueb[0];
           console.log(this.categoria.cat_nombre);
          }else{
            alert(datos['mensaje']);
          }
        });

  debugger;
  }

  editar(){
    this.validacionform();
    if(this.validacion===true){
    this.categoriaService.update(this.categoria).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getAll();
      }else{
        alert(datos['mensaje']);
      }
    });
  }
  }
  agregar(){
    this.validacionform();
    console.log(this.validacion);
    if(this.validacion==true){
    this.categoriaService.add(this.categoria).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getAll();
      }else{
        alert("no se agrego");
      }
    });
  }
  }



validacionform(){
console.log(this.categoria.cat_nombre);
if(this.categoria.cat_nombre===null || this.categoria.cat_nombre==="" ){
    var elemento=document.getElementById("requerido");

    elemento.style.display="block";


    this.validacion=false;
}else{

  var elemento=document.getElementById("requerido");

    elemento.style.display="none";
    this.validacion=true;
}

}

}
