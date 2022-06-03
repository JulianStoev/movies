import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

interface ajaxInterface {
  data?: any;
}
interface uriInterface extends ajaxInterface {
  uri: string;
  url?: string;
}
interface urlInterface extends ajaxInterface {
  uri?: string;
  url: string;
}
type ajaxTypeInterface = urlInterface | uriInterface;

type acceptedMethodsInterface = 'post' | 'get' | 'put' | 'delete' | 'head' | 'options';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(
    private http: HttpClient
  ) { }

  public post = (data: ajaxTypeInterface): Promise<any> => this.ajax(data, 'post');

  public get = (data: ajaxTypeInterface): Promise<Text> => this.ajax(data, 'get');

  public put = (data: ajaxTypeInterface): Promise<any> => this.ajax(data, 'put');

  public delete = (data: ajaxTypeInterface): Promise<any> => this.ajax(data, 'delete');

  public head = (data: ajaxTypeInterface): Promise<any> => this.ajax(data, 'head');

  public options = (data: ajaxTypeInterface): Promise<any> => this.ajax(data, 'options');

  private ajax(_data: ajaxTypeInterface, method: acceptedMethodsInterface): Promise<any> {
    return new Promise(resolve => {
      const data = this.prepare.data(_data, method);
      const options = this.prepare.headers();
  
      switch(method) {
        case 'get':
        case 'head':
        case 'options':
        case 'delete':
          this.http[method](data.url, options).subscribe({
            next: (response: any) => {
              if (this.handle.response(response) === false) return;
              resolve(response.body);
            },
            error: (error) => this.handle.error(error)
          });
          break;
  
        case 'post':
        case 'put':
          this.http[method](data.url, data.data, options).subscribe({
            next: (response: any) => {
              if (this.handle.response(response) === false) return;
              resolve(response.body);
            },
            error: (error) => this.handle.error(error)
          });
          break;        
      }
    });
  }

  private readonly prepare = {
    data: (data: ajaxTypeInterface, type: acceptedMethodsInterface): urlInterface => {
      if (data.uri) {
        data.url = data.uri;
      }
      if (type === 'get' && data.data !== undefined) {
        data.url += '?' + new URLSearchParams(data.data);
      }
      return data as urlInterface;
    },
    headers: () => {
      return {
        observe: 'response',
        headers: new HttpHeaders({})
      } as any;
    }
  };

  private readonly handle = {
    response: (response: HttpResponse<any>): boolean => {
      if (!response || !response.body) {
        alert('There was no response from the server');
        return false;
      }
      return true;
    },
    error: (error: HttpErrorResponse): void => {
      if (error.error instanceof ErrorEvent) {
        alert(`An error occurred: ${error.error.message.toString()}`);
        return;
      }
      if (error.status === 200) {
        alert(error.error.text);
        return;
      }
      alert(`Backend returned code ${error.status}`);
    }
  };

}