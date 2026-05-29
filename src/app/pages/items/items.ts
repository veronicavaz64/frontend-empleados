import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class Items implements OnInit {

  items: any[] = [];

  nuevoItem = {
    nombre: '',
    descripcion: '',
    precio: 0
  };

  constructor(private servicio: ItemService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.servicio.listar().subscribe((data: any) => {
      this.items = data;
    });
  }

  guardar() {
    this.servicio.guardar(this.nuevoItem).subscribe(() => {

      this.nuevoItem = {
        nombre: '',
        descripcion: '',
        precio: 0
      };

      this.listar();
    });
  }

  eliminar(id: number) {
    this.servicio.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

}