import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamentos.html',
  styleUrl: './departamentos.css'
})
export class Departamentos implements OnInit {

  departamentos: any[] = [];

  departamento = {
    nombre: '',
    descripcion: ''
  };

  editando = false;
  idEditando: number | null = null;

  constructor(private service: DepartamentoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(data => {
      this.departamentos = data;
    });
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.service.actualizar(this.idEditando, this.departamento).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    } else {
      this.service.guardar(this.departamento).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    }
  }

  editar(d: any) {
    this.editando = true;
    this.idEditando = d.id;
    this.departamento = {
      nombre: d.nombre,
      descripcion: d.descripcion
    };
  }

  cancelar() {
    this.editando = false;
    this.idEditando = null;
    this.departamento = {
      nombre: '',
      descripcion: ''
    };
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
    });
  }
}