import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../services/asistencia';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencias.html',
  styleUrl: './asistencias.css'
})
export class Asistencias implements OnInit {

  asistencias: any[] = [];

  asistencia = {
    fecha: '',
    horaEntrada: '',
    horaSalida: '',
    observacion: '',
    empleado: {
      id: 1
    }
  };

  fechaBuscar = '';

  editando = false;
  idEditando: number | null = null;

  constructor(private service: AsistenciaService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(data => {
      this.asistencias = data;
    });
  }

  buscarPorFecha() {
    if (this.fechaBuscar.trim() === '') {
      this.listar();
      return;
    }

    this.service.buscarPorFecha(this.fechaBuscar).subscribe(data => {
      this.asistencias = data;
    });
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.service.actualizar(this.idEditando, this.asistencia).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    } else {
      this.service.guardar(this.asistencia).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    }
  }

  editar(a: any) {
    this.editando = true;
    this.idEditando = a.id;
    this.asistencia = JSON.parse(JSON.stringify(a));
  }

  cancelar() {
    this.editando = false;
    this.idEditando = null;

    this.asistencia = {
      fecha: '',
      horaEntrada: '',
      horaSalida: '',
      observacion: '',
      empleado: {
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