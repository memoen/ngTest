import {CanActivate, Router} from '@angular/router';
import {CredentialService} from '../services/credential.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private credential: CredentialService, private router: Router) {
  }

  canActivate() {
    if (this.credential.Token.length > 0) {
      return true;
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
