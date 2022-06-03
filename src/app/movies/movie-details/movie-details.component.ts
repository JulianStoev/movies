import { Component, Input } from '@angular/core';
import { NgTrackerService } from '@services/ng-tracker.service';

/**
 * Represents details about a movie: title, genre, IMDB rating, country, director, actors.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  // TODO implement me.
  // NOTE: Refer to the assignment pdf on how this view should look like.
  // The source of thruth for the data here should be OMDb API: http://www.omdbapi.com/#usage

  constructor(
    public ngTracker: NgTrackerService
  ) {}

  public readonly fields = ['Title', 'Genre', 'imdbRating', 'Country', 'Director', 'Actors'];

  @Input() public movie!: {[name: string]: string};

}
