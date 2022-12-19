import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  id: string | null;

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService,
    private router: Router,
    private aRoute: ActivatedRoute) {
      this.createEmpleado = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        DNI: ['', Validators.required],
        sueldo: ['', Validators.required]
      })
  
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id)
    }

  ngOnInit() {
  }

  agregarEmpleado(){
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;
    }

    const empleado: Empleado = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      DNI: this.createEmpleado.value.DNI,
      sueldo: this.createEmpleado.value.sueldo,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._empleadoService.agregarEmpleado(empleado).then(() =>{
      console.log("Empleado registrado con exito!");
      this.router.navigate(['/home']);
    }).catch(error =>{
      console.log(error);
    });

  }

}
