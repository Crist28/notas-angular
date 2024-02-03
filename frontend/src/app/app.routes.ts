import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ArchivadoComponent } from './pages/archivado/archivado.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'archivadas', component: ArchivadoComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
