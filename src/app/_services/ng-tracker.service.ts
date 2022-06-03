import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgTrackerService {

  public track(param = '', index: number, item: any): string | number {
    if (typeof item == 'string' || typeof item == 'number') {
      return item;
    }
    if (item && item[param]) {
      return item[param];
    }
    return index;
  }

}
