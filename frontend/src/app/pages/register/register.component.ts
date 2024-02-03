import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';
  genero: string = '';
  f_nacimiento: string = '';
  dni: string = '';

  constructor(private clienteService: ClienteService, private router: Router){

  }

  onSubmit(): void {
    const data = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      genero: this.genero,
      f_nacimiento: this.f_nacimiento,
      dni: this.dni,
    };
    this.clienteService.registro_cliente(data).subscribe(
      (response) => {
        if (response.data === true) {
          console.log('Registro exitoso');
          this.router.navigate(['']);
        } else {
          console.error('Error en el registro:', response.msg);
        }
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}
