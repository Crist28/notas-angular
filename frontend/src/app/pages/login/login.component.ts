import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  public token: any = '';

  constructor(private clienteService: ClienteService, private router: Router){
    this.token = this.clienteService.getToken();
  }
  ngOnInit(): void {
    if( this.token ){
      this.router.navigate(['inicio']);
    }
  }

  iniciarsesion(iniciarsesionForm: any) {
    if (iniciarsesionForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      };
      this.clienteService.login_cliente(data).subscribe(
        (response) => {
          if (response.data === undefined) {
            console.log('token no presente en la respuesta');
          } else {
            this.usuario = response.data;

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.cliente.id);
            localStorage.setItem('nombre', response.data.cliente.nombres);
            this.router.navigate(['inicio']);
          }
        },
      )
    }
  }

}
