import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  api = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.api);
  }

  guardar(item: any) {
    return this.http.post(this.api, item);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

}