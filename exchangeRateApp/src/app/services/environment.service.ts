import { IEnvironment } from '../../environments/IEnvironment';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService implements IEnvironment {
  get production() {
    return environment.production;
  }

  get currencyApiUrl() {
    return environment.currencyApiUrl;
  }

  get countryApiUrl() {
    return environment.countryApiUrl;
  }
}

