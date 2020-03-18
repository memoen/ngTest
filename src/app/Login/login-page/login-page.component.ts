import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import { Router} from '@angular/router';
import {CredentialService} from '../../services/credential.service';
import {ResponseModel, Token} from '../../services/models';
import {Title} from "@angular/platform-browser";

declare let FB;
declare let alertify;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  /**
   * @description authForm: login  and passowrd
   * @property {string} email
   * @property {string} pass
   */
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('test@te.st'),
    pass: new FormControl('123456'),
  });

  constructor(private http: HttpService,
              private router: Router,
              private credential: CredentialService,
              private title: Title,
  ) {
    title.setTitle('Login Page');
  }

  ngOnInit(): void {
  }


  /**
   * @description handle auth using facebook Api
   */
  submitLogin(): void {
    FB.login((response) => {
      if (response.authResponse) {
        this.http.loginType(response.authResponse).subscribe(data => {
          this.urlRedirectProfile();
        }, (err) => {
          alertify.log(err.statusText);
          alertify.log('AccessToken valid, but api reject it');
        });
      } else {
        alertify.log('Facebook api reject');
      }
    });
  }

  /**
   * @description handle registration button click
   */
  register(): void {
    const authData = this.loginForm.getRawValue();
    this.http.register(authData.email, authData.pass).subscribe((data: ResponseModel) => {
      this.credential.Token = (data.result as Token).token;
      this.urlRedirectProfile();
    }, (err) => {
      alertify.log(`Error: ${err.statusText}`);
    });
  }

  /**
   * @description handle login button click
   */
  login(): void {
    const authData = this.loginForm.getRawValue();
    this.http.login(authData.email, authData.pass).subscribe((data: ResponseModel) => {
      this.credential.Token = (data.result as Token).token;
      this.urlRedirectProfile();
    }, (err) => {
      alertify.log(`Error: ${err.statusText}`);
    });
  }

  /**
   * @description redirect to User Profile after success Auth
   */
  urlRedirectProfile(): void {
    this.router.navigateByUrl('/profile');
  }

}

