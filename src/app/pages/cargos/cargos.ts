import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CargoService } from '../../services/cargo';

@Component({
  selector: 'app-cargos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargos.html',
  styleUrl: './cargos.css'
})
export class Cargos implements OnInit {

  cargos: any[] = [];

  cargo = {
    nombre: '',
    salarioBase: 0
  };

  editando = false;
  idEditando: number | null = null;

  constructor(private service: CargoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(data => {
      this.cargos = data;
    });
  }

  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.service.actualizar(this.idEditando, this.cargo).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    } else {
      this.service.guardar(this.cargo).subscribe(() => {
        this.cancelar();
        this.listar();
      });
    }
  }

  editar(c: any) {
    this.editando = true;
    this.idEditando = c.id;
    this.cargo = {
      nombre: c.nombre,
      salarioBase: c.salarioBase
    };
  }

  cancelar() {
    this.editando = false;
    this.idEditando = null;
    this.cargo = {
      nombre: '',
      salarioBase: 0
    };
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
    });
  }
}