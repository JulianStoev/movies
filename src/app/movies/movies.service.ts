import { Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { AjaxService } from '@services/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private ajax: AjaxService,
    private authServ: AuthService
  ) { }

  private apiUrl = 'http://www.omdbapi.com/';

  public search = (searchKeyword: string): Promise<any> => (
    this.ajax.get({
      url: this.apiUrl,
      data: {
        apikey: this.authServ.authActions.getKey(),
        s: searchKeyword
      }
    })
  );

  public getMovieDetails = (imdbID: string): Promise<any> => (
    this.ajax.get({
      url: this.apiUrl,
      data: {
        apikey: this.authServ.authActions.getKey(),
        i: imdbID
      }
    })
  );

}
