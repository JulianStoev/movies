import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';

/**
 * Service to be used for managing the API key required to interact with OMDb API: http://www.omdbapi.com/#usage
 * The API key which will be used by the application to make requests to OMDb is stored
 * in browser's session storage.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private storage: StorageService
  ) {}

  // A white-list of API tokens which are known to be valid.
  private readonly allowedKeys = ['7f687444'];
  private readonly sessionKeyName = 'omdb-api-key';

  private keyActions = {
    get: (): string | null => this.storage.get(this.sessionKeyName),

    set: (apiKey: string): void => this.storage.set(this.sessionKeyName, apiKey),

    clear: (): void => this.storage.remove(this.sessionKeyName),

    isAllowed: (apiKey: string): boolean => (this.allowedKeys.indexOf(apiKey) !== -1)
  };

  public authActions = {
    isAuthorized: (): boolean => {
      const key = this.keyActions.get();
      return (key !== null && this.keyActions.isAllowed(key));
    },

    authorize: (apiKey: string): boolean => {
      if (this.keyActions.isAllowed(apiKey) === false) return false;
      this.keyActions.set(apiKey);
      return true;
    },

    getKey: (): string | null => this.keyActions.get()
  };

  public submit = (apiKey: string): Promise<any> => (this.authActions.authorize(apiKey) ? Promise.resolve() : Promise.reject());

}
