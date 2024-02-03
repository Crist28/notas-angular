import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private clienteService: ClienteService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.clienteService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

