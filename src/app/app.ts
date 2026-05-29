import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from './services/auth';
import { Departamentos } from './pages/departamentos/departamentos';
import { Cargos } from './pages/cargos/cargos';
import { Empleados } from './pages/empleados/empleados';
import { Asistencias } from './pages/asistencias/asistencias';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Departamentos,
    Cargos,
    Empleados,
    Asistencias
  ],
  template: `
    <div *ngIf="!logueado" class="login-container">
      <div class="login-card">
        <h1>Sistema de Control de Empleados</h1>
        <h2>Inicio de sesión</h2>

        <input 
          type="text" 
          placeholder="Usuario" 
          [(ngModel)]="usuario.username">

        <input 
          type="password" 
          placeholder="Contraseña" 
          [(ngModel)]="usuario.password">

        <button (click)="iniciarSesion()">
          Ingresar
        </button>

        <button (click)="crearAdmin()">
          Crear Admin
        </button>

        <p class="error" *ngIf="mensaje">
          {{ mensaje }}
        </p>
      </div>
    </div>

    <div *ngIf="logueado">
      <h1>Sistema de Control de Empleados</h1>

      <div class="topbar">
        <span>Bienvenida, {{ nombreUsuario }}</span>
        <button (click)="cerrarSesion()">Cerrar sesión</button>
      </div>

      <app-departamentos />
      <hr>

      <app-cargos />
      <hr>

      <app-empleados />
      <hr>

      <app-asistencias />
    </div>
  `
})
export class App {

  usuario = {
    username: '',
    password: ''
  };

  logueado = false;
  nombreUsuario = '';
  mensaje = '';

  constructor(private authService: AuthService) {
  if (typeof window !== 'undefined' && window.localStorage) {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.logueado = true;
      this.nombreUsuario = usuarioGuardado;
    }
  }
}

  iniciarSesion() {
  this.authService.login(this.usuario).subscribe({
    next: (resp) => {
      this.logueado = true;
      this.nombreUsuario = resp.username;

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('usuario', resp.username);
      }

      this.mensaje = '';
    },
    error: () => {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  });
}

  crearAdmin() {
    const admin = {
      username: this.usuario.username,
      password: this.usuario.password,
      rol: 'ADMIN'
    };

    this.authService.registrar(admin).subscribe({
      next: () => {
        this.mensaje = 'Administrador creado. Ahora inicia sesión.';
      },
      error: () => {
        this.mensaje = 'No se pudo crear el administrador';
      }
    });
  }

  cerrarSesion() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('usuario');
  }

  this.logueado = false;
  this.usuario = {
    username: '',
    password: ''
  };
}
}