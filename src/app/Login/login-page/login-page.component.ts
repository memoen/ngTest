import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {Route, Router} from '@angular/router';
import {CredentialService} from '../../services/credential.service';

declare let FB;
declare let alertify;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('test@te.st'),
    pass: new FormControl('123456'),
  });


  constructor(private http: HttpService, private router: Router, private credential: CredentialService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  submitLogin() {
    FB.login((response) => {
      if (response.authResponse) {
        this.http.loginType(response.authResponse).subscribe(data => {
          this.urlRedirectProfile();
        }, (err) => {
          console.log(err);
          alertify.log(err.statusText);
          alertify.log('AccessToken valid, but api reject it');
        });
      } else {
        alertify.log('Facebook api reject');
      }
    });
  }

  register() {
    const authData = this.loginForm.getRawValue();
    this.http.register(authData.email, authData.pass).subscribe(data => {
      this.credential.Token = data.result.token;
      this.urlRedirectProfile();
    }, (err) => {
      console.log(err);
      alertify.log(`Error: ${err.statusText}`);
    });
  }

  login() {
    const authData = this.loginForm.getRawValue();
    this.http.login(authData.email, authData.pass).subscribe(data => {
      this.credential.Token = data.result.token;
      this.urlRedirectProfile();
    }, (err) => {
      alertify.log(`Error: ${err.statusText}`);
    });
  }

  urlRedirectProfile() {
    this.router.navigateByUrl('/profile');
  }

}
