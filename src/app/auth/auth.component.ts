import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * View which allows the user to enter API key for authorization with OMDb API.
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  // NOTE: When user enters invalid key, an error message should be shown.
  // NOTE: When user enters valid key and clicks the submit button, he should be navigted to the main view: the Movies screen.

  constructor(
    private authServ: AuthService,
    private router: Router
  ) {}

  public apiKey = '';

  ngOnInit(): void {
    this.helpers.amIAuthorized();
  }

  private helpers = {
    amIAuthorized: () => {
      if (this.authServ.authActions.isAuthorized() === true) {
        this.helpers.goToMovies();
      }
    },
    goToMovies: () => this.router.navigate(['/movies']),
    displayError: (message: string): void => alert(message)
  };

  public userActions = {
    submit: (): void => {
      this.authServ.submit(this.apiKey)
        .then(() => this.helpers.goToMovies())
        .catch(() => this.helpers.displayError('The provided api key is not valid'));
    },

    inputChange: (e: string) => this.apiKey = e
  };
}
