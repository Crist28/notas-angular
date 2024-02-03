import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeadersComponent } from '../../components/headers/headers.component';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeadersComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public titulo: string = '';
  public contenido: string = '';
  public token: any = '';
  public notas: any[] = [];
  public notaEdit: any = {};
  public contadorNotas: number = 0;
  public contadorNotasArchivadas: number = 0;
  public contadorNotasNoArchivadas: number = 0;
  constructor(private clienteService: ClienteService, private router: Router) {
    this.token = this.clienteService.getToken();
    this.titulo = '';
    this.contenido = '';
  }
  ngOnInit() {
    this.obtenerNotas();
  }
  crearNota() {
    const data = {
      titulo: this.titulo,
      contenido: this.contenido,
      archivada: false, 
    };
    this.clienteService.crear_nota(data, this.token).subscribe(
      (respuesta) => {
        console.log('Nota creada con éxito:', respuesta);
        this.titulo = '';
        this.contenido = '';
        location.reload();
      },
      (error) => {
        console.error('Error al crear la nota:', error);
      }
    );
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
  
  // obtenerNotas(){
  //   this.clienteService.obtener_notas(this.token).subscribe(
  //     (respuesta) => {
  //       this.notas = respuesta;
  //       console.log(respuesta);
        
  //     },
  //     (error) => {
  //       console.error('Error al obtener las notas:', error);
  //     }
  //   )
  // }

  abrirEditarNotaModal(nota: any) {
    this.notaEdit = { ...nota }; 
  }

  actualizarNota() {
    const { id, ...data } = this.notaEdit; 
    this.clienteService.actualizarNota(id, data, this.token).subscribe(
      (respuesta) => {
        console.log('Nota actualizada con éxito:', respuesta);
        $('#editarNotaModal').modal('hide');
        location.reload();
      },
      (error) => {
        console.error('Error al actualizar la nota:', error);
      }
    );
  }

  eliminarNota(id: number): void {
    this.clienteService.eliminarNota(id, this.token).subscribe(
      (respuesta) => {
        console.log('Nota eliminada con éxito:', respuesta);
        location.reload();
      },
      (error) => {
        console.error('Error al eliminar la nota:', error);
      }
    )
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
