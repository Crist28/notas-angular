import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './../environment/global.component';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  login_cliente(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + 'login_cliente', data, { headers });
  }

  registro_cliente(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.url}registro_cliente`, data, { headers });
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  crear_nota(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
  
    return this.http.post<any>(`${this.url}crear_nota`, data, { headers });
  }

  obtener_notas(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

    return this.http.get<any>(`${this.url}obtener_notas`, { headers });
  }

  actualizarNota(id: number, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

    return this.http.put<any>(`${this.url}actualizar_nota/${id}`, data, { headers });
  }

  eliminarNota(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

    return this.http.delete<any>(`${this.url}eliminar_nota/${id}`, { headers });
  }

  actualizarEstadoArchivada(id: number, token: string, archivada: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });
  
    // El cuerpo de la solicitud debe ser un objeto con la propiedad 'archivada'
    const body = { archivada };
  
    return this.http.put<any>(`${this.url}actualizar_nota/${id}`, body, { headers });
  }
  
}
