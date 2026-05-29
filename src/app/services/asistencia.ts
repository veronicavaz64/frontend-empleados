import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  api = 'https://examen-fullstack.onrender.com/api/asistencias';
  
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  buscarPorFecha(fecha: string) {
    return this.http.get<any[]>(`${this.api}/fecha/${fecha}`);
  }

  guardar(data: any) {
    return this.http.post(this.api, data);
  }

  actualizar(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}