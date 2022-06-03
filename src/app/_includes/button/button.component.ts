import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() public disabled = false;
  @Input() public label = 'Submit';

  @Output() public clickHandler = new EventEmitter<Event>();

  public onClick = (e: Event): void => this.clickHandler.emit(e);

}
