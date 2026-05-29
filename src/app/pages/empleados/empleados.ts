import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class Empleados implements OnInit {

  empleados: any[] = [];

  empleado = {
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    estado: 'ACTIVO',
    departamento: {
      id: 1
    },
    cargo: {
      id: 1
    }
  };

  editando = false;
  idEditando: number | null = null;

  constructor(private service: EmpleadoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(data => {
      this.empleados = data;
    });
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.service.actualizar(this.idEditando, this.empleado).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    } else {
      this.service.guardar(this.empleado).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    }
  }

  editar(e: any) {
    this.editando = true;
    this.idEditando = e.id;
    this.empleado = JSON.parse(JSON.stringify(e));
  }

  cancelar() {
    this.editando = false;
    this.idEditando = null;

    this.empleado = {
      cedula: '',
      nombre: '',
      apellido: '',
      correo: '',
      estado: 'ACTIVO',
      departamento: {
        id: 1
      },
      cargo: {
        id: 1
      }
    };
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
    });
  }
}