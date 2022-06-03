import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputModule } from 'app/_includes/input/input.module';
import { ButtonModule } from 'app/_includes/button/button.module';



@NgModule({
  declarations: [
    MoviesComponent,
    MoviesGridComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    ButtonModule,
    RouterModule.forChild([
      {path: '', component: MoviesComponent}
    ])
  ]
})
export class MoviesModule { }
