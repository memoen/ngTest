import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private token: string = '';

  public get Token(): string {
    return this.token;
  }

  public set Token(value: string) {
    this.token = value;
    localStorage.setItem('token', value);
  }

  constructor() {
    this.Token = localStorage.getItem('token');
  }
}
