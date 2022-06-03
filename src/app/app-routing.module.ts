import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@services/auth-guard.service';

const routes: Routes = [
  {path: 'movies', canActivate: [AuthGuardService], loadChildren: () => import('@movies/movies.module').then(m => m.MoviesModule)},
  {path: 'auth', loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)},
  {path: '', redirectTo: 'movies'},
  {path: '**', redirectTo: 'movies'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
