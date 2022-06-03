import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public set = (key: string, val: any): void => sessionStorage.setItem(key, val);

  public get = (key: string): string | null => sessionStorage.getItem(key);

  public remove = (key: string): void => sessionStorage.removeItem(key);

}
