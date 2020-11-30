import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { transaccion } from '../model/transaccion';
import { TransaccionService } from '../transaccion.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  titulo="";

  displayedColumns: string[] = ['id','nombre','descripcion','editar','eliminar'];
  dataSource: MatTableDataSource<transaccion>;
  validacion=null;

  transacciones:transaccion[];
  transaccion:transaccion=new transaccion();

  constructor(private transaccionService:TransaccionService ) {
    this.transaccion.tra_nombre=null;
    this.transaccion.tra_descripcion=null;
    this.transaccion.tra_id=null;

   }



  getAll():void{
    this.transaccionService.all().subscribe((transaccion:MatTableDataSource<transaccion>)=>this.dataSource=transaccion);

}

  ngOnInit(): void {
    this.getAll();
  }

  eliminar(id:number){
    this.transaccionService.delete(id).subscribe(datos=>{
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
        this.getAll();
      }else{
        alert("no se elimino");
      }
    });
  }
  add(){
    this.titulo="Agregar Transaccion";
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
     this.transaccion= new transaccion();

   }


  seleccionar(id:number){
    this.titulo="Editar Transaccion";
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


        this.transaccionService.find(id).subscribe(datos=>{
          if(datos['resultado']=='OK'){
           var prueb=JSON.parse(datos['resp']);
         console.log(prueb[0]['tra_nombre']);
           this.transaccion=<transaccion> prueb[0];
           console.log(this.transaccion.tra_nombre);
          }else{
            alert(datos['mensaje']);
          }
        });

  debugger;
  }

  editar(){
    this.validacionform();
    if(this.validacion===true){
    this.transaccionService.update(this.transaccion).subscribe(datos=>{
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
    this.transaccionService.add(this.transaccion).subscribe(datos=>{
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
console.log(this.transaccion.tra_nombre);
if(this.transaccion.tra_nombre===null || this.transaccion.tra_nombre==="" ){
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
