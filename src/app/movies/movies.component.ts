import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { movieDetails } from './movie-details/movie-details.interface';
import { MoviesService } from './movies.service';

/**
 * The main view of the application. It allows the user to search the OMDb database for
 * movies by theier title. The screen shows a data gird with list of movies and a details panel.
 * The movies data grid and the details view are connected: if user selects a movie in the gird,
 * the details view is shown and populated with further details about the selected item.
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  // NOTE: This should remain a parent component for the search elements, the movies data grid and the details panel.

  constructor(
    private moviesServ: MoviesService
  ) {}

  public searchKeyword = '';

  private movies$ = new BehaviorSubject<Array<movieDetails>>([]);

  private movie$ = new BehaviorSubject<movieDetails | null>(null);

  public moviesData$ = combineLatest({
    movie: this.movie$,
    movies: this.movies$
  });

  public userActions = {
    search: () => {
      this.moviesServ.search(this.searchKeyword)
        .then(json => {
          if (json.Response === 'False') {
            alert(json.Error);
            return;
          }
          this.movies$.next(json.Search);
        });
    },

    inputChange: (e: string) => this.searchKeyword = e,

    closeDetails: () => this.movie$.next(null),

    selectionChange: (imdbID: string): void => {
      this.moviesServ.getMovieDetails(imdbID)
        .then(json => this.movie$.next(json));
    },

    clearSelection: (): void => this.movie$.next(null)
  };
}
