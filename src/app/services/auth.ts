import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  api = 'https://examen-fullstack.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(usuario: any) {
    return this.http.post<any>(`${this.api}/login`, usuario);
  }

  registrar(usuario: any) {
    return this.http.post<any>(`${this.api}/register`, usuario);
  }
}