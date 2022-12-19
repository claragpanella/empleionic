import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }
  
  agregarEmpleado(empleado: Empleado): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any>{
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
}
