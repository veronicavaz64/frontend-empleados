import { Component } from '@angular/core';
import { Departamentos } from './pages/departamentos/departamentos';
import { Cargos } from './pages/cargos/cargos';
import { Empleados } from './pages/empleados/empleados';
import { Asistencias } from './pages/asistencias/asistencias';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Departamentos, Cargos, Empleados, Asistencias],
  template: `
    <h1>Sistema de Control de Empleados</h1>

    <app-departamentos />
    <hr>

    <app-cargos />
    <hr>

    <app-empleados />
    <hr>

    <app-asistencias />
  `
})
export class App {}