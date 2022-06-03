import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgTrackerService } from '@services/ng-tracker.service';
/**
 * Shows list of movies in datagrid. The datagird supports single row selection, i.e.
 * user is not allowed to select multiple rows.
 *
 * The data grid shows data from OMDb: http://www.omdbapi.com/#usage
 */
@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent {

  constructor(
    public ngTracker: NgTrackerService
  ) {}

  @Input() public movies = [];
  @Input() public activeMovie = '' || undefined;

  @Output() public selectionHadler = new EventEmitter<string>();
  @Output() public clearHandler = new EventEmitter();

  public onSelectionChanged = (imdbID: string): void => this.selectionHadler.emit(imdbID);

  public clearSelection = (): void => this.clearHandler.emit();

}
