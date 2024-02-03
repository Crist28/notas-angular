import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent {
  public nombre: string = '';
  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre') || '';
  }
  logout() {
    window.location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('user_data');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
