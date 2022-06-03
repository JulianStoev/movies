import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputModule } from 'app/_includes/input/input.module';
import { ButtonModule } from 'app/_includes/button/button.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    ButtonModule,
    RouterModule.forChild([
      {path: '', component: AuthComponent}
    ])
  ]
})
export class AuthModule { }
