import { Component, OnInit } from '@angular/core';
import { CreatePage } from '../create/create.page';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public page!: number;
  searchText: any;
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

}
