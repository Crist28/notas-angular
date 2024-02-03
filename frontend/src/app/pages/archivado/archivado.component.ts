import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from '../../components/headers/headers.component';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-archivado',
  standalone: true,
  imports: [ HeadersComponent, FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './archivado.component.html',
  styleUrl: './archivado.component.css'
})
export class ArchivadoComponent {
  public token: any = '';
  public notas: any[] = [];
  public contadorNotas: number = 0;
  public contadorNotasArchivadas: number = 0;
  public contadorNotasNoArchivadas: number = 0;
  constructor(private clienteService: ClienteService){
    this.token = this.clienteService.getToken();
    this.obtenerNotas();
  }
  obtenerNotas() {
    this.clienteService.obtener_notas(this.token).subscribe(
      (respuesta) => {
        this.notas = respuesta;
  
        // Reinicia los contadores
        this.contadorNotas = 0;
        this.contadorNotasArchivadas = 0;
        this.contadorNotasNoArchivadas = 0;
  
        // Recorre las notas y actualiza los contadores
        this.notas.forEach(nota => {
          this.contadorNotas++;
          if (nota.archivada) {
            this.contadorNotasArchivadas++;
          } else {
            this.contadorNotasNoArchivadas++;
          }
        });
  
        console.log(respuesta);
      },
      (error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }
  archivarDesarchivarNota(nota: any) {
    nota.archivada = !nota.archivada;
  
    this.clienteService.actualizarEstadoArchivada(nota.id, this.token, nota.archivada).subscribe(
      response => {
        console.log('Estado de archivada actualizado correctamente en el backend', response);
      },
      error => {
        console.error('Error al actualizar el estado de archivada en el backend', error);
      }
    );
  }
  
}
