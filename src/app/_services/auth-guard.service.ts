import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authServ.authActions.isAuthorized() === true) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
