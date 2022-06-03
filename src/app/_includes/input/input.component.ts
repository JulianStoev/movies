import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() public model = '';
  @Input() public placeholder = '';

  @Output() public inputChange = new EventEmitter<string>();

  public onChange = (): void => this.inputChange.emit(this.model);

}
